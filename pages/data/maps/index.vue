<template>
  <div class="container-default">
    <!-- <BrowseMap v-on:search-text="searchText" /> -->
    <el-button
      type='success'
      @click='copyLink()'
      size='small'
      class="copy-btn"
    >
      Copy the link
    </el-button>
    <Model v-if="!isLoading" :location='url' :taxo='taxo' :uberonid='uberonid' />
  </div>
</template>

<script>
import Model from '../../../components/Map/Model.vue';
import BrowseMap from '../../../components/Map/BrowseMap.vue';

export default {
  components: { Model, BrowseMap },

  data: () => {
    return {
      isLoading: false,
      display: '',
      url: '',
      taxo: '',
      // uberonid: '',
    }
  },

  created: function() {
    this.url = this.$route.query.url;
    this.taxo = this.$route.query.taxo;
    this.uberonid = this.$route.query.uberonid;
  },

  methods: {
    searchText(text) {
      if (text !== "") {
        const textList = text.toLowerCase().split(' ');
        let matchData = this.scaffoldVuers.filter((data, index) => {
          for (let key in data) {
            for (let i in textList) {
              let value = data[key]
              if (typeof(value) == 'string') {
                if (value.toLowerCase().includes(textList[i])) {
                  return data
                }
              }
            }
          }
        })
        this.currentModel = matchData[0];
      }
      this.url = this.currentModel.Location;
      let url_list = this.url.split('/');
      this.$router.push({
        path: '/data/maps',
        query: {
          species: `${this.currentModel.Species.toLowerCase()}`,
          organ: `${this.currentModel.Organ.toLowerCase()}`,
          file_path: `${url_list[url_list.length - 1]}`,
        }
      });
    },

    copyLink() {
      let url = process.env.base_url + this.$router.currentRoute.fullPath;  // current url
      let inputNode = document.createElement('input');  // create a new input
      inputNode.value = url;  // set the value to the url
      document.body.appendChild(inputNode);
      inputNode.select();
      document.execCommand('copy');   // call to execute the browser copy command
      inputNode.className = 'oInput';
      inputNode.style.display = 'none';   // hide the input
      this.$message.success('copied');
    }
  },
}
</script>

<style>
.copy-btn {
  margin-left: 80%;
}
</style>