<template>
  <el-carousel
    :autoplay="false"
    trigger="click"
    type="card"
    arrow="always"
    height="20rem"
  >
    <el-carousel-item
      v-show="dataShowed.length > 0"
      v-for="card in dataShowed"
      :key="card.filename"
    >
      <el-card>
        <div class="model-image">
          <i v-if="card.type == 'Plot'" class="el-icon-data-analysis"></i>
          <i v-if="card.type == 'Segmentation'" class="el-icon-first-aid-kit"></i>
          <img
            v-if="card.type !== 'Plot' && card.type !== 'Segmentation'"
            :src="card.imageUrl"
            :alt="card.filename"
            @error="replaceByDefaultImage"
          />
        </div>
        <p class="type-name">{{ card.type }}</p>
        <el-popover
          placement="top-start"
          trigger="hover"
          :content="card.filename"
        >
          <p slot="reference" class="model-name">
            {{ card.filename }}
          </p>
        </el-popover>
        <div class="model-button">
          <el-button
            v-if="card.type == 'Thumbnail'"
            @click="downloadThumbnail(card.imageDownload)"
          >
            Download
          </el-button>
          <el-button
            class="segmentation-btn"
            v-if="card.type == 'Segmentation'"
            @click="openSegmentation(card.id)"
          >
            View Segmentation
          </el-button>
          <el-button
            v-if="card.type !== 'Thumbnail' && card.type !== 'Segmentation'"
            @click="viewModel(card.type, card.id)"
          >
            View {{ card.type }}
          </el-button>
        </div>
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "CarouselCard",

  data: () => {
    return {
      dataShowed: [],
      imagePlaceholder: require("../static/img/12-labours-logo-black.png"),
    };
  },

  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    replaceByDefaultImage(error) {
      error.target.src = this.imagePlaceholder;
    },

    viewModel(model, uuid) {
      let route = this.$router.resolve({
        name: `data-maps-${model.toLowerCase()}-id`,
        params: { id: uuid },
        query: { access: this.$route.query.access },
      });
      window.open(route.href);
    },

    downloadThumbnail(url) {
      window.open(url);
    },

    openSegmentation(id) {
      // window.open(`http://localhost:5173/NRRD_Segmentation_Tool/#/${id}`, '_blank');
      this.$router.push({ path: "/incomplete" });
    }
  },

  created() {
    this.dataShowed = this.cards;
  },
};
</script>

<style lang="scss" scoped>
.el-icon-data-analysis, .el-icon-first-aid-kit {
  font-size: 8rem;
}

.el-carousel__item {
  margin-top: 0.5rem;
  margin-left: calc((50% - 17rem) / 2);
  width: 17rem;
}

.el-card {
  height: 19rem;

  .type-name {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .model-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .model-image {
    width: 10rem;
    height: 9rem;

    img {
      width: 10rem;
    }
  }

  .model-button {
    margin-top: 1rem;
  }

  .segmentation-btn {
    padding: 0.25rem 1rem;
  }
}
</style>
