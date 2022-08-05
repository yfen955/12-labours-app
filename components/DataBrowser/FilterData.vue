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
        class="capitalize"
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
  data() {
    return {
      species,
      organs,
      selectedSpecies: [],
      selectedOrgans: [],
      selectedItems: [],
    };
  },

  methods: {
    handleChange() {
      this.selectedItems = this.selectedSpecies.concat(this.selectedOrgans)
      this.$emit('filter-list', this.selectedSpecies, this.selectedOrgans)
    },

    deselectFacet(item) {
      this.selectedSpecies = this.selectedSpecies.filter(data => item !== data)
      this.selectedOrgans = this.selectedOrgans.filter(data => item !== data)
      this.selectedItems = this.selectedSpecies.concat(this.selectedOrgans)
      this.$emit('filter-list', this.selectedSpecies, this.selectedOrgans)
    },
  },
}
</script>

<style scoped lang="scss">

.white-background {
  background-color: white;
  border: 1px solid #E4E7ED; // lineColor2
//   border-bottom: none;
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
  width: 8em;
  margin: 0;
}
.facet-card {
  margin: 1rem;
  overflow-y: auto;
  .no-facets {
    font-style: italic;
    opacity: 0.5;
  }
  .capitalize {
    text-transform: capitalize;
  }
}
</style>