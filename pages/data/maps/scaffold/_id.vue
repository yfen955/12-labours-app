<template>
  <div class="page-outer">
    <div class="container-default">
      <div class="model-container">
        <div class="model-title">
          <h1>Scaffold Viewer</h1>
          <CopyLink />
        </div>
        
        <client-only placeholder="Loading Scaffold ...">
          <div class="scaffold-container">
              <ScaffoldVuer 
                v-if="!isLoading" 
                :url='url'
                :view-u-r-l="viewUrl"
              />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import CopyLink from "../../../../components/Map/copyLink";
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';
import fetchModel from "../fetchModel";

export default {
  name: 'ScaffoldViewer',
  components: {
    ScaffoldVuer: process.client
      ? () => import('@abi-software/scaffoldvuer').then(m => m.ScaffoldVuer)
      : null,
    CopyLink
  },
  props: [ 'id' ],
  data: () => {
    return {
      isLoading: true,
      url: '',
      viewUrl: '',
    }
  },

  async fetch() {
    this.isLoading = true;
    let data = await fetchModel.fetchModelInfo(this.$route.params.id, this.$store);
    let dataset_id = data.experiments[0].submitter_id;
    this.url = `${process.env.query_api_url}/data/download/${dataset_id}/${data.filename.substring(0,data.filename.lastIndexOf("/"))}/${data.is_derived_from}`;
    this.viewUrl = `${process.env.query_api_url}/data/download/${dataset_id}/${data.filename}`;
    this.isLoading = false;
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-loading-text {
    color: $app-primary-color !important;
  }
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: $app-primary-color !important;
  &::after {
    transform: rotate(45deg) scale(1) !important;
    left: 0.3rem !important;
    top: 0.1rem !important;
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