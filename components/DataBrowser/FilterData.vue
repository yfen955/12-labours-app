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
          <span>{{ facet[0].toUpperCase() + facet.slice(1) }}</span>
        </el-tag>
      </el-card>
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
              {{ type[0].toUpperCase() + type.slice(1) }}
            </el-checkbox>
          </el-checkbox-group>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: [ "searched_ids", "file_type", "allFilterDict" ],

  data: () => {
    return {
      isLoading: false,
      filters_list: [],
      selectedItems: [],
      filteredData: [],
      filters_dict: {},
      newTotalCount: 0,
      filter_id_list: [],
      facets_id_list: [],
    };
  },

  created: function() {
    this.dataChange(this.$route.query.type);
  },

  watch: {
    '$route.query.type': {
      handler() {
        this.dataChange(this.$route.query.type);
      }
    },
    'allFilterDict': {
      handler() {
        this.dataChange(this.$route.query.type);
      }
    },
    'isLoading': {
      handler() {
        this.$emit('isLoading', this.isLoading);
      }
    },
  },

  methods: {
    async dataChange(val) {
      this.filters_list = [];
      this.filter_id_list = [];
      
      if (val === 'dataset') {
        for (let i = 0; i < this.allFilterDict.size; i++) {
          this.filters_list.push({
            index: i,
            node: this.allFilterDict.nodes[i],
            fieldName: this.allFilterDict.fields[i],
            title: this.allFilterDict.titles[i],
            filter_items: Object.keys(this.allFilterDict.elements[i]),
            selectedItem: [],
            checkAll: true,
            isIndeterminate: false,
          });
          this.filter_id_list.push([]);
        }
        if (this.allFilterDict.ids) {
          this.facets_id_list = this.allFilterDict.ids;
          this.$store.dispatch('setFacets', this.facets_id_list);

          if (this.$route.query.facets) {
            this.selectedItems = this.$route.query.facets.split(',');
            let finished = false;
            for (let i = 0; i < this.selectedItems.length; i++) {
              let facet = this.selectedItems[i];
              this.filters_list.map((val) => {
                let index = val.filter_items.indexOf(facet);
                if (index > -1) {
                  val.selectedItem.push(val.filter_items[index]);
                  if (i === this.selectedItems.length - 1)
                    finished = true;
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
              })
            }
          } else {
            this.selectedItems = [];
            this.generateFiltersDict();
          }
        }
      }
    },

    async handleChange(filter, finished) {
      this.isLoading = true;

      if (this.selectedItems.length === 0) {
        this.filter_id_list = [];
      }

      // combine all the items that be selected
      this.selectedItems = [];
      for (let i = 0; i < this.filters_list.length; i++) {
        this.selectedItems = this.selectedItems.concat(this.filters_list[i].selectedItem);
      }

      if (!filter)
        await this.generateFiltersDict();
      else
        await this.generateFiltersDict(filter, finished);

      // update the page and selected facets in the url
      let query = {
        type: this.$route.query.type,
        page: 1,
        limit: this.$route.query.limit,
      };
      if (this.selectedItems.length > 0) {
        query.facets = this.selectedItems.toString();
      }
      if (this.$route.query.search)
        query.search = this.$route.query.search;
      this.$router.push({
        path: `${this.$route.path}`,
        query: query
      })

      this.isLoading = false;
    },

    handleCheckAllChange(filter, i) {
      let refresh = this.filters_list[i].selectedItem.length === 0 ? false : true;
      if (filter.checkAll) {
        this.filters_list[i].selectedItem = [];
      } else {
        this.filters_list[i].checkAll = true;
      }
      this.filters_list[i].isIndeterminate = false;
      // don't fetch data when already has selected all
      if (refresh)
        this.handleChange(filter);
    },

    // update the checkAll state when the selected facets are changed
    updateCheckAll(filter, i) {
      let checkedCount = filter.selectedItem.length;
      let allFacetsLength = filter.filter_items.length;
      if (checkedCount === allFacetsLength || checkedCount === 0) {
        this.filter_id_list[i] = [];
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
      for (let i = 0; i < this.filters_list.length; i++) {
        let index = this.filters_list[i].selectedItem.indexOf(item);
        if (index > -1) {
          this.filters_list[i].selectedItem.splice(index, 1);
          // update the 'select all' checkbox
          if (this.filters_list[i].selectedItem.length === 0) {
            this.filter_id_list[i] = [];
            this.filters_list[i].checkAll = true;
            this.filters_list[i].isIndeterminate = false;
          } else {
            this.filters_list[i].checkAll = false;
            this.filters_list[i].isIndeterminate = true;
          }
        }
      }

      // update the selectedItems list
      for (let i = 0; i < this.filters_list.length; i++) {
        this.selectedItems = this.selectedItems.concat(this.filters_list[i].selectedItem);
      }

      // after update the selectedItem, hangle the change to fetch data
      this.handleChange();
    },

    async generateFiltersDict(filter_list, finished) {
      if (!filter_list) {
        this.filters_dict = {};
      } else if (filter_list.selectedItem.length === 0) {
        this.filter_id_list[filter_list.index] = [];
      } else {
        let elements_list = this.allFilterDict.elements[filter_list.index];
        let result_list = [];
        for (let key in elements_list) {
          if (filter_list.selectedItem.includes(key)) {
            result_list = result_list.concat(elements_list[key]);
          }
        }
        let filter = {};
        filter[filter_list.fieldName] = result_list;
        let payload = {
          node: filter_list.node,
          filter: filter
        }
        
        const path = `${process.env.query_api_url}/filter/argument`;
        await axios
          .post(path, payload)
          .then((res) => {
            this.filter_id_list[filter_list.index] = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const mergedList = [].concat.apply([], this.filter_id_list.filter((ele) => ele));
      if (mergedList.length === 0) {
        this.filters_dict = {};
      } else {
        this.filters_dict["submitter_id"] = mergedList;
      }

      if (finished != false)
        this.$emit('filter-dict', this.filters_dict);
    },
  },
}
</script>

<style scoped lang="scss">
.filter-container {
  @media only screen and (min-width: $viewport-md) {
    width: 20rem;
    @media only screen and (min-width: $viewport-lg) {
      width: 25rem
    }
  }
  min-width: 15rem;
  border: 1px solid #E4E7ED;
  margin-top: 1rem;
}
h4, h5 {
  margin: 1rem;
};
hr {
  border: 0.5px solid #E4E7ED;
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