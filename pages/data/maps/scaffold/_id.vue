<template>
  <div class="container-default">
    <div class="modal-container">
      <div class="title-container">
        <h1>Scaffold Viewer</h1>
        <CopyLink />
      </div>
      
      <client-only placeholder="Loading Scaffold ...">
        <div class="scaffoldvuer-container">
            <ScaffoldVuer v-if="!isLoading" :url='url' style="height:90%" />
        </div>
      </client-only>
    </div>
    
  </div>
</template>

<script>
import backendQuery from '@/services/backendQuery';
import CopyLink from "../../../../components/Map/copyLink";
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';

export default {
  name: 'ScaffoldViewer',
  components: {
    ScaffoldVuer: process.client
      ? () => import('@abi-software/scaffoldvuer').then(m => m.ScaffoldVuer)
      : null,
    CopyLink
  },
  props: [ "id" ],
  data: () => {
    return {
      isLoading: true,
      url: '',
    }
  },

  async fetch() {
    this.isLoading = true;
    let data = await backendQuery.fetchManifestData('manifest', {}, `${this.$route.params.id}`, 100, 1);
    data = data[0];
    let filename = data.filename;
    let dataset_id = data.experiments[0].submitter_id;
    this.url = `${process.env.query_api_url}download/data/datasets/${dataset_id}/${filename}`;
    this.isLoading = false;
  },
}
</script>

<style scoped lang="scss">
.modal-container {
  border: 1px solid #E4E7ED;
}
.title-container {
  display: flex;
  h1 {
    margin-top: .5em;
    margin-left: 1em;
  }
}
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