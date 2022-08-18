<template>
  <div class="white-background">
    <h4>Refine results</h4>
    <hr />
    <h5>Filters applied</h5>
    <el-card shadow="never" class="facet-card">
      <span v-if="selectedTissues.length === 0" class="no-facets">
        No filters applied
      </span>
      <el-tag
        v-for="facet in selectedTissues"
        :key="facet"
        class="tags"
        disable-transitions
        closable
        @close="deselectFacet(facet)"
      >
        <span v-if="facet !== undefined">{{ facet }}</span>
        <span v-else>Others</span>
      </el-tag>
    </el-card>
    <el-collapse>
      <el-collapse-item title="Tissue" v-model="tissues_type">
        <el-checkbox-group v-model="selectedTissues">
          <el-checkbox
            class="filter-selecter"
            v-for="type in tissues_type"
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
import axios from "axios";

export default {
  props:[ "tissues_type", "dataDetails" ],

  data: () => {
    return {
      selectedTissues: [],
      filteredData: [],
    };
  },

  methods: {
    async handleChange() {
      if (this.selectedTissues.length > 0) {
        const listStr = '[' + this.selectedTissues.map((item, index) => {return `"${item}"`}) + ']';
        const newPayload = {
          node_type: "sample",
          condition:
            `(project_id: ["demo1-jenkins"], tissue_type: ${listStr})`,
          field:
            "id submitter_id biospecimen_anatomic_site composition sample_type tissue_type tumor_code",
        };
        await axios
          .post(`${process.env.api_url}graphql`, newPayload)
          .then((res) => {
            this.filteredData = res.data.data.sample;
          })
          .catch((err) => {
            console.log(err);
          });
      } else
        this.filteredData = this.dataDetails;
      this.$emit('filter-data', this.filteredData);
    },

    deselectFacet(item) {
      this.selectedTissues = this.selectedTissues.filter(data => item !== data);
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