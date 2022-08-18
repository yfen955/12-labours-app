<template>
  <div>
    <client-only placeholder="Loading scaffold ...">
      <div class="scaffoldvuer-container">
        <ScaffoldVuer :url='location' style="height:90%" />
      </div>
    </client-only>
  </div>
  
</template>

<script>
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';

export default {
    name: 'Map',
    components: { 
      ScaffoldVuer: process.client
        ? () => import('@abi-software/scaffoldvuer').then(m => m.ScaffoldVuer)
        : null
    },
    props: ['location'],
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
// ::v-deep .icon-button {
//   fill: $app-primary-color !important;
// }
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
  &.el-popper[x-placement^=top] {
    .popper__arrow {
      border-top-color: $app-primary-color !important;
    }
  }&.el-popper[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: $app-primary-color !important;
    }
  }
}
::v-deep .scaffold-popper {
  background-color: $background !important;
  border: 1px solid $app-primary-color !important;
  &.right-popper {
    .popper__arrow {
      border-right-color: $app-primary-color !important;
      &::after {
        border-right-color: $background !important;
      }
    }
  }
  &.left-popper {
    .popper__arrow {
      border-left-color: $app-primary-color !important;
      &::after {
        border-left-color: $background !important;
      }
    }
  }
  &.popper-zoomout[x-placement^=top] {
    .popper__arrow {
      border-top-color: $app-primary-color !important;
      &::after {
        border-top-color: $background !important;
      }
    }
  }
  &.popper-zoomout[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: $app-primary-color !important;
      &::after {
        border-bottom-color: $background !important;
      }
    }
  }
}
::v-deep .el-popper {
  &.scaffold-popper[x-placement^=top] {
    .popper__arrow {
      border-top-color: $app-primary-color !important;
      &::after {
        border-top-color: $background !important;
      }
    }
  }
  &.scaffold-popper[x-placement^=bottom] {
    .popper__arrow {
      border-bottom-color: $app-primary-color !important;
      &::after {
        border-bottom-color: $background !important;
      }
    }
  }
}
</style>