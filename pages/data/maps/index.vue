<template>
  <div class="page-outer">
    <div class="container-default">
      <div class="model-container">
        <client-only placeholder="Loading Map Viewer ...">
          <div class="map-container">
            <MapContent
              ref="map"
              :state="state"
              :options="options"
              :share-link="shareLink"
              @updateShareLinkRequested="updateUUID"
            />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapViewer',
  components: {
    MapContent: process.client
      ? () => import('@abi-software/mapintegratedvuer').then(m => m.MapContent)
      : null
  },
  data: () => {
    return {
      state: undefined,
      options:{
        flatmapAPI: process.env.FLATMAPAPI_LOCATION,
        rootUrl: process.env.base_url,
      },
      shareLink: undefined
    }
  },
  created: function() {
    this.shareLink = `${process.env.base_url}${this.$route.fullPath}`
  },
  methods: {
    updateUUID: function() {
      let url = this.options.sparcApi + `map/getshareid`
      let state = this.$refs.map.getState()
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ state: state })
      })
        .then(response => response.json())
        .then(data => {
          this.uuid = data.uuid
          this.$router.replace(
            { query: { ...this.$route.query, id: data.uuid } },
            () => {
              this.shareLink = `${process.env.ROOT_URL}${this.$route.fullPath}`
            }
          )
        })
    }
  }
}
</script>

<style lang="scss">
.map-container {
  @import '~@abi-software/mapintegratedvuer/dist/mapintegratedvuer';
  height: 85vh;

  .el-loading-spinner .el-loading-text, .el-loading-spinner i {
    color: $app-primary-color !important;
  }
  .text.title {
    color: $app-primary-color !important;
  }
  .search-container .magnify {
    background: $app-primary-color !important;
  }
  .el-button--primary.is-plain {
    color: $app-primary-color !important;
    background: $background !important;
    border-color: $mildBlue !important;
  }

  .drawer-button, .open-drawer {
    margin-top: calc(50% + 45px) !important;
  }
  .pathways-display-text {
    font-size: inherit !important;
  }
  .el-checkbox__input.is-checked + span.el-checkbox__label {
    font-size: 12px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .map-container .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: $app-primary-color !important;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    border-color: $app-primary-color !important;
    &::after {
      transform: rotate(45deg) scale(1.2) !important;
      left: 0.25rem !important;
      top: 0.05rem !important;
    }
  }
  .el-checkbox {
    margin-left: 0;
    padding-top: 0.5rem;
  }
  .el-checkbox:first-child {
    padding-top: 0;
  }

  .open-tab, .close-tab, .drawer-button, .open-drawer {
    border: 1px solid $app-primary-color !important;
    background-color: $background !important;
  }
  .el-icon-arrow-left, .el-icon-arrow-right {
    color: $app-primary-color !important;
  }
  .content-card .el-card__header, .content-card .el-card__header .header {
    background-color: $darkBlue !important;
    border-color: $darkBlue !important;
    
  }
  .button {
    background-color: $app-secondary-color !important;
    border: $app-secondary-color !important;
    box-sizing: border-box !important;
    border-radius: 1rem !important;
    font: {
      size: 1.13rem;
      family: $font-family;
      weight: 600; 
    }
    padding: 0.25rem 2.5rem;
    height: 2rem;
    margin-top: 2px;
  }
  .help {
    color: $app-primary-color !important;
  }
  .content .el-loading-spinner .path {
    stroke: $app-primary-color !important;
  }
  .search-filters .el-cascader-node.in-active-path, .search-filters .el-cascader-node.is-active {
    color: $app-primary-color !important;
  }
  .el-popover {
    border: 1px solid $app-primary-color !important;
    background: $background !important;
    .popper__arrow {
      border-bottom-color: $app-primary-color !important;
      border-top-color: $app-primary-color !important;
    }
  }
  .el-select-dropdown__item.selected {
    color: $mildBlue !important;
  }
}
</style>