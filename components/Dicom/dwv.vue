<template>
  <div id="dwv">
    <el-progress :show-text="false" :percentage="loadProgress" />
    <div class="button-row">
      <!-- action buttons -->
      <el-button
        v-for="tool in toolNames"
        :class="activateTool(tool)"
        :key="tool"
        :id="tool"
        :title="tool"
        v-on:click="onChangeTool(tool)"
        :disabled="!dataLoaded || !canRunTool(tool)"
        :icon="getToolIcon(tool)"
        circle
      />

      <el-popover placement="bottom" trigger="click">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >
          Check all
        </el-checkbox>
        <hr />
        <el-checkbox-group
          class="binders-group"
          v-model="checkedBinders"
          @change="handleCheckedBindersChange"
        >
          <el-checkbox v-for="binder in binders" :label="binder" :key="binder">
            {{ binder }}
          </el-checkbox>
        </el-checkbox-group>
        <el-button
          slot="reference"
          title="Binder"
          :disabled="!dataLoaded || mode === 0"
          icon="el-icon-connection"
          circle
        />
      </el-popover>

      <el-button
        title="Reset"
        v-on:click="onReset()"
        :disabled="!dataLoaded"
        icon="el-icon-refresh-right"
        circle
      />

      <el-button
        title="Toggle Orientation"
        v-on:click="toggleOrientation()"
        :disabled="!dataLoaded || mode === 1"
        icon="el-icon-camera"
        circle
      />

      <el-button
        title="Mode"
        v-on:click="onChangeDataView()"
        :disabled="!dataLoaded"
        :icon="mode === 0 ? 'el-icon-turn-off' : 'el-icon-open'"
        circle
      />

      <el-button
        title="Size"
        v-on:click="onChangeViewSize(viewSize)"
        :disabled="!dataLoaded"
        icon="el-icon-full-screen"
        circle
      />

      <div class="dropBox0">
        <div id="dropBox"></div>
      </div>
    </div>

    <div
      id="layerGroup0"
      @mouseover="mouseHover(true)"
      @mouseout="mouseHover(false)"
    ></div>

    <!-- dicom tags table-->
    <div class="tags-table">
      <tagsTable
        v-if="metaData !== null"
        :tagsData="metaData"
        :instance="instanceNumber"
        v-on:instanceNumber="onChangeInstance"
        @mouseover="mouseHover(true)"
        @mouseout="mouseHover(false)"
      />
    </div>
  </div>
</template>

<script>
// import
import axios from "axios";
import Vue from "vue";
import {
  Progress,
  Popover,
  Checkbox,
  CheckboxGroup,
  Button,
  Dialog,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

locale.use(lang);
Vue.use(Progress);
Vue.use(Popover);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(Dialog);

// import
import tagsTable from "./tags-table";

// gui overrides

/**
 * Append a layer div in the root 'dwv' one.
 *
 * @param {string} id The id of the layer.
 */
const addLayerGroup = (id) => {
  const layerDiv = document.createElement("div");
  layerDiv.id = id;
  layerDiv.className = "layerGroup";
  const root = document.getElementById("layerGroup0");
  root.appendChild(layerDiv);
};

/**
 * Create simple view config(s).
 *
 * @returns {object} The view config.
 */
const prepareAndGetSimpleDataViewConfig = () => {
  // clean up
  const dwvDiv = document.getElementById("layerGroup0");
  dwvDiv.innerHTML = "";
  // add divs
  addLayerGroup("layerGroupACS");
  return { "*": [{ divId: "layerGroupACS" }] };
};

/**
 * Create MPR view config(s).
 *
 * @returns {object} The view config.
 */
const prepareAndGetMPRDataViewConfig = () => {
  // clean up
  const dwvDiv = document.getElementById("layerGroup0");
  dwvDiv.innerHTML = "";
  // add divs
  addLayerGroup("layerGroupA");
  addLayerGroup("layerGroupC");
  addLayerGroup("layerGroupS");
  return {
    "*": [
      {
        divId: "layerGroupA",
        orientation: "axial",
      },
      {
        divId: "layerGroupC",
        orientation: "coronal",
      },
      {
        divId: "layerGroupS",
        orientation: "sagittal",
      },
    ],
  };
};

export default {
  name: "dwv-vue",
  components: {
    tagsTable,
  },
  props: ["study", "series"],
  data: function() {
    let res = {
      dwvApp: null,
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        // Draw: {
        //   options: ["Ruler"],
        // },
      },
      mode: 0,
      dataViewConfigs: null,
      viewOnFirstLoadItem: true,
      selectedTool: "Select Tool",
      loadProgress: 0,
      dataLoaded: false,
      metaData: null,
      orientation: undefined,
      dropboxDivId: "dropBox",
      dropboxClassName: "dropBox",
      borderClassName: "dropBoxBorder",
      hoverClassName: "hover",
      checkAll: true,
      checkedBinders: ["WindowLevel", "Position", "Zoom", "Offset", "Opacity"],
      binders: ["WindowLevel", "Position", "Zoom", "Offset", "Opacity"],
      isIndeterminate: false,
      dwv: null,
      viewSize: 1,
      pixelSize: [250, 500, 750],
      loadFromOrthanc: false,
      dicom: [],
      instanceNumber: 1,
    };
    res.toolNames = Object.keys(res.tools);
    return res;
  },
  created() {
    if (this.$route.params.id) {
      this.loadFromOrthanc = true;
    }
  },
  mounted() {
    if (process.client) {
      import("dwv").then((dwv) => {
        this.dwv = dwv;
        // Image decoders (for web workers)
        dwv.image.decoderScripts = {
          jpeg2000: "assets/dwv/decoders/pdfjs/decode-jpeg2000.js",
          "jpeg-lossless": "assets/dwv/decoders/rii-mango/decode-jpegloss.js",
          "jpeg-baseline": "assets/dwv/decoders/pdfjs/decode-jpegbaseline.js",
          rle: "assets/dwv/decoders/dwv/decode-rle.js",
        };
        if (this.mode === 0) {
          // simplest: one layer group
          this.dataViewConfigs = prepareAndGetSimpleDataViewConfig();
        } else if (this.mode === 1) {
          // MPR
          this.viewOnFirstLoadItem = false;
          this.dataViewConfigs = prepareAndGetMPRDataViewConfig();
        }
        // app config
        const config = {
          dataViewConfigs: this.dataViewConfigs,
          tools: this.tools,
          viewOnFirstLoadItem: this.viewOnFirstLoadItem,
        };
        // create app
        this.dwvApp = new dwv.App();
        // initialise app
        this.dwvApp.init(config);
        // handle load events
        let nLoadItem = null;
        let nReceivedLoadError = null;
        let nReceivedLoadAbort = null;
        let isFirstRender = null;
        this.dwvApp.addEventListener("loadstart", (/*event*/) => {
          // load to display in small size if not enough width
          // else display in medium by default
          if (window.innerWidth < 500) {
            this.onChangeViewSize(2);
          }
          // reset flags
          this.dataLoaded = false;
          nLoadItem = 0;
          nReceivedLoadError = 0;
          nReceivedLoadAbort = 0;
          isFirstRender = true;
          // hide drop box
          this.showDropbox(false);
        });
        this.dwvApp.addEventListener("loadprogress", (event) => {
          this.loadProgress = event.loaded;
        });
        this.dwvApp.addEventListener("load", (/*event*/) => {
          if (!this.viewOnFirstLoadItem) {
            // render data
            for (let i = 0; i < this.dwvApp.getNumberOfLoadedData(); ++i) {
              this.dwvApp.render(i);
            }
          }
        });
        this.dwvApp.addEventListener("loadend", (/*event*/) => {
          if (nReceivedLoadError) {
            this.loadProgress = 0;
            alert("Received errors during load. Check log for details.");
            // show drop box if nothing has been loaded
            if (!nLoadItem) {
              this.showDropbox(true);
            }
          }
          if (nReceivedLoadAbort) {
            this.loadProgress = 0;
            alert("Load was aborted.");
            this.showDropbox(true);
          }
          // set dicom tags
          this.metaData = this.dwvApp.getMetaData(0);
          // set data loaded flag
          this.dataLoaded = true;

          if (isFirstRender) {
            isFirstRender = false;
            // available tools
            let selectedTool = "ZoomAndPan";
            if (this.dwvApp.canScroll()) {
              selectedTool = "Scroll";
            }
            this.onChangeTool(selectedTool);
          }
        });
        this.dwvApp.addEventListener("loaditem", (/*event*/) => {
          ++nLoadItem;
        });
        this.dwvApp.addEventListener("loaderror", (/*event*/) => {
          // console.error('load error', event)
          ++nReceivedLoadError;
        });
        this.dwvApp.addEventListener("loadabort", (/*event*/) => {
          ++nReceivedLoadAbort;
        });
        this.dwvApp.addEventListener("positionchange", (event) => {
          this.instanceNumber = event.value[0][2];
        });
        // handle key events
        this.dwvApp.addEventListener("keydown", (event) => {
          this.dwvApp.defaultOnKeydown(event);
        });
        // // handle window resize
        // window.addEventListener('resize', function () {
        //   this.dwvApp.onResize()
        // })
        if (this.loadFromOrthanc) {
          // load dicom files from url path
          this.setupDICOMPath();
        } else {
          // setup drop box
          this.setupDropbox();
        }
        // possible load from location
        dwv.utils.loadFromUri(window.location.href, this.dwvApp);
      });
    }
  },
  methods: {
    mouseHover: function(hover) {
      if (hover) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    getToolIcon: function(tool) {
      var res;
      if (tool === "Scroll") {
        res = "el-icon-sort";
      } else if (tool === "ZoomAndPan") {
        res = "el-icon-thumb";
      } else if (tool === "WindowLevel") {
        res = "el-icon-s-operation";
        // } else if (tool === "Draw") {
        //   res = "el-icon-edit";
      }
      return res;
    },
    onChangeTool: function(tool) {
      this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      // if (tool === "Draw") {
      //   this.onChangeShape(this.tools.Draw.options[0]);
      // }
    },
    canRunTool: function(tool) {
      let res;
      if (tool === "Scroll") {
        res = this.dwvApp.canScroll();
      } else if (tool === "WindowLevel") {
        res = this.dwvApp.canWindowLevel();
      } else {
        res = true;
      }
      return res;
    },
    activateTool: function(tool) {
      const flag = tool === this.selectedTool ? true : false;
      if (flag) {
        return "secondary";
      }
    },
    onChangeBinder: function() {
      const binders = [];
      // add all binders when use mpr view
      for (var b = 0; b < this.checkedBinders.length; ++b) {
        binders.push(new this.dwv.gui[this.checkedBinders[b] + "Binder"]());
      }
      this.dwvApp.setLayerGroupsBinders(binders);
    },
    handleCheckAllChange(val) {
      this.checkedBinders = val ? this.binders : [];
      this.isIndeterminate = false;
      this.onChangeBinder();
    },
    handleCheckedBindersChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.binders.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.binders.length;
      this.onChangeBinder();
    },
    toggleOrientation: function() {
      if (typeof this.orientation !== "undefined") {
        if (this.orientation === "axial") {
          this.orientation = "coronal";
        } else if (this.orientation === "coronal") {
          this.orientation = "sagittal";
        } else if (this.orientation === "sagittal") {
          this.orientation = "axial";
        }
      } else {
        // default is most probably axial
        this.orientation = "coronal";
      }
      // update data view config
      const config = {
        "*": [
          {
            divId: "layerGroupACS",
            orientation: this.orientation,
          },
        ],
      };
      this.dwvApp.setDataViewConfig(config);
      // render data
      for (let i = 0; i < this.dwvApp.getNumberOfLoadedData(); ++i) {
        this.dwvApp.render(i);
      }
      this.onChangeInstance(this.instanceNumber);
    },
    // onChangeShape: function(shape) {
    //   if (this.dwvApp && this.selectedTool === "Draw") {
    //     this.dwvApp.setToolFeatures({ shapeName: shape });
    //   }
    // },
    onReset: function() {
      this.dwvApp.resetDisplay();
    },
    onChangeDataView: function() {
      if (this.mode === 0) {
        // MPR
        this.dataViewConfigs = prepareAndGetMPRDataViewConfig();
        this.mode = 1;
      } else if (this.mode === 1) {
        // simplest: one layer group
        this.dataViewConfigs = prepareAndGetSimpleDataViewConfig();
        this.mode = 0;
      }
      // set config
      this.dwvApp.setDataViewConfig(this.dataViewConfigs);
      // render data
      for (var i = 0; i < this.dwvApp.getNumberOfLoadedData(); ++i) {
        this.dwvApp.render(i);
      }
      this.onChangeBinder();
      this.onChangeViewSize(this.viewSize - 1 < 0 ? 2 : this.viewSize - 1);
      this.onChangeInstance(this.instanceNumber);
    },
    setupViewSize: function(size) {
      const layer = document.querySelectorAll(".layerGroup");
      for (let i = 0; i < layer.length; i++) {
        layer[i].setAttribute("style", `height: ${size}px; width: ${size}px`);
      }
      const canvas = document.querySelectorAll("canvas");
      for (let i = 0; i < canvas.length; i++) {
        canvas[i].setAttribute("style", `height: ${size}px; width: ${size}px`);
      }
    },
    setupViewDirection: function(width, size) {
      const rowViewSize = (size + 40) * 3;
      if (this.mode === 1) {
        const rootLayer = document.querySelector("#layerGroup0");
        if (width >= rowViewSize) {
          rootLayer.style.flexDirection = "row";
        } else if (width < rowViewSize) {
          rootLayer.style.flexDirection = "column";
        }
      }
    },
    onChangeViewSize: function(view) {
      const width = document.documentElement.clientWidth;
      let displaySize;
      const small = this.pixelSize[0];
      const median = this.pixelSize[1];
      const large = this.pixelSize[2];
      if (view === 0) {
        if (width < median) {
          return;
        }
        displaySize = median;
        this.viewSize = 1;
      } else if (view === 1) {
        if (width < large) {
          return;
        }
        displaySize = large;
        this.viewSize = 2;
      } else if (view === 2) {
        displaySize = small;
        this.viewSize = 0;
      }
      this.setupViewDirection(width, displaySize);
      this.setupViewSize(displaySize);
    },
    onChangeInstance: function(index) {
      const viewController = this.dwvApp
        .getActiveLayerGroup()
        .getActiveViewLayer()
        .getViewController();
      const currentIndex = viewController.getCurrentIndex().getValues();
      viewController.setCurrentIndex(
        new this.dwv.math.Index([currentIndex[0], currentIndex[1], index])
      );
    },
    setupDICOMPath: async function() {
      const queryPath = `${this.$config.query_api_url}/instance`;
      const payload = {
        study: this.study,
        series: this.series,
      };
      await axios.post(queryPath, payload).then((res) => {
        res.data.forEach((id) => {
          const dicomPath = `${this.$config.query_api_url}/dicom/export/${id}`;
          this.dicom.push(dicomPath);
        });
      });
      this.onUrl();
    },
    onUrl: function() {
      this.dwvApp.loadURLs(this.dicom);
    },
    setupDropbox() {
      this.showDropbox(true);
    },
    defaultHandleDragEvent: function(event) {
      // prevent default handling
      event.stopPropagation();
      event.preventDefault();
    },
    onBoxDragOver: function(event) {
      this.defaultHandleDragEvent(event);
      // update box border
      const box = document.getElementById(this.dropboxDivId);
      if (box && box.className.indexOf(this.hoverClassName) === -1) {
        box.className += " " + this.hoverClassName;
      }
    },
    onBoxDragLeave: function(event) {
      this.defaultHandleDragEvent(event);
      // update box class
      const box = document.getElementById(this.dropboxDivId);
      if (box && box.className.indexOf(this.hoverClassName) !== -1) {
        box.className = box.className.replace(" " + this.hoverClassName, "");
      }
    },
    onDrop: function(event) {
      this.defaultHandleDragEvent(event);
      // load files
      this.dwvApp.loadFiles(event.dataTransfer.files);
    },
    showDropbox: function(show) {
      const box = document.getElementById(this.dropboxDivId);
      if (!box) {
        return;
      }
      const boxDiv = document.getElementById("dropBox");

      if (show) {
        // reset css class
        box.className = this.dropboxClassName + " " + this.borderClassName;
        // check content
        if (box.innerHTML === "") {
          const p = document.createElement("p");
          p.appendChild(document.createTextNode("Drag and drop data here"));
          box.appendChild(p);
        }
        // show box
        box.setAttribute("style", "display:initial");
        // stop layer listening
        if (boxDiv) {
          boxDiv.removeEventListener("dragover", this.defaultHandleDragEvent);
          boxDiv.removeEventListener("dragleave", this.defaultHandleDragEvent);
          boxDiv.removeEventListener("drop", this.onDrop);
        }
        // listen to box events
        box.addEventListener("dragover", this.onBoxDragOver);
        box.addEventListener("dragleave", this.onBoxDragLeave);
        box.addEventListener("drop", this.onDrop);
      } else {
        // remove border css class
        box.className = this.dropboxClassName;
        // remove content
        box.innerHTML = "";
        // hide box
        box.setAttribute("style", "display:none");
        // stop box listening
        box.removeEventListener("dragover", this.onBoxDragOver);
        box.removeEventListener("dragleave", this.onBoxDragLeave);
        box.removeEventListener("drop", this.onDrop);
        // listen to layer events
        if (boxDiv) {
          boxDiv.addEventListener("dragover", this.defaultHandleDragEvent);
          boxDiv.addEventListener("dragleave", this.defaultHandleDragEvent);
          boxDiv.addEventListener("drop", this.onDrop);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#dwv {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-row {
  width: 80%;
  text-align: center;
  padding: 5px;
}

#dwv button {
  margin: 2px;
}

.binders-group {
  display: flex;
  flex-direction: column;
}

hr {
  margin: 5px 0 5px 0;
}

/* Layers */
#layerGroup0 {
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding: 10px;
  border: 1px solid $app-primary-color;
}
::v-deep .layerGroup {
  height: 500px;
  width: 500px;
  margin: 10px;
  /* allow child centering */
  position: relative;
}
::v-deep canvas {
  /* avoid parent auto-resize */
  vertical-align: middle;
}

/* drag&drop */
.dropBox0 {
  display: flex;
}
.dropBox {
  margin: auto;
  width: 50%;
  height: 75%;
}
.dropBoxBorder {
  border: 5px dashed $app-primary-color;
}
.dropBoxBorder.hover {
  border: 5px dashed var(--md-theme-default-primary);
}

/* Tags table */
.tags-table {
  width: 60%;
  margin-bottom: 50px;
}

/* Element ui */
::v-deep .el-progress {
  width: 100%;
}
::v-deep .el-button {
  height: 50px;
  width: 50px;
}
::v-deep .el-checkbox + .el-checkbox {
  margin-left: 0.75rem;
}
::v-deep .el-checkbox__inner {
  width: 1rem;
  height: 1rem;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner:after {
  height: 0.5rem !important;
  left: 0.3rem !important;
  top: 0.1rem !important;
  transform: rotate(45deg) scale(1.6) !important;
}
::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  &::before {
    border-bottom: 3px solid $app-primary-color;
    background-color: $app-primary-color;
    top: 8.5px;
    left: 1px;
  }
}
</style>
