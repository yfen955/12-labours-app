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
          <img
            v-else
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
          <el-button v-else @click="viewModel(card.type, card.id)">
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
      this.$router.push({
        name: `data-maps-${model.toLowerCase()}-id`,
        params: { id: uuid },
      });
    },

    downloadThumbnail(url) {
      window.open(url);
    },
  },

  created() {
    this.dataShowed = this.cards;
  },
};
</script>

<style lang="scss" scoped>
.el-icon-data-analysis {
  font-size: 5rem;
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
}
</style>
