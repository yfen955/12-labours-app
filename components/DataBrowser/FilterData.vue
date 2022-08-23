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
        <span v-if="facet !== undefined">{{ facet }}</span>
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
            :key="type"
            :label="type"
            @change="handleChange()"
          >
            {{ type }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props:[ "dataDetails", "tissues_type" ],

  data: () => {
    return {
      filters_list: [],
      dataset_filters_list: [
        {
          index: 0,
          title: "Species",
          filter_items: ['Human', 'Cat', 'Rat', 'Mouse', 'Pig'],
          selectedItem: [],
        },
        {
          index: 1,
          title: "Organ",
          filter_items: ['Bladder', 'Colon', 'Heart', 'Stomach', 'Lungs', 'Lung (Left)', 'Whole body', 'Brainstem'],
          selectedItem: [],
        },
      ],
      tools_filters_list: [],
      labours_filters_list: [],
      selectedItems: [],
      filteredData: [],
    };
  },

  created: function() {
    if (this.$route.query.type === 'dataset') {
      this.filters_list = this.dataset_filters_list;
      this.selectedItems = [];
    }
    else if (this.$route.query.type === 'tools') {
      this.filters_list = this.tools_filters_list;
      this.selectedItems = [];
    }
    else if (this.$route.query.type === 'news') {
      this.filters_list.push({
        index: 0,
        title: "Tissues",
        filter_items: this.tissues_type,
        selectedItem: [],
      })
      this.selectedItems = [];
    }
    else if (this.$route.query.type === 'laboursInfo') {
      this.filters_list = this.labours_filters_list;
      this.selectedItems = [];
    }
  },

  methods: {
    async handleChange() {
      if (this.$route.query.type === 'dataset') {
        // combine all the items be selected
        this.selectedItems = this.filters_list[0].selectedItem.concat(this.filters_list[1].selectedItem)
        
        if (this.selectedItems.length > 0) {
          this.filteredData = this.dataDetails.filter((data, index) => {
            if (this.selectedItems.includes(data.Species) || this.selectedItems.includes(data.Organ)) {
              return data
            }
          })
        } else {
          // if no item is selected, return all the data
          this.filteredData = this.dataDetails
        }
      } else if (this.$route.query.type === 'news') {
        if (this.selectedTissues.length > 0) {
          // fetch the result data
          const listStr = '[' + this.selectedTissues.map((item, index) => {return `"${item}"`}) + ']';
          const newPayload = {
            node_type: "sample",
            condition:
              `(project_id: ["demo1-jenkins"], tissue_type: ${listStr})`,
            field:
              "id submitter_id biospecimen_anatomic_site composition sample_type tissue_type tumor_code",
          };
          await axios
            .post(`${process.env.query_api_url}graphql`, newPayload)
            .then((res) => {
              this.filteredData = res.data.data.sample;
            })
            .catch((err) => {
              console.log(err);
            });
        } else
          this.filteredData = this.dataDetails;
      }
      this.$emit('filter-data', this.filteredData)
    },

    // if a tag is closed, it will call this function
    deselectFacet(item) {
      if (this.$route.query.type === 'dataset') {
        for (let i = 0; i < this.filters_list.length; i++) {
          let index = this.filters_list[i].selectedItem.indexOf(item)
          if (index > -1) {
            this.filters_list[i].selectedItem.splice(index, 1)
          }
        }
        this.selectedItems = this.filters_list[0].selectedItem.concat(this.filters_list[1].selectedItem)
      }
      else if (this.$route.query.type === 'news') {
        this.selectedTissues = this.selectedTissues.filter(data => item !== data);
      }

      // after update the selectedItem, hangle the change so that the data will changes
      this.handleChange();
    },
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