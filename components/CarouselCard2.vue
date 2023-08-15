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
        <div class="card-image">
          <i v-if="card.type == 'Plot'" class="el-icon-data-analysis"></i>
          <i v-if="card.type == 'MRI'" class="el-icon-first-aid-kit"></i>
          <img
            v-if="card.type !== 'Plot' && card.type !== 'MRI'"
            :src="card.url"
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
          <p slot="reference" class="card-name">
            {{ card.filename }}
          </p>
        </el-popover>
        <div class="card-button">
          <el-button @click="view(card.type, card.url, card.id)">
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

    view(type, url, uuid) {
      this.$emit("cardInfo", type, url, uuid);
    },
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

  .card-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-image {
    width: 10rem;
    height: 9rem;

    img {
      width: 9rem;
    }
  }

  .card-button {
    margin-top: 1rem;
  }

  .segmentation-btn {
    padding: 0.25rem 1rem;
  }
}
</style>
