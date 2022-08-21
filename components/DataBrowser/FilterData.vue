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
        {{ facet }}
      </el-tag>
    </el-card>
    <el-collapse>
      <el-collapse-item title="Species" v-model="species">
        <el-checkbox-group v-model="selectedSpecies">
          <el-checkbox
            class="filter-selecter"
            v-for="type in species"
            :key="type"
            :label="type"
            @change="handleChange()"
          >
            {{ type }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item title="Organ" v-model="organs">
        <el-checkbox-group v-model="selectedOrgans">
          <el-checkbox
            class="filter-selecter"
            v-for="type in organs"
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
const species = ['Human', 'Cat', 'Rat', 'Mouse', 'Pig'];
const organs = ['Bladder', 'Colon', 'Heart', 'Stomach', 'Lungs', 'Lung (Left)', 'Whole body', 'Brainstem'];

export default {
  props:[ "dataDetails" ],

  data: () => {
    return {
      species,
      organs,
      selectedSpecies: [],
      selectedOrgans: [],
      selectedItems: [],
      filteredData: [],
    };
  },

  methods: {
    handleChange() {
      this.selectedItems = this.selectedSpecies.concat(this.selectedOrgans)
      if (this.selectedSpecies.length > 0 && this.selectedOrgans.length > 0) {
        this.filteredData = this.dataDetails.filter((data, index) => {
          let existSpecies = this.selectedSpecies.findIndex(item => item === data.Species)
          let existOrgan = this.selectedOrgans.findIndex(item => item === data.Organ)
          if (existSpecies !== -1 && existOrgan !== -1)
            return data
        })
      } else if (this.selectedSpecies.length === 0 && this.selectedOrgans.length > 0) {
        this.filteredData = this.dataDetails.filter((data, index) => {
          let existOrgan = this.selectedOrgans.findIndex(item => item === data.Organ)
          if (existOrgan !== -1)
            return data
        })
      } else if (this.selectedSpecies.length > 0 && this.selectedOrgans.length === 0) {
        this.filteredData = this.dataDetails.filter((data, index) => {
          let existSpecies = this.selectedSpecies.findIndex(item => item === data.Species)
          if (existSpecies !== -1)
            return data
        })
      } else
        this.filteredData = this.dataDetails
      this.$emit('filter-data', this.filteredData)
    },

    deselectFacet(item) {
      this.selectedSpecies = this.selectedSpecies.filter(data => item !== data)
      this.selectedOrgans = this.selectedOrgans.filter(data => item !== data)
      this.selectedItems = this.selectedSpecies.concat(this.selectedOrgans)
      this.handleChange()
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