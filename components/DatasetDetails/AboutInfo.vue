<template>
  <div
    v-loading="isLoading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
  >
    <h2>About this dataset</h2>
    <p><b>Title:</b> {{ title }}</p>
    <p>
      <b>First Published:</b>
      {{ detail_data.created ?
        detail_data.created.slice(0, 10) :
        "N/A" }}
    </p>
    <p>
      <b>Last Published:</b>
      {{ detail_data.updated ?
        detail_data.updated.slice(0, 10) :
        "N/A" }}
    </p>
    <hr />
    <!-- <p><b>Contact Author:</b> N/A</p>
    <hr />
    <p><b>Award(s):</b> N/A</p>
    <hr />
    <p><b>Associated project(s):</b> N/A</p> -->
    <p v-if="detail_data.contributor_affiliation.length > 0">
      <b>Institution(s):</b> {{ institution }}
    </p>
    <p v-else><b>Institution(s):</b> N/A</p>
    <!-- <hr />
    <h2>About this version</h2>
    <p><b>Version 3 Revision 1:</b> N/A</p>
    <p><b>Dataset DOI:</b> N/A</p> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AboutInfo",
  props: [ "detail_data", "title" ],
  data: () => {
    return {
      isLoading: true,
      institution: "",
    }
  },

  created: async function() {
    const institution_list = this.handelInstitutions(this.detail_data.contributor_affiliation);
    this.institution = institution_list.length > 0 ? await this.handelNames(institution_list) : "N/A";
    this.isLoading = false;
  },

  methods: {
    handelInstitutions(val) {
      let result = [];
      val.forEach((item) => {
        if (!result.includes(item))
          result.push(item);
      })
      return result;
    },

    async handelNames(val) {
      let result = [];
      for (let i = 0; i < val.length; i++) {
        let name = val[i];
        if (name.includes("ror.org")) {
          let id = name.slice(name.lastIndexOf('/') + 1);
          await axios
            .get(`https://api.ror.org/organizations/${id}`)
            .then((res) => {
              name = res.data.name;
            })
            .catch((err) => {
              console.log(err);
            });
        }
        result.push(name);
      }
      return result.join('; ');
    },
  }
}
</script>

<style scoped lang="scss">
// 
</style>