<template>
  <div id="dwv">
    <el-progress :show-text="false" :percentage="loadProgress" />
    <div class="button-row">
      <!-- action buttons -->
      <el-button
        type="primary"
        v-for="tool in toolNames"
        :key="tool"
        :id="tool"
        :title="tool"
        v-on:click="onChangeTool(tool)"
        :disabled="!dataLoaded || !canRunTool(tool) || tool === 'Draw'"
        :icon="getToolIcon(tool)"
        circle
      />

      <el-button
        type="primary"
        title="Reset"
        v-on:click="onReset()"
        :disabled="!dataLoaded"
        icon="el-icon-refresh-right"
        circle
      />

      <el-button
        type="primary"
        title="Toggle Orientation"
        v-on:click="toggleOrientation()"
        :disabled="!dataLoaded || mode !== 0"
        icon="el-icon-camera"
        circle
      />

      <el-button
        type="primary"
        title="Mode"
        v-on:click="onChangeDataView()"
        :disabled="!dataLoaded"
        :icon="mode === 0 ? 'el-icon-turn-off' : 'el-icon-open'"
        circle
      />

      <div class="dropBox0">
        <div id="dropBox"></div>
      </div>
    </div>

    <div id="layerGroup0"></div>

    <!-- dicom tags table-->
    <div class="tags-table">
      <tagsTable
        v-if="metaData !== null"
        :tagsData="metaData"
        :instance="instanceNumber"
      />
    </div>
  </div>
</template>

<script>
// import
import axios from "axios";
import Vue from "vue";
import { Progress, Button, Dialog } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

locale.use(lang);
Vue.use(Progress);
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
  data: function() {
    let res = {
      dwvApp: null,
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        Draw: {
          options: ["Ruler"],
        },
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
      dwv: null,
      loadFromOrthanc: false,
      dicom: [],
      instanceNumber: 0,
    };
    res.toolNames = Object.keys(res.tools);
    return res;
  },
  created() {
    if (this.$route.query.id) {
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
          if (this.loadFromOrthanc) {
            this.loadProgress = event.loaded * 2;
          } else {
            this.loadProgress = event.loaded;
          }
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
    getToolIcon: function(tool) {
      var res;
      if (tool === "Scroll") {
        res = "el-icon-menu";
      } else if (tool === "ZoomAndPan") {
        res = "el-icon-search";
      } else if (tool === "WindowLevel") {
        res = "el-icon-s-operation";
      } else if (tool === "Draw") {
        res = "el-icon-edit";
      }
      return res;
    },
    onChangeTool: function(tool) {
      this.selectedTool = tool;
      for (const t of this.toolNames) {
        this.activateTool(t, false);
      }
      this.activateTool(tool, true);
      this.dwvApp.setTool(tool);
      if (tool === "Draw") {
        this.onChangeShape(this.tools.Draw.options[0]);
      }
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
    activateTool: function(tool, flag) {
      if (flag) {
        document.getElementById(tool).classList.add("active");
      } else {
        document.getElementById(tool).classList.remove("active");
      }
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
    },
    onChangeShape: function(shape) {
      if (this.dwvApp && this.selectedTool === "Draw") {
        this.dwvApp.setToolFeatures({ shapeName: shape });
      }
    },
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
      const propList = ["WindowLevel", "Position", "Zoom", "Offset", "Opacity"];
      const binders = [];
      // add all binders when use mpr view
      for (var b = 0; b < propList.length; ++b) {
        binders.push(new this.dwv.gui[propList[b] + "Binder"]());
      }
      this.dwvApp.setLayerGroupsBinders(binders);
    },
    setupDICOMPath: async function() {
      const queryPath = `${process.env.VUE_APP_QUERY}/instance`;
      const payload = {
        study:
          // replace by studyInstanceUID
          "1.3.6.1.4.1.14519.5.2.1.186051521067863971269584893740842397538",
        series:
          // replace by seriesInstanceUID
          "1.3.6.1.4.1.14519.5.2.1.175414966301645518238419021688341658582",
      };
      await axios.post(queryPath, payload).then((res) => {
        res.data.forEach((id) => {
          const dicomPath = `${process.env.VUE_APP_QUERY}/dicom/${id}`;
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
<style scoped>
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
#dwv button.active {
  background-color: var(--md-theme-default-accent);
}

/* Layers */
::v-deep .layerGroup {
  display: inline-block;
  height: 250px;
  width: 250px;
  margin: 10px;
  /* allow child centering */
  position: relative;
  canvas {
    /* avoid parent auto-resize */
    vertical-align: middle;
  }
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
  border: 5px dashed rgba(68, 138, 255, 0.38);
}
.dropBoxBorder.hover {
  border: 5px dashed var(--md-theme-default-primary);
}

/* Tags table */
.tags-table {
  width: 80%;
}
</style>
