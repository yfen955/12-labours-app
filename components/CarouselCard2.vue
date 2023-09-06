<template>
  <div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="showAll"
      @change="handleCheckAll"
      >Show All Models</el-checkbox
    >
    <el-checkbox-group v-model="selected_models" @change="updateCheckAll">
      <el-checkbox v-for="(item, i) in all_models" :label="item" :key="i">
        {{ item }}
      </el-checkbox>
    </el-checkbox-group>

    <el-carousel
      :autoplay="false"
      trigger="click"
      type="card"
      arrow="always"
      height="20rem"
    >
      <el-carousel-item
        v-show="dataShowed.length > 0"
        v-for="(card, i) in dataShowed"
        :key="i"
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
              {{ card.type }}
            </el-button>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "CarouselCard",

  data: () => {
    return {
      dataShowed: [],
      showAll: true,
      isIndeterminate: false,
      selected_models: [],
      imagePlaceholder: require("../static/img/12-labours-logo-black.png"),
    };
  },

  props: {
    cards: {
      type: Array,
      default: () => [],
    },

    all_models: {
      type: Set,
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

    updateDataShowed() {
      let data = [];
      this.cards.forEach((item) => {
        if (this.selected_models.includes(item.type)) data.push(item);
      });
      this.dataShowed = [...data];
    },

    handleCheckAll() {
      this.selected_models = this.showAll ? [...this.all_models] : [];
      this.dataShowed = this.showAll ? [...this.cards] : [];
      this.isIndeterminate = this.selected_models.length < this.all_models.size && this.selected_models.length > 0;
    },

    updateCheckAll() {
      this.showAll = this.selected_models.length === this.all_models.size;
      this.isIndeterminate =
        this.selected_models.length < this.all_models.size &&
        this.selected_models.length > 0;
      this.updateDataShowed();
    },
  },

  created() {
    this.dataShowed = this.cards;
    this.selected_models = [...this.all_models];
  },
};
</script>

<style lang="scss" scoped>
.el-icon-data-analysis,
.el-icon-first-aid-kit {
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

::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner:before {
  border-bottom: 0.2rem solid #00467f;
  background-color: $app-primary-color;
  top: 0.5rem;
}

.el-checkbox + .el-checkbox {
  margin-left: 0.75rem;
}
</style>
