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
              v-on:isReady="mapMounted"
            />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mySearch } from "./AlternateResponse.js";
import backendQuery from "@/services/backendQuery";

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
      currentEntry: undefined,
      flatmap_dict: {
        "Cat": {
          type: 'MultiFlatmap',
          taxo: 'NCBITaxon:9685',
          biologicalSex: undefined,
          uuid: undefined,
          organ: undefined,
        },
        "Human Male": {
          type: 'MultiFlatmap',
          taxo: 'NCBITaxon:9606',
          biologicalSex: "PATO:0000384",
          uuid: undefined,
          organ: undefined,
        },
        "Human Female": {
          type: 'MultiFlatmap',
          taxo: 'NCBITaxon:9606',
          biologicalSex: "PATO:0000383",
          uuid: undefined,
          organ: undefined,
        },
        "Mouse": {
          type: 'MultiFlatmap',
          taxo: 'NCBITaxon:10090',
          biologicalSex: undefined,
          uuid: undefined,
          organ: undefined,
        },
        "Pig": {
          type: 'MultiFlatmap',
          taxo: 'NCBITaxon:9823',
          biologicalSex: undefined,
          uuid: undefined,
          organ: undefined,
        },
        "Rat": {
          type: 'MultiFlatmap',
          taxo: 'NCBITaxon:10114',
          biologicalSex: undefined,
          uuid: undefined,
          organ: undefined,
        },
      },
      relevant_facets: [],
      alternateSearch: mySearch,
    };
  },

  created: function() {
    this.shareLink = `${this.$config.portal_url}${this.$route.fullPath}`;
    this.options= {
      flatmapAPI: this.$config.flatmap_api,
      rootUrl: this.$config.portal_url,
      queryUrl: this.$config.query_api_url,
    };
  },

  methods: {
    fetchScaffold: async function() {
      let data = await backendQuery.getSingleData(this.$config.query_api_url, this.$route.query.id, [this.$route.query.access]);
      let dataset_id = data.experiments[0].submitter_id;
      this.url = `${this.$config.query_api_url}/data/download/${dataset_id}/${data.filename.substring(0, data.filename.lastIndexOf("/"))}/${data.is_derived_from}`;
      this.viewUrl = `${this.$config.query_api_url}/data/download/${dataset_id}/${data.filename}`;
    },

    openViewWithQuery: async function () {
      if (this.$route.query.type === 'scaffold') {
        await this.fetchScaffold();
        this.currentEntry = {
          type: "Scaffold",
          // label: "Colon",
          url: this.url,
          viewUrl: this.viewUrl
        };
      } else if (this.$route.query.type === 'flatmap')
        this.currentEntry = this.flatmap_dict[this.$route.query.id];
    },

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
    },

    currentEntryUpdated: async function () {
      await this.openViewWithQuery();
      if (this.$refs.map)
        this.$refs.map.setCurrentEntry(this.currentEntry);
    },

    getFacets: async function () {
      if (this.$route.query.type === 'scaffold') {
        let data = await backendQuery.fetchQueryData(
          this.$config.query_api_url,
          "experiment_query",
          { submitter_id: [this.$route.query.dataset_id] },
          "",
          [this.$route.query.access]
        );
        this.relevant_facets = data.facets;
      } else if (this.$route.query.type === 'flatmap')
        this.relevant_facets = [{facet: this.$route.query.id, term:'Species', facetPropPath: 'case_filter>species'}];
    },

    setFacets: async function() {
      await this.getFacets();
      if (this.$refs.map)
        this.$refs.map.openSearch(this.relevant_facets, '');
    },
    
    mapMounted: function () {
      this.currentEntryUpdated();
      this.setFacets();
    },
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

  .background-popper {
    height: auto !important;
  }
  .backgroundControl {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem;
  }
  .el-radio__input.is-checked .el-radio__inner {
    width: 1rem;
    height: 1rem;
  }
  .el-radio, .el-radio+.el-radio {
    margin-left: 0;
  }
  .el-radio__input.is-checked .el-radio__inner:after {
    border: 0;
  }
  .el-switch__label.is-active {
    color: $app-primary-color !important;
  }

  .time-slider-container .el-row {
    margin-bottom: 1rem !important;
  }
}
.pagination ul.el-pager li.number.active {
  background: $app-primary-color !important;
}
</style>