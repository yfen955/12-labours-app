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
import { mySearch } from "./AlternateResponse.js";

export default {
  name: 'MapViewer',
  components: {
    MapContent: process.client
      ? () => import('@12-labours/mapintegratedvuer').then(m => m.MapContent)
      : null
  },
  provide: function() {
    return {
      alternateSearch: this.alternateSearch,
    };
  },
  data: () => {
    return {
      state: undefined,
      options: {
        flatmapAPI: undefined,
        rootUrl: undefined,
        queryUrl: undefined,
      },
      shareLink: undefined,
      alternateSearch: mySearch,
    };
  },
  created: function() {
    this.shareLink = `${this.$config.portal_url}${this.$route.fullPath}`;
    this.options= {
      flatmapAPI: this.$config.flatmap_api,
      rootUrl: this.$config.portal_url,
      queryUrl: this.$config.query_api_url,
    }
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
              this.shareLink = `${this.$config.portal_url}${this.$route.fullPath}`
            }
          )
        })
    }
  }
}
</script>

<style lang="scss">
.map-container {
  @import '~@12-labours/mapintegratedvuer/dist/mapintegratedvuer';
  height: 85vh;

  .icon-group {
    position: relative !important;
    justify-content: right !important;
  }
  .header-icon, .magnify, .map-icon {
    color: $app-primary-color !important;
  }
  .search-container .magnify {
    background: $app-primary-color !important;
  }
  .drawer-button, .open-drawer {
    margin-top: 21vh !important;
  }
  .pathways-display-text {
    font-size: inherit !important;
  }
  .el-checkbox__input + span.el-checkbox__label {
    padding-left: 10px;
  }
  .el-checkbox__input.is-checked + span.el-checkbox__label {
    font-size: 12px;
    color: $grey !important;
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
  .checkbox-group-inner {
    padding-top: 0 !important;
    padding-bottom: 0.5rem !important;
  }
  .el-checkbox.all-checkbox {
    padding-top: 0 !important;
  }

  .open-tab, .close-tab, .drawer-button, .open-drawer {
    border: 1px solid $app-primary-color !important;
    background-color: #e6edf2 !important;
  }
  .el-icon-arrow-left, .el-icon-arrow-right {
    color: $app-primary-color !important;
  }
  .el-button {
    padding: 0px 20px !important;
    text-transform: none;
  }
  .el-input__icon {
    color: grey;
  }
  // .filters .el-popover {
  //   background: #e6edf2 !important;
  // }
  .el-select .el-input .el-select__caret:before {
    font-size: 14px;
  }
  .el-select .el-input .el-select__caret.is-reverse {
    padding-top: 0;
  }
  .tag-button {
    padding: 0.2rem 0.2rem !important;
    height: auto;
    background: #e6edf2 !important;
  }
  .tag-button.active {
    background: $app-primary-color !important;
  }
  span, .details, .title {
    font-family: arimo !important;
  }
  .dataset-results-feedback {
    margin-right: 1rem;
  }
  .el-scrollbar__bar.is-horizontal {
    overflow: hidden;
  }
}
.pagination ul.el-pager li.number.active {
  background: $app-primary-color !important;
}
</style>