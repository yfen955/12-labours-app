<template>
  <div class="white-background">
    <h4>Refine results</h4>
    <hr />
    <h5>Filters applied</h5>
    <el-card shadow="never" class="facet-card">
      <span v-if="selectedItems.length === 0" class="no-facets">
        No filters applied
      </span>
      <el-tag
        v-for="(facet, index) in selectedItems"
        :key="index"
        class="tags"
        disable-transitions
        closable
        @close="deselectFacet(facet)"
      >
        <span v-if="facet !== 'NA'">{{
          facet[0].toUpperCase() + facet.slice(1)
        }}</span>
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
          class="selectAll"
          v-model="filter.checkAll"
          @change="handleCheckAllChange(filter.checkAll, index)"
        >
          Select all
        </el-checkbox>
        <hr class="checkbox-line" />
        <el-checkbox-group
          v-model="filter.selectedItem"
          @change="updateCheckAll(filter, index)"
        >
          <el-checkbox
            class="filter-selecter"
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
</template>

<script>
import backendQuery from "@/services/backendQuery";
import axios from "axios";

export default {
  props: ["searchContent", "file_type", "allFilterDict"],

  data: () => {
    return {
      isLoading: false,
      filters_list: [],
      selectedItems: [],
      filteredData: [],
      filters_dict: {},
      newTotalCount: 0,
      filter_id_list: [],
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
    isLoading: {
      handler() {
        this.$emit("isLoading", this.isLoading);
      },
    },
  },

  methods: {
    async dataChange(val) {
      this.filters_list = [];
      this.filter_id_list = [];
      this.selectedItems = [];
      if (val === "dataset") {
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
      }
      await this.generateFiltersDict();
    },

    async handleChange(filter) {
      this.isLoading = true;

      if (this.selectedItems.length === 0) {
        this.filter_id_list = [];
      }

      // combine all the items that be selected
      this.selectedItems = [];
      for (let i = 0; i < this.filters_list.length; i++) {
        this.selectedItems = this.selectedItems.concat(
          this.filters_list[i].selectedItem
        );
      }

      if (!filter) {
        await this.generateFiltersDict();
      } else {
        await this.generateFiltersDict(filter);
      }

      // update the url to page 1
      this.$router.push({
        path: `${this.$route.path}`,
        query: {
          type: this.$route.query.type,
          page: 1,
          limit: this.$route.query.limit,
        },
      });

      if (this.$route.query.type === "dataset") {
        let result = await backendQuery.fetchGraphqlData(
          "experiment",
          this.filters_dict,
          this.searchContent,
          this.$route.query.limit,
          1
        );
        this.filteredData = result[0];
        this.newTotalCount = result[1];
      }

      this.$emit("filter-data", this.filteredData, this.newTotalCount);
      this.isLoading = false;
    },

    handleCheckAllChange(val, i) {
      let refresh =
        this.filters_list[i].selectedItem.length === 0 ? false : true;
      if (val) {
        this.filters_list[i].selectedItem = [];
      } else {
        this.filters_list[i].checkAll = true;
      }
      this.filters_list[i].isIndeterminate = false;
      // don't fetch data when already has selected all
      if (refresh) this.handleChange(this.filters_list[i]);
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

      // after update the selectedItem, handle the change to fetch data
      this.handleChange();
    },

    async generateFiltersDict(filter_obj) {
      if (!filter_obj) {
        this.filters_dict = {};
      } else if (filter_obj.selectedItem.length === 0) {
        this.filter_id_list[filter_obj.index] = [];
      } else {
        const elements_list = this.allFilterDict.elements[filter_obj.index];
        let result_list = [];
        for (let key in elements_list) {
          if (filter_obj.selectedItem.includes(key)) {
            result_list = result_list.concat(elements_list[key]);
          }
        }
        let filter = {};
        filter[filter_obj.fieldName] = result_list;
        let payload = {
          node: filter_obj.node,
          filter: filter,
        };
        const path = `${process.env.query_api_url}/filter/argument`;
        await axios
          .post(path, payload)
          .then((res) => {
            this.filter_id_list[filter_obj.index] = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const mergedList = [].concat.apply(
        [],
        this.filter_id_list.filter((ele) => ele)
      );
      if (mergedList.length === 0) {
        this.filters_dict = {};
      } else {
        this.filters_dict["submitter_id"] = mergedList;
      }

      this.$emit("filter-dict", this.filters_dict);
    },
  },
};
</script>

<style scoped lang="scss">
.white-background {
  background-color: white;
  border: 1px solid #e4e7ed; // lineColor2
  h4 {
    line-height: 1rem;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0.5em;
  }
  h5 {
    line-height: 1rem;
    font-weight: 600;
    font-size: 1rem;
    margin: 0.9em;
  }
  hr {
    border: none;
    border-bottom: 1px solid #e4e7ed;
  }
}
.filter-selecter {
  margin: 0;
  width: 100%;
}
.facet-card {
  height: 5em;
  margin: 0.8em;
  overflow-y: auto;
  .no-facets {
    font-style: italic;
    opacity: 0.5;
  }
  .tags {
    color: $app-primary-color;
  }
}
::v-deep .el-card__body {
  padding: 0.5em;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  &::after {
    transform: rotate(45deg) scale(1) !important;
    left: 0.3em !important;
    top: 0.1em !important;
  }
}
::v-deep .el-checkbox.is-checked {
  .el-checkbox__label {
    color: $darkRed !important;
  }
}
::v-deep .el-checkbox__inner {
  width: 1em;
  height: 1em;
}
::v-deep .el-collapse-item__header {
  font: normal normal 550 1rem/1rem Arimo;
}
.selectAll {
  margin: 0;
}
::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  &::before {
    border: 0.2px solid $app-primary-color !important;
    background-color: $app-primary-color;
    top: 5px;
  }
}
.checkbox-line {
  margin-top: 0.5em;
  margin-bottom: 0;
  border: 0.5px solid #cecece !important;
}
</style>
