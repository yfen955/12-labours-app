<template>
  <div>
    <div class="filter-container">
      <h4>Refine results</h4>
      <hr />
      <h5>Filters applied</h5>

      <el-card shadow="never" class="facet-card">
        <span v-if="selectedFacetList.length === 0" class="no-facets">
          No filters applied
        </span>
        <el-tag
          v-for="facet in selectedFacetList"
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
            @change="handleRelation"
          >
          </el-switch>
          <p>AND</p>
        </div>
      </div>

      <el-collapse>
        <el-collapse-item
          v-for="(filter, index) in convertedFilterList"
          :key="index"
          :title="filter.title"
        >
          <el-checkbox
            :indeterminate="filter.isIndeterminate"
            class="filter-selector"
            v-model="filter.checkAll"
            @change="handleCheckAll(filter, index)"
          >
            Select all
          </el-checkbox>
          <hr class="checkbox-line" />
          <el-checkbox-group
            v-model="filter.selectedFacet"
            @change="handleCheckBox(filter, index)"
          >
            <el-checkbox
              class="filter-selector"
              v-for="(type, index) in filter.filterFacetName"
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
import backendQuery from "@/services/backendQuery";

export default {
  data: () => {
    return {
      allFilterDict: {},
      convertedFilterList: [],
      selectedFacetList: [],
      selectedFilterDict: {},
      filterDictResult: {},
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
        this.convertFacets();
      },
    },
    "$route.query.facets": {
      handler(new_val, old_val) {
        if (new_val && old_val) {
          if (new_val.length < old_val.length) {
            old_val.split(",").forEach((item) => {
              if (new_val.indexOf(item) === -1) {
                this.deselectFacet(item);
              }
            });
          } else if (new_val.length > old_val.length) {
            this.convertFacets();
          }
        } else if (old_val && !new_val) {
          this.deselectFacet(old_val);
        } else if (!old_val && new_val) {
          this.convertFacets();
        }
      },
    },
    "$route.query.relation": {
      handler(val) {
        this.handleRelation(val);
      },
    },
  },

  methods: {
    async fetchFilter() {
      this.allFilterDict = await backendQuery.fetchFilterData(
        this.$config.query_api_url,
        false
      );
    },

    dataChange(val) {
      if (this.$route.query.relation) {
        this.relation = this.$route.query.relation === "and" ? true : false;
      } else {
        this.relation = true;
      }
      if (val === "dataset") {
        this.fetchFilter();
      }
    },

    convertFacets() {
      this.convertedFilterList = [];
      this.selectedFilterDict = {};
      for (let i = 0; i < this.allFilterDict.size; i++) {
        const nodeField = this.allFilterDict["nodes>fields"][i];
        this.convertedFilterList.push({
          index: i,
          nodeField: nodeField,
          title: this.allFilterDict.titles[i],
          filterFacetName: this.allFilterDict.elements[i],
          selectedFacet: [],
          checkAll: true,
          isIndeterminate: false,
        });
        this.selectedFilterDict[nodeField] = [];
      }
      this.handleURLFacet();
    },

    handleURLFacet() {
      if (this.$route.query.facets) {
        let isExist = false;
        this.selectedFacetList = this.$route.query.facets.split(",");
        for (let i = 0; i < this.selectedFacetList.length; i++) {
          const facet = this.selectedFacetList[i];
          for (let j = 0; j < this.convertedFilterList.length; j++) {
            const filter = this.convertedFilterList[j];
            // check whether facet in URL is valid
            const index = filter.filterFacetName.indexOf(facet);
            if (index > -1) {
              // Add facets from URL
              filter.selectedFacet.push(filter.filterFacetName[index]);
              this.selectedFilterDict[filter.nodeField] = filter.selectedFacet;

              const selectedFacetLength = filter.selectedFacet.length;
              const filterFacetNameLength = filter.filterFacetName.length;
              if (selectedFacetLength === filterFacetNameLength) {
                filter.selectedFacet = [];
                filter.checkAll = true;
                filter.isIndeterminate = false;
              } else {
                filter.checkAll = false;
                filter.isIndeterminate = true;
              }
              isExist = true;
            }
          }
          if (!isExist) {
            this.selectedFacetList = [];
            break;
          }
        }
      }
      this.handleChange();
    },

    handleChange(filter = undefined) {
      if (filter) {
        this.selectedFacetList = [];
        for (let i = 0; i < this.convertedFilterList.length; i++) {
          this.selectedFacetList = this.selectedFacetList.concat(
            this.convertedFilterList[i].selectedFacet
          );
        }

        if (filter.selectedFacet.length === 0) {
          this.selectedFilterDict[filter.nodeField] = [];
        } else {
          this.selectedFilterDict[filter.nodeField] = filter.selectedFacet;
        }
      }
      this.generateFiltersDict(filter);
    },

    handleCheckAll(filter, index) {
      const isCheckAll =
        this.convertedFilterList[index].selectedFacet.length === 0
          ? false
          : true;
      this.convertedFilterList[index].selectedFacet = [];
      this.convertedFilterList[index].checkAll = true;
      this.convertedFilterList[index].isIndeterminate = false;
      if (isCheckAll) {
        this.handleChange(filter);
      }
    },

    // update the checkAll state when the selected facets are changed
    handleCheckBox(filter, index) {
      const checkedCount = filter.selectedFacet.length;
      const allFacetsLength = filter.filterFacetName.length;
      if (checkedCount === allFacetsLength || checkedCount === 0) {
        this.selectedFilterDict[filter.nodeField] = [];
        this.convertedFilterList[index].selectedFacet = [];
        this.convertedFilterList[index].checkAll = true;
        this.convertedFilterList[index].isIndeterminate = false;
      } else {
        this.convertedFilterList[index].checkAll = false;
        this.convertedFilterList[index].isIndeterminate = true;
      }
      this.handleChange(filter);
    },

    // if a tag is closed, it will call this function
    deselectFacet(facet) {
      // find and remove the facet that is deselected
      for (let i = 0; i < this.convertedFilterList.length; i++) {
        let index = this.convertedFilterList[i].selectedFacet.indexOf(facet);
        if (index > -1) {
          // remove from selectedFacet
          this.convertedFilterList[i].selectedFacet.splice(index, 1);
          // update the 'select all' checkbox when no facet selected
          if (this.convertedFilterList[i].selectedFacet.length === 0) {
            const nodeField = this.convertedFilterList[i].nodeField;
            this.selectedFilterDict[nodeField] = [];
            this.convertedFilterList[i].checkAll = true;
            this.convertedFilterList[i].isIndeterminate = false;
          } else {
            this.convertedFilterList[i].checkAll = false;
            this.convertedFilterList[i].isIndeterminate = true;
          }
          this.handleChange(this.convertedFilterList[i]);
          break;
        }
      }
    },

    handleRelation(val) {
      if (typeof val === "boolean") {
        this.relation = val;
      } else if (val === "and") {
        this.relation = true;
      } else if (val === "or") {
        this.relation = false;
      }
      this.handleChange();
    },

    generateFiltersDict(selectedFilter = undefined) {
      if (!selectedFilter) {
        if (this.selectedFacetList.length === 0) {
          this.filterDictResult = {};
        } else {
          for (const key in this.selectedFilterDict) {
            const value = this.selectedFilterDict[key];
            if (value.length > 0) {
              this.filterDictResult[key] = this.selectedFilterDict[key];
            }
          }
        }
      } else {
        const nodeField = selectedFilter.nodeField;
        if (
          this.selectedFilterDict[nodeField].length === 0 &&
          nodeField in this.filterDictResult
        ) {
          delete this.filterDictResult[nodeField];
        }
        if (this.selectedFilterDict[nodeField].length > 0) {
          this.filterDictResult[nodeField] = selectedFilter.selectedFacet;
        }
      }
      this.$emit("facet", this.selectedFacetList);
      this.$emit("filter", this.filterDictResult);
      this.$emit("relation", this.relation);
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
