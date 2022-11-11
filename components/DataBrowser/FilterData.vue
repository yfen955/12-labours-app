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
        <span v-if="facet !== 'NA'">{{ facet[0].toUpperCase() + facet.slice(1) }}</span>
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
import backendQuery from '@/services/backendQuery';

export default {
  props:[ "searchContent", "file_type", "allFilterDict" ],

  data: () => {
    return {
      isLoading: false,
      filters_list: [],
      selectedItems: [],
      filteredData: [],
      filters_dict: {},
      newTotalCount: 0,
      filters_dict_list: [],
      filters_selected_ids: {},
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
      if (val === 'dataset') {
        let count = 0;
        for (let key in this.allFilterDict) {
          this.filters_list.push({
            index: count,
            fieldName: "submitter_id",
            title: key,
            filter_items: Object.keys(this.allFilterDict[key]),
            selectedItem: [],
            checkAll: true,
            isIndeterminate: false,
          });
          count += 1;
          this.filters_dict_list.push(this.allFilterDict[key]);
          this.filters_selected_ids[key] = [];
        }
      }

      this.selectedItems = [];
      this.generateFiltersDict(this.filters_list);

    },

    async handleChange() {
      this.isLoading = true;
      this.generateFiltersDict(this.filters_list);

      // combine all the items that be selected
      this.selectedItems = [];
      for (let i = 0; i < this.filters_list.length; i++) {
        this.selectedItems = this.selectedItems.concat(this.filters_list[i].selectedItem);
      }

      if (this.$route.query.type === 'dataset') {
        let result = await backendQuery.fetchGraphqlData('experiment', this.filters_dict, this.searchContent, this.$route.query.limit, 1);
        this.filteredData = result[0];
        this.newTotalCount = result[1];
      }

      this.$emit('filter-data', this.filteredData, this.newTotalCount);
      this.isLoading = false;
    },

    handleCheckAllChange(val, i) {
      let refresh = this.filters_list[i].selectedItem.length === 0 ? false : true;
      if (val) {
        this.filters_list[i].selectedItem = [];
      } else {
        this.filters_list[i].checkAll = true;
      }
      this.filters_list[i].isIndeterminate = false;
      // don't fetch data when already has selected all
      if (refresh)
        this.handleChange();
    },

    // update the checkAll state when the selected facets are changed
    updateCheckAll(filter, i) {
      let checkedCount = filter.selectedItem.length;
      let allFacetsLength = filter.filter_items.length;
      if (checkedCount === allFacetsLength || checkedCount === 0) {
        this.filters_list[i].checkAll = true;
        this.filters_list[i].isIndeterminate = false;
        this.filters_list[i].selectedItem = [];
      } else {
        this.filters_list[i].checkAll = false;
        this.filters_list[i].isIndeterminate = true;
      }
      this.handleChange();
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
            this.filters_list[i].checkAll = true;
            this.filters_list[i].isIndeterminate = false;
          }
          else {
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

    generateFiltersDict(currentList) {
      this.filters_dict = {};
      currentList.forEach((data, index) => {
        if (data.selectedItem.length !== 0) {
          let id_list = [];
          data.selectedItem.forEach((item, i) => {
            let id_dict = this.filters_dict_list[index];
            id_list = id_list.concat(id_dict[item]);
            return id_list;
          })
          this.filters_dict[data.title] = id_list;
        }
      })
      
      this.$emit('filter-dict', this.filters_dict);
    }
  },
}
</script>

<style scoped lang="scss">
.white-background {
  background-color: white;
  border: 1px solid #E4E7ED; // lineColor2
  h4 {
    line-height: 1rem;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0.5em;
  };
  h5 {
    line-height: 1rem;
    font-weight: 600;
    font-size: 1rem;
    margin: 0.9em;
  };
  hr {
    border: none;
    border-bottom: 1px solid #E4E7ED;
  }
}
.filter-selecter{
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