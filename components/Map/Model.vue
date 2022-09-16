<template>
  <div>
    <client-only placeholder="Loading model ...">

      <span v-if="$route.query.display === 'scaffold'">
        <div class="scaffoldvuer-container">
          <ScaffoldVuer :url='url' style="height:90%" />
        </div>
      </span>

      <span v-if="$route.query.display === 'flatmap'">
        <div class="flatmap-container">
          <FlatmapVuer
            :entry="taxo"
            :name="taxo"
            :display-minimap="false"
            :flatmap-a-p-i="flatmapAPI"
            @ready="flatmapReady"
            height="90%"
          />
        </div>
      </span>

      <span v-if="$route.query.display === 'plot'">
        <div class="plot-container">
          <plot-vuer
            :data-source="{ url: source_url }"
            :metadata="metadata"
            :supplemental-data="supplemental_data"
          />
        </div>
      </span>
    </client-only>
  </div>
</template>

<script>
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';

export default {
  name: 'Model',
  components: { 
    ScaffoldVuer: process.client
      ? () => import('@abi-software/scaffoldvuer').then(m => m.ScaffoldVuer)
      : null,
    FlatmapVuer: process.client
      ? () => import('@abi-software/flatmapvuer').then(m => m.FlatmapVuer)
      : null,
    PlotVuer: process.client
      ? () => import('@abi-software/plotvuer').then(m => m.PlotVuer)
      : null
  },
  data: () => {
    return {
      url: '',
      taxo: '',
      uberonid: '',
      filename: '',
      flatmapAPI: process.env.flatmap_api,
      // source_url: 'https://api.sparc.science/s3-resource/141/2/files/primary/sub-1/sam-1/subject1.txt',
      source_url: '',
      metadata: {
        attrs: {
          "plot-layout": {
            height:"700px",
            margin: {t: 35, l: 85, r: 55, b: 190, pad: 4},
          },
          style: "timeseries",
          "x-axis-column": 2,
          "y-axes-columns": [3, 4, 5, 6, 7, 8, 9, 10],
        },
        type: "plot",
        version: "1.1.0",
      },
      supplemental_data: [{url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com…v-data/use-case-2/Sample_1_18907001_channel_1.csv'}],
    }
  },

  created: function() {
    this.url = this.$route.query.url;
    this.taxo = this.$route.query.taxo;
    this.uberonid = this.$route.query.uberonid;
    this.filename = this.$route.query.filename;
    this.source_url = `${process.env.query_api_url}download/data/datasets/${this.$route.params.id}/${this.filename}`;
  },

  methods: {
    flatmapReady: function(component) {
      let id = this.checkForIlxtr(this.uberonid)
      component.mapImp.zoomToFeatures(id)
      // **NOTE: This is commented out until fCCB approves the popups
      // component.checkAndCreatePopups({
      //   resource: [id],
      //   eventType: 'click'
      // })
    },

    checkForIlxtr: function(id) {
      if (id.includes('neuron-type-keast') && !id.includes('ilxtr')) {
        return 'ilxtr:' + id
      }
      return id
    },

    // handlePlot (){
    //   let supplemental_data = []
    //   if (plot_annotation.isDescribedBy) {
    //     let tmp_path = plot_annotation.isDescribedBy.path
    //     // Hack to fix path entry.
    //     if (tmp_path === '../derivative/sub-1/subject1_header.txt') {
    //       tmp_path = 'derivative/sub-1/sam-1/subject1_header.txt'
    //     }
    //     const supplemental_file_path = `${route.query.dataset_id}/${route.query.dataset_version}/files/${tmp_path}`
    //     const supplemental_url_response = await discover.downloadLink(
    //       supplemental_file_path
    //     )
    //     let supplemental_url = supplemental_url_response.data
    //     if (process.env.portal_api === 'http://localhost:8000') {
    //       supplemental_url = `${process.env.portal_api}/s3-resource/${supplemental_file_path}`
    //     }
    //     supplemental_data.push({
    //       url: supplemental_url
    //     })
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
.scaffoldvuer-container {
  height: 90vh;
  max-width: calc(100% - 48px);
  left: 24px;
  overflow: hidden;
  position: relative;
}
::v-deep .el-loading-text {
    color: $app-primary-color !important;
  }
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: $app-primary-color !important;
  &::after {
    transform: rotate(45deg) scale(1) !important;
    left: 0.3em !important;
    top: 0.1em !important;
  }
}
::v-deep .region-tree-node {
  color: $app-primary-color !important;
}
::v-deep .el-color-picker__color {
  border: 1px solid $app-primary-color !important;
}
::v-deep .el-slider__bar {
  background-color: $app-primary-color !important;
}
::v-deep .el-slider__button {
  border: 2px solid $app-primary-color !important;
}
::v-deep i {
  color: $app-primary-color !important;
}
::v-deep .backgroundChoice.active {
  border: 2px solid $app-primary-color !important;
}
::v-deep .background-popper {
  border: 1px solid $app-primary-color !important;
  &.el-popper[x-placement^=top] .popper__arrow {
    border-top-color: $app-primary-color !important;
  }
  &.el-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: $app-primary-color !important;
  }
}
::v-deep .scaffold-popper {
  background-color: $background !important;
  border: 1px solid $app-primary-color !important;
  &.right-popper .popper__arrow {
    border-right-color: $app-primary-color !important;
    &::after {
      border-right-color: $background !important;
    }
  }
  &.left-popper .popper__arrow {
    border-left-color: $app-primary-color !important;
    &::after {
      border-left-color: $background !important;
    }
  }
  &.popper-zoomout[x-placement^=top] .popper__arrow {
    border-top-color: $app-primary-color !important;
    &::after {
      border-top-color: $background !important;
    }
  }
  &.popper-zoomout[x-placement^=bottom] .popper__arrow {
    border-bottom-color: $app-primary-color !important;
    &::after {
      border-bottom-color: $background !important;
    }
  }
}
::v-deep .el-popper {
  &.scaffold-popper[x-placement^=top] .popper__arrow {
    border-top-color: $app-primary-color !important;
    &::after {
      border-top-color: $background !important;
    }
  }
  &.scaffold-popper[x-placement^=bottom] .popper__arrow {
    border-bottom-color: $app-primary-color !important;
    &::after {
      border-bottom-color: $background !important;
    }
  }
}

</style>

// <style lang="scss">
// .flatmap-container {
//   margin-top: 1.5rem;
//   height: 90vh;
//   max-width: calc(100% - 48px);
//   padding-left: 24px;
//   @import '~@abi-software/flatmapvuer/dist/flatmapvuer';

//   span {
//     color: $app-primary-color !important;
//   }
//   .el-loading-text {
//     color: $app-primary-color !important;
//   }
//   .el-checkbox__input.is-checked+span.el-checkbox__label {
//     font-size: .5rem;
//   }

//   .flatmap-container {
//     .el-checkbox__label {
//       color: $app-primary-color !important;
//     }
//     .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
//       border-color: $app-primary-color !important;
//     }
//     .checkbox-group-inner {
//       padding: 0;
//     }
//     .pathways-display-text {
//       padding-top: 0.5rem;
//     }

//     .backgroundControl {
//       margin-top: .5em;
//     margin-bottom: .5em;
//     }
//     .background-popper.el-popper[x-placement^=top] .popper__arrow {
//       border-top-color: $app-primary-color !important;
//     }

//     .flatmap-tooltip-popup{
//       &.mapboxgl-popup-anchor-bottom .mapboxgl-popup-content::before {
//           border-color: $app-primary-color transparent transparent transparent;
//       }
//       .mapboxgl-popup-content {
//         border: 1px solid $app-primary-color !important;
//         .flatmap-feature-label {
//           color: $app-primary-color !important;
//         }
//       }
//     }

//     .flatmap-popper {
//       border: 1px solid $app-primary-color !important;
//       background-color: $background !important;
//       &.left-popper .popper__arrow {
//         border-left-color: $app-primary-color !important;
//         &::after {
//           border-left-color: $background !important;
//         }
//       }
//       &.right-popper .popper__arrow {
//         border-right-color: $app-primary-color !important;
//         &::after {
//           border-right-color: $background !important;
//         }
//       }
//       &.el-popper[x-placement^=top] .popper__arrow {
//         border-top-color: $app-primary-color !important;
//         &::after {
//           border-top-color: $background !important;
//         }
//       }
//       &.el-popper[x-placement^=bottom] .popper__arrow {
//         border-bottom-color: $app-primary-color !important;
//         &::after {
//           border-bottom-color: $background !important;
//         }
//       }
//     }
//   }

//   .el-radio {
//     margin: 0;
//     .el-radio__label {
//       color: black !important;
//     }
//     &.is-checked {
//       margin-right: 0;
//       .el-radio__label {
//         color: $app-primary-color !important;
//       }
//     }
//   }
//   .el-radio__input.is-checked+span.el-radio__label, .el-radio__input.is-disabled+span.el-radio__label, .el-radio__label {
//     font-size: 1em;
//   }
//   .el-radio__input.is-checked .el-radio__inner {
//     width: 1em;
//     height: 1em;
//     &::after {
//       width: .7em;
//       height: .7em;
//     }
//   }

//   .tooltip-container {
//     border: 1px solid $app-primary-color !important;
//   }
// }

// // ::-webkit-scrollbar {
// //   width: 20px;
// // }
// </style>