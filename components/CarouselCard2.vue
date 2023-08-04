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
          <img
            v-else
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
            {{ card.type }}
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
      if (type === "Thumbnail") {
        window.open(url);
      } else if (type === "Scaffold" || type === "Plot") {
        const route = this.$router.resolve({
          name: `data-maps-${type.toLowerCase()}-id`,
          params: { id: uuid },
          query: { access: this.$route.query.access },
        });
        window.open(route.href);
      }
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

  .card-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-image {
    width: 10rem;
    height: 9rem;

    img {
      width: 10rem;
    }
  }

  .card-button {
    margin-top: 1rem;
  }
}
</style>
