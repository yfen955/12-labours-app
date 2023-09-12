<template>
  <div>
    <h2>Dataset Citation</h2>
    <p>
      To promote reproducibility and give credit to investigators who
      publish their data, we recommend citing your usage of 12-labours
      datasets. To make it easy, the 12-labours Portal provides the full
      data citation, including the option of different formats, under
      the Cite tab of each dataset page. For more Information, please
      see our Help page.
    </p>
    <div v-if="apaCitation.length > 0">
      <h5 class="small-title">APA</h5>
      <div class="citaiton-block">
        <el-button
          icon="el-icon-copy-document"
          id="copy-btn"
          @click="copyText(apaCitation)"
          >Copy</el-button
        >
        <div class="citation-content indent">
          <div
            v-for="(item, i) in apaCitation"
            :key="i"
            v-html="item"
          ></div>
        </div>
      </div>
    </div>
    <p>
      Click
      <a href="https://citation.crosscite.org/" target="_blank">
        here
      </a>
      to generate citations in more formats.
    </p>
  </div>
</template>

<script>
export default {
  name: "CiteInfo",
  props: [ "identifier" ],
  data: () => {
    return {
      apaCitation: [],
    }
  },

  created: async function() {
    await this.handleCitation();
  },

  methods: {
    async handleCitation() {
      for (let item of this.identifier) {
        await axios
          .get(item, {
            headers: {
              Accept: "text/x-bibliography; style=apa",
            },
          })
          .then((res) => {
            if (!res.data.includes("<!doctype html>"))
              this.apaCitation.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    copyText(text_list) {
      let text = "";
      text_list.map((item) => {
        text += item;
        if (!item.includes("\n")) {
          text += "\n";
        }
      });
      let inputNode = document.createElement("input");
      inputNode.value = text;
      document.body.appendChild(inputNode);
      inputNode.select();
      document.execCommand("copy");
      inputNode.className = "oInput";
      inputNode.id = "clipboard";
      inputNode.style.display = "none";
      this.$message.success("copied");
    },
  }
}
</script>

<style scoped lang="scss">
// 
</style>