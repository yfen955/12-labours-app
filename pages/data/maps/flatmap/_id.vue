<template>
  <div class="page-outer">
    <div class="container-default">
      <div class="model-container">
        <div class="model-title">
          <h1>Flatmap Viewer</h1>
          <CopyLink />
        </div>

        <client-only placeholder="Loading Flatmap ...">
          <div class="flatmap-container">
            <FlatmapVuer
              :entry="taxo"
              :name="taxo"
              :display-minimap="false"
              :flatmap-a-p-i="flatmapAPI"
              @ready="flatmapReady"
              :pathControls="true"
            />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import CopyLink from "../../../../components/Map/copyLink";

export default {
  name: 'FlatmapViewer',
  components: {
    FlatmapVuer: process.client
      ? () => import('@abi-software/flatmapvuer').then(m => m.FlatmapVuer)
      : null,
    CopyLink
  },
  props: [ "id" ],
  data: () => {
    return {
      isLoading: true,
      flatmapAPI: undefined,
      taxo: "NCBITaxon:10114",
      uberonid: "UBERON:0013702",
    };
  },

  created: function() {
    this.flatmapAPI = this.$config.flatmap_api;
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
  },
}
</script>

<style lang="scss">
.el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: $app-primary-color !important;
  &::after {
    transform: rotate(45deg) scale(1) !important;
    left: 0.3rem !important;
    top: 0.1rem !important;
  }
}
.el-icon-arrow-left {
  color: $app-primary-color !important;
}
.el-icon-loading {
  color: $app-primary-color !important;
}
.model-container .flatmap-container {
  height: 85vh;
}
.flatmap-container {
  @import '~@abi-software/flatmapvuer/dist/flatmapvuer';

  .pathways-display-text {
    font-size: inherit !important;
  }
  .checkbox-group {
    width: auto !important;
    padding: 1rem;
  }
  span {
    color: $app-primary-color !important;
  }
  .el-loading-text {
    color: $app-primary-color !important;
  }
  .el-checkbox__input.is-checked+span.el-checkbox__label {
    font-size: 12px;
    line-height: 14px;
  }

  .flatmap-container {
    .el-checkbox__label {
      color: $app-primary-color !important;
      padding-left: 10px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: $app-primary-color !important;
    }
    .checkbox-group-inner {
      padding: 0;
    }
    .pathways-display-text {
      padding-top: 0.5rem;
    }

    .backgroundControl {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .background-popper.el-popper[x-placement^=top] .popper__arrow {
      border-top-color: $app-primary-color !important;
    }

    .flatmap-tooltip-popup{
      &.mapboxgl-popup-anchor-bottom .mapboxgl-popup-content::before {
          border-color: $app-primary-color transparent transparent transparent;
      }
      .mapboxgl-popup-content {
        border: 1px solid $app-primary-color !important;
        .flatmap-feature-label {
          color: $app-primary-color !important;
        }
      }
    }

    .flatmap-popper {
      border: 1px solid $app-primary-color !important;
      background-color: $background !important;
      &.left-popper .popper__arrow {
        border-left-color: $app-primary-color !important;
        &::after {
          border-left-color: $background !important;
        }
      }
      &.right-popper .popper__arrow {
        border-right-color: $app-primary-color !important;
        &::after {
          border-right-color: $background !important;
        }
      }
      &.el-popper[x-placement^=top] .popper__arrow {
        border-top-color: $app-primary-color !important;
        &::after {
          border-top-color: $background !important;
        }
      }
      &.el-popper[x-placement^=bottom] .popper__arrow {
        border-bottom-color: $app-primary-color !important;
        &::after {
          border-bottom-color: $background !important;
        }
      }
    }

    .pathway-container {
      max-height: calc(100% - 48px);
      transition: all 1s ease;
    }
  }

  .el-radio {
    margin: 0;
    .el-radio__label {
      color: black !important;
    }
    &.is-checked {
      margin-right: 0;
      .el-radio__label {
        color: $app-primary-color !important;
      }
    }
  }

  .el-radio__input.is-checked+span.el-radio__label, .el-radio__input.is-disabled+span.el-radio__label, .el-radio__label {
    font-size: 1rem;
  }

  .el-radio__input.is-checked .el-radio__inner {
    width: 1rem;
    height: 1rem;
    &::after {
      width: .7rem;
      height: .7rem;
    }
  }
  .tooltip-container, .drawer-button {
    border: 1px solid $app-primary-color !important;
    background-color: $lightGrey;
  }

  .el-checkbox {
    margin-left: 0;
    padding-top: 0;
  }
}
</style>