<template>
  <client-only placeholder="Loading Dicom Viewer ...">
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
          :disabled="!dataLoaded || !canRunTool(tool)"
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
          :disabled="!dataLoaded"
          icon="el-icon-camera"
          circle
        />

        <el-button
          type="primary"
          title="Tags"
          v-on:click="showDicomTags = true"
          :disabled="!dataLoaded"
          icon="el-icon-document"
          circle
        />
        <!-- dicom tags dialog-->
        <el-dialog :show-close="false" :visible.sync="showDicomTags">
          <tagsTable :tagsData="metaData" />
        </el-dialog>
      </div>

      <div id="layerGroup0" class="layerGroup">
        <div id="dropBox"></div>
      </div>
      <!-- <div>
        <p>
          Powered by
          <a href="https://github.com/ivmartel/dwv" title="dwv on github">dwv</a>
          {{ versions.dwv }} and
          <a href="https://github.com/vuejs/vue" title="vue on github">Vue.js</a>
          {{ versions.vue }}
        </p>
      </div> -->
    </div>
  </client-only>
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
// import dwv from 'dwv'
import tagsTable from "./tags-table";

// gui overrides

export default {
  name: "dwv-vue",
  components: {
    tagsTable,
  },
  data: function() {
    let res = {
      // versions: {
      //   dwv: dwv.getVersion(),
      //   vue: Vue.version
      // },
      dwvApp: null,
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        Draw: {
          options: ["Ruler"],
        },
      },

      selectedTool: "Select Tool",
      loadProgress: 0,
      dataLoaded: false,
      metaData: null,
      orientation: undefined,
      showDicomTags: false,
      dropboxDivId: "dropBox",
      dropboxClassName: "dropBox",
      borderClassName: "dropBoxBorder",
      hoverClassName: "hover",
      folderPath: null,
      dicom: [],
    };
    res.toolNames = Object.keys(res.tools);
    return res;
  },
  // created() {
  //   if (window.location.pathname !== '/') {
  //     this.folderPath = window.location.pathname
  //   }
  // },
  mounted() {
    // create app
    if (process.client) {
      import("dwv").then((dwv) => {
        // Image decoders (for web workers)
        dwv.image.decoderScripts = {
          jpeg2000: "assets/dwv/decoders/pdfjs/decode-jpeg2000.js",
          "jpeg-lossless": "assets/dwv/decoders/rii-mango/decode-jpegloss.js",
          "jpeg-baseline": "assets/dwv/decoders/pdfjs/decode-jpegbaseline.js",
          rle: "assets/dwv/decoders/dwv/decode-rle.js",
        };
        
        this.dwvApp = new dwv.App();
        // initialise app
        this.dwvApp.init({
          dataViewConfigs: { "*": [{ divId: "layerGroup0" }] },
          tools: this.tools,
        });
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
          this.loadProgress = event.loaded;
        });
        this.dwvApp.addEventListener("renderend", (/*event*/) => {
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
        this.dwvApp.addEventListener("load", (/*event*/) => {
          // set dicom tags
          this.metaData = this.dwvApp.getMetaData(0);
          // set data loaded flag
          this.dataLoaded = true;
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

        // handle key events
        this.dwvApp.addEventListener("keydown", (event) => {
          this.dwvApp.defaultOnKeydown(event);
        });
        // handle window resize
        window.addEventListener("resize", this.dwvApp.onResize);

        if (this.folderPath) {
          this.onUrl();
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
    getDICOMFile: async function() {
      const queryPath = process.env.VUE_APP_QUERY + "/collection";
      await axios.post(queryPath, { path: this.folderPath }).then((res) => {
        res.data.files.forEach((element) => {
          const dicomPath =
            process.env.VUE_APP_QUERY + "/data/preview" + element.path;
          this.dicom.push(dicomPath);
        });
      });
    },
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
            divId: "layerGroup0",
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
    onUrl: async function() {
      if (this.folderPath) {
        await this.getDICOMFile();
        this.dwvApp.loadURLs(this.dicom);
      }
    },
    showDropbox: function(show) {
      const box = document.getElementById(this.dropboxDivId);
      if (!box) {
        return;
      }
      const layerDiv = document.getElementById("layerGroup0");

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
        if (layerDiv) {
          layerDiv.removeEventListener("dragover", this.defaultHandleDragEvent);
          layerDiv.removeEventListener(
            "dragleave",
            this.defaultHandleDragEvent
          );
          layerDiv.removeEventListener("drop", this.onDrop);
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
        if (layerDiv) {
          layerDiv.addEventListener("dragover", this.defaultHandleDragEvent);
          layerDiv.addEventListener("dragleave", this.defaultHandleDragEvent);
          layerDiv.addEventListener("drop", this.onDrop);
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
  height: 90%;
}

.button-row {
  text-align: center;
  padding: 5px;
}

#dwv button {
  margin: 2px;
}
#dwv button.active {
  /* background-color: var(--md-theme-default-accent); */
}

/* Layers */
.layerGroup {
  position: relative;
  padding: 0;
  display: flex;
  justify-content: center;
  height: 90%;
}
.layer {
  position: absolute;
  pointer-events: none;
}

/* drag&drop */
.dropBox {
  margin: auto;
  text-align: center;
  vertical-align: middle;
  width: 50%;
  height: 75%;
}
.dropBoxBorder {
  border: 5px dashed rgba(68, 138, 255, 0.38);
}
.dropBoxBorder.hover {
  /* border: 5px dashed var(--md-theme-default-primary); */
}

/* element ui */
::v-deep .el-dialog__header {
  padding: 0;
}
</style>
<!-- non "scoped" style -->
<style>
.layer {
  position: absolute;
  pointer-events: none;
}
</style>
