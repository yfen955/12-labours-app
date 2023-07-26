<template>
  <div>
    <div class="filter-container">
      <h4>Refine results</h4>
      <hr />
      <h5>Filters applied</h5>

      <el-card shadow="never" class="facet-card">
        <span v-if="selectedItems.length === 0" class="no-facets">
          No filters applied
        </span>
        <el-tag
          v-for="facet in selectedItems"
          :key="facet"
          class="tags"
          disable-transitions
          closable
          @close="deselectFacet(facet)"
        >
          <span>{{ facet }}</span>
        </el-tag>
      </el-card>

      <!-- switch relation -->
      <div class="relation-container">
        <h5>Filters relation</h5>
        <div class="filter-switch">
          <p>OR</p>
          <el-switch
            v-model="relation"
            active-color="#00467F"
            inactive-color="#D11241"
            @change="handleSwitch"
          >
          </el-switch>
          <p>AND</p>
        </div>
      </div>

      <el-collapse>
        <el-collapse-item
          v-for="(filter, index) in filters_list"
          :key="index"
          :title="filter.title"
        >
          <el-checkbox
            :indeterminate="filter.isIndeterminate"
            class="filter-selector"
            v-model="filter.checkAll"
            @change="handleCheckAllChange(filter, index)"
          >
            Select all
          </el-checkbox>
          <hr class="checkbox-line" />
          <el-checkbox-group
            v-model="filter.selectedItem"
            @change="updateCheckAll(filter, index)"
          >
            <el-checkbox
              class="filter-selector"
              v-for="(type, index) in filter.filter_items"
              v-show="type !== 'NA'"
              :key="index"
              :label="type"
            >
              {{ type }}
            </el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: ["allFilterDict"],

  data: () => {
    return {
      filters_list: [],
      selectedItems: [],
      filteredData: [],
      filters_dict: {},
      newTotalCount: 0,
      element_list: [],
      all_facets_list: [],
      relation: true,
    };
  },

  created: function() {
    this.dataChange(this.$route.query.type);
  },

  watch: {
    "$route.query.type": {
      handler() {
        this.dataChange(this.$route.query.type);
      },
    },
    allFilterDict: {
      handler() {
        this.dataChange(this.$route.query.type);
      },
    },
    "$route.query.facets": {
      handler(new_val, old_val) {
        if (new_val && old_val && new_val.length < old_val.length) {
          old_val.split(",").forEach((item) => {
            if (new_val.indexOf(item) == -1) this.deselectFacet(item);
          });
        } else if (old_val && !new_val) {
          this.deselectFacet(old_val);
        } else if (!old_val && new_val) {
          this.dataChange(this.$route.query.type);
        } else if (new_val && old_val && new_val.length > old_val.length) {
          this.dataChange(this.$route.query.type);
        }
      },
    },
    "$route.query.relation": {
      handler(val) {
        if (val) {
          this.relation = val === "and" ? true : false;
        } else {
          this.relation = true;
        }
        this.$emit("relation", this.relation);
      },
    },
  },

  methods: {
    async dataChange(val) {
      this.filters_list = [];
      this.element_list = [];
      if (this.$route.query.relation) {
        this.relation = this.$route.query.relation === "and" ? true : false;
      } else {
        this.relation = true;
      }
      if (val === "dataset") {
        this.convertFacets();
      }
    },

    convertFacets() {
      for (let i = 0; i < this.allFilterDict.size; i++) {
        this.filters_list.push({
          index: i,
          node_field: this.allFilterDict["nodes>fields"][i],
          // fieldName: this.allFilterDict.fields[i],
          title: this.allFilterDict.titles[i],
          filter_items: Object.keys(this.allFilterDict.elements[i]),
          selectedItem: [],
          checkAll: true,
          isIndeterminate: false,
        });
        this.element_list.push([]);
      }

      if (this.$route.query.facets) {
        this.selectedItems = this.$route.query.facets.split(",");
        let finished = false;
        for (let i = 0; i < this.selectedItems.length; i++) {
          let facet = this.selectedItems[i];
          this.filters_list.map((val) => {
            let index = val.filter_items.indexOf(facet);
            if (index > -1) {
              val.selectedItem.push(val.filter_items[index]);
              if (i === this.selectedItems.length - 1) finished = true;
              if (val.selectedItem.length === val.filter_items.length) {
                val.selectedItem = [];
                val.checkAll = true;
                val.isIndeterminate = false;
                this.handleChange(val, finished);
              } else {
                val.checkAll = false;
                val.isIndeterminate = true;
                this.generateFiltersDict(val, finished);
              }
            }
          });
        }
      } else {
        this.selectedItems = [];
        this.generateFiltersDict();
      }
    },

    async handleChange(filter, finished) {
      this.selectedItems = [];
      for (let i = 0; i < this.filters_list.length; i++) {
        this.selectedItems = this.selectedItems.concat(
          this.filters_list[i].selectedItem
        );
      }

      if (this.selectedItems.length === 0) {
        this.element_list = [];
      }

      if (!filter) {
        await this.generateFiltersDict();
      } else {
        await this.generateFiltersDict(filter, finished);
      }

      this.updateURL();
    },

    handleCheckAllChange(filter, i) {
      let refresh =
        this.filters_list[i].selectedItem.length === 0 ? false : true;
      if (filter.checkAll) {
        this.filters_list[i].selectedItem = [];
      } else {
        this.filters_list[i].checkAll = true;
      }
      this.filters_list[i].isIndeterminate = false;
      // don't fetch data when already has selected all
      if (refresh) {
        this.handleChange(filter);
      }
    },

    // update the checkAll state when the selected facets are changed
    updateCheckAll(filter, i) {
      let checkedCount = filter.selectedItem.length;
      let allFacetsLength = filter.filter_items.length;
      if (checkedCount === allFacetsLength || checkedCount === 0) {
        this.element_list[i] = [];
        this.filters_list[i].checkAll = true;
        this.filters_list[i].isIndeterminate = false;
        this.filters_list[i].selectedItem = [];
      } else {
        this.filters_list[i].checkAll = false;
        this.filters_list[i].isIndeterminate = true;
      }
      this.handleChange(filter);
    },

    // if a tag is closed, it will call this function
    deselectFacet(item) {
      // find and remove the item that is deselected
      let filter_index;
      for (let i = 0; i < this.filters_list.length; i++) {
        let index = this.filters_list[i].selectedItem.indexOf(item);
        if (index > -1) {
          filter_index = i;
          this.filters_list[i].selectedItem.splice(index, 1);
          // update the 'select all' checkbox
          if (this.filters_list[i].selectedItem.length === 0) {
            this.element_list[i] = [];
            this.filters_list[i].checkAll = true;
            this.filters_list[i].isIndeterminate = false;
          } else {
            this.filters_list[i].checkAll = false;
            this.filters_list[i].isIndeterminate = true;
          }
          break;
        }
      }

      if (filter_index) {
        // update the selectedItems list
        for (let i = 0; i < this.filters_list.length; i++) {
          this.selectedItems = this.selectedItems.concat(
            this.filters_list[i].selectedItem
          );
        }

        // after update the selectedItem, hangle the change to fetch data
        this.handleChange(this.filters_list[filter_index]);
      }
    },

    async generateFiltersDict(filter_list, finished) {
      let filter = {};
      if (!filter_list) {
        this.filters_dict = {};
      } else if (filter_list.selectedItem.length === 0) {
        this.element_list[filter_list.index] = [];
      } else {
        let elements_list = this.allFilterDict.elements[filter_list.index];
        let result_list = [];
        for (let key in elements_list) {
          if (filter_list.selectedItem.includes(key)) {
            result_list = result_list.concat(key);
          }
        }
        this.element_list[filter_list.index] = result_list;
        filter[filter_list.node_field] = result_list;
      }

      let empty = true;
      for (let i = 0; i < this.element_list.length; i++) {
        if (!this.element_list[i]) {
          this.element_list[i] = [];
        }
        if (this.element_list[i].length > 0) {
          empty = false;
          break;
        }
      }
      if (empty) {
        this.filters_dict = {};
      } else {
        if (JSON.stringify(filter) === "{}") {
          delete this.filters_dict[filter_list.node_field];
        } else {
          this.filters_dict = { ...this.filters_dict, ...filter };
        }
      }

      if (finished != false) {
        this.$emit("filter-dict", this.filters_dict, this.relation);
      }
    },

    // update the page, selected facets & relation in the url
    updateURL() {
      let query = {
        type: this.$route.query.type,
        page: 1,
        limit: this.$route.query.limit,
      };
      if (this.selectedItems.length > 0) {
        query.facets = this.selectedItems.toString();
        query.relation = this.relation ? "and" : "or";
      }
      if (this.$route.query.search) {
        query.search = this.$route.query.search;
      }
      this.$router.push({
        path: `${this.$route.path}`,
        query: query,
      });
    },

    handleSwitch(val) {
      this.updateURL();
      this.$emit("relation", val);
    },
  },
};
</script>

<style scoped lang="scss">
.filter-container {
  @media only screen and (min-width: $viewport-md) {
    width: 20rem;

    @media only screen and (min-width: $viewport-lg) {
      width: 25rem;
    }
  }

  min-width: 15rem;
  border: 1px solid #e4e7ed;
  margin-top: 1rem;
}

.relation-container {
  border-top: 0.5px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
}

::v-deep .el-switch {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

h4,
h5 {
  margin: 1rem;
}

hr {
  border: 0.5px solid #e4e7ed;
}

.checkbox-line {
  margin: 0.5rem 0 0.5rem 0;
}

.filter-selector {
  margin: 0;
  width: 100%;
}

.facet-card {
  height: 5rem;
  margin: 1rem;
  overflow-y: auto;

  .no-facets {
    font-style: italic;
    opacity: 0.5;
    font-size: 1rem;
  }

  .tags {
    color: $app-primary-color;
  }
}

::v-deep .el-card__body {
  padding: 0.5rem;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  &::after {
    transform: rotate(45deg) scale(1) !important;
    left: 0.3rem !important;
    top: 0.1rem !important;
  }
}

::v-deep .el-checkbox.is-checked {
  .el-checkbox__label {
    color: $darkRed !important;
  }
}

::v-deep .el-checkbox__inner {
  width: 1rem;
  height: 1rem;
}

::v-deep .el-collapse-item__header {
  font: normal normal 550 1rem/1rem Arimo;
}

::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  &::before {
    border-bottom: 0.01rem solid $app-primary-color;
    background-color: $app-primary-color;
    top: 0.375rem;
  }
}
</style>
