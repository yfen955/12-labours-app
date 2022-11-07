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
        v-model="filter.filter_items"
      >
        <el-checkbox-group v-model="filter.selectedItem">
          <el-checkbox
            class="filter-selecter"
            v-for="(type, index) in filter.filter_items"
            v-show="type !== 'NA'"
            :key="index"
            :label="type"
            @change="handleChange()"
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
      filters_list: [],
      dataset_filters_list: [],
      tools_filters_list: [],
      labours_filters_list: [],
      selectedItems: [],
      filteredData: [],
      filters_dict: {},
      newTotalCount: 0,
      filters_dict_list: [],
      isLoading: false,
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
    }
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
          });
          count += 1;
          this.filters_dict_list.push(this.allFilterDict[key]);
        }
      }
      else if (val === 'tools') {
        
      }
      else if (val === 'news') {
        
      }
      else if (val === 'laboursInfo') {
        
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
        this.$router.replace({
          path: '/data/browser',
          query: {
            type: this.$route.query.type,
            page: 1,
            limit: this.$route.query.limit,
          }
        });
      }
      else if (this.$route.query.type === 'tools') {
        
      }
      else if (this.$route.query.type === 'news') {

      }
      else if (this.$route.query.type === 'laboursInfo') {

      }

      this.$emit('filter-data', this.filteredData, this.newTotalCount);
      this.isLoading = false;
    },

    // if a tag is closed, it will call this function
    deselectFacet(item) {
      // find and remove the item that is deselected
      for (let i = 0; i < this.filters_list.length; i++) {
        let index = this.filters_list[i].selectedItem.indexOf(item)
        if (index > -1) {
          this.filters_list[i].selectedItem.splice(index, 1)
        }
      }

      // update the selectedItems list
      for (let i = 0; i < this.filters_list.length; i++) {
        this.selectedItems = this.selectedItems.concat(this.filters_list[i].selectedItem)
      }

      // after update the selectedItem, hangle the change so that the data will changes
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
    margin: 1rem;
  };
  h5 {
    line-height: 1rem;
    font-weight: 600;
    font-size: 1rem;
    margin: 1rem;
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
  margin: 1rem;
  overflow-y: auto;
  .no-facets {
    font-style: italic;
    opacity: 0.5;
  }
  .tags {
    color: $app-primary-color;
  }
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  &::after {
    transform: rotate(45deg) scale(1) !important;
    left: 0.3em !important;
    top: 0.1em !important;
  }
}
::v-deep .el-checkbox__inner {
  width: 1em;
  height: 1em;
}
</style>