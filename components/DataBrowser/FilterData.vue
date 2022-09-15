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
        v-for="facet in selectedItems"
        :key="facet"
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
        v-for="filter in filters_list"
        :key="filter.index"
        :title="filter.title"
        v-model="filter.filter_items"
      >
        <el-checkbox-group v-model="filter.selectedItem">
          <el-checkbox
            class="filter-selecter"
            v-for="type in filter.filter_items"
            v-show="type !== 'NA'"
            :key="type"
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
import axios from "axios";

export default {
  props:[ "dataDetails", "searchContent", "file_type", "mime_type_list", "mime_dict" ],

  data: () => {
    return {
      filters_list: [],
      dataset_filters_list: [],
      tools_filters_list: [
        {
          index: 0,
          fieldName: "species",
          title: "Species",
          filter_items: ['Human', 'Cat', 'Rat', 'Mouse', 'Pig'],
          selectedItem: [],
        },
        {
          index: 1,
          fieldName: "organ",
          title: "Organ",
          filter_items: ['Bladder', 'Colon', 'Heart', 'Stomach', 'Lungs', 'Lung (Left)', 'Whole body', 'Brainstem'],
          selectedItem: [],
        },
      ],
      labours_filters_list: [],
      selectedItems: [],
      filteredData: [],
      filters_dict: {},
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

    selectedItems(after, before) {
      // this.$router.push({
      //   path:'/data/browser',
      //   query: {
      //     type: 'dataset',
      //     filter: this.selectedItems,
      //   }
      // })
      // this.$router.query.filter.replace( this.selectedItems )
      if (after.length === 0) {
        this.$emit('filter-changed', true);
      }
    },
  },

  methods: {
    async dataChange(val) {
      if (val === 'dataset') {
        this.filters_list.push({
          index: 1,
          fieldName: "submitter_id",
          title: "Data types",
          filter_items: this.mime_type_list,
          selectedItem: [],
        })
      }
      else if (val === 'tools') {
        this.filters_list = this.tools_filters_list;
      }
      else if (val === 'news') {
        this.filters_list.push({
          index: 0,
          title: "File types",
          filter_items: this.file_type,
          selectedItem: [],
        })
      }
      else if (val === 'laboursInfo') {
        this.filters_list = this.labours_filters_list;
      }
      this.selectedItems = [];

      this.generateFiltersDict(this.filters_list);
    },

    async handleChange(originalData) {
      this.generateFiltersDict(this.filters_list);

      let currentData = this.dataDetails;
      if (originalData !== undefined) {
        currentData = originalData;
      }

      if (this.$route.query.type === 'dataset') {
        this.selectedItems = this.filters_list[0].selectedItem;
        
        let newPayload = {
          node: 'experiment',
          filter: this.filters_dict,
          search: this.searchContent,
          limit: 10,
          page: 1,
        };
        const path = `${process.env.query_api_url}graphql`;
        await axios
          .post(path, newPayload)
          .then((res) => {
            this.filteredData = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else if (this.$route.query.type === 'tools') {
        // combine all the items be selected
        this.selectedItems = this.filters_list[0].selectedItem.concat(this.filters_list[1].selectedItem);
        
        if (this.selectedItems.length > 0) {
          this.filteredData = currentData.filter((data, index) => {
            if (this.selectedItems.includes(data.Species) || this.selectedItems.includes(data.Organ)) {
              return data
            }
          })
        } else {
          // if no item is selected, return all the data
          this.filteredData = currentData
        }
      }
      else if (this.$route.query.type === 'news') {

      }

      this.$emit('filter-data', this.filteredData);
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
      currentList.map((data, index) => {
        if (data.selectedItem.length === 0) {
          if (data.title === "Data types") {
            let id_list = [];
            data.filter_items.map((item, i) => {
              id_list = [...id_list,...this.mime_dict[item]];
              return id_list;
            })
            this.filters_dict[data.fieldName] = Array.from(new Set(id_list));
          } else
            this.filters_dict[data.fieldName] = data.filter_items;
        } else {
          if (data.title === "Data types") {
            let id_list = [];
            data.selectedItem.map((item, i) => {
              id_list = [...id_list,...this.mime_dict[item]];
              return id_list;
            })
            this.filters_dict[data.fieldName] = Array.from(new Set(id_list));
          } else
            this.filters_dict[data.fieldName] = data.selectedItem;
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
</style>