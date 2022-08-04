<template>
  <div class="white-background">
    <h4>Refine results</h4>
    <hr />
    <h5>Filter</h5>
    <el-form ref="form" :model="form">
      <el-collapse>
        <el-collapse-item title="Species" v-model="selectedSpecies">
          <el-checkbox
            class="filter-selecter"
            v-for="type in species"
            :key="type"
            @change="handleSpecies(type)"
          >
            {{ type }}
          </el-checkbox>
        </el-collapse-item>
        <el-collapse-item title="Organ" v-model="selectedOrgans">
          <el-checkbox
            class="filter-selecter"
            v-for="type in organs"
            :key="type"
            @change="handleOrgans(type)"
          >
            {{ type }}
          </el-checkbox>
        </el-collapse-item>
      </el-collapse>
    </el-form>
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
      form: {
        species: [],
        organs: [],
      }
    };
  },

  methods: {
    handleSpecies(val) {
      let exist = this.selectedSpecies.findIndex(item => item === val)
      if (exist == -1)
        this.selectedSpecies.push(val);
      else {
        this.selectedSpecies = this.selectedSpecies.filter((value, index) => {
          return value !== val
        })
      }
      this.$emit('filter-list', this.selectedSpecies, this.selectedOrgans)
    },

    handleOrgans(val) {
      let exist = this.selectedOrgans.findIndex(item => item === val)
      if (exist == -1)
        this.selectedOrgans.push(val);
      else {
        this.selectedOrgans = this.selectedOrgans.filter((value, index) => {
          return value !== val
        })
      }
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
</style>