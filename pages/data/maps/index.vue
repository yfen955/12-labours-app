<template>
  <div class="container-default">
    <BrowseMap v-on:search-text="searchText" />
    <el-button
      type='success'
      @click='copyLink()'
      size='small'
      class="copy-btn"
    >
      Copy the link
    </el-button>
    <client-only placeholder="Loading scaffold ...">
      <div class="scaffoldvuer-container">
        <Map v-if="!isLoading" :location='url' />
      </div>
    </client-only>
  </div>
</template>

<script>
import Map from '../../../components/Map/Map.vue';
import BrowseMap from '../../../components/Map/BrowseMap.vue';
import axios from "axios";

export default {
  components: { Map, BrowseMap },

  data() {
    return {
      isLoading: false,
      scaffoldVuers: [],
      currentModel: {},
      url: '',
    }
  },

  created: async function() {
    this.isLoading = true;
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`${process.env.query_api_url}spreadsheet`, config)
      this.scaffoldVuers = res.data;
    } catch (error) {
      console.log(error);
    };
    this.isLoading = false;

    if (this.$router.currentRoute.fullPath === "/data/maps") {
      this.currentModel = this.scaffoldVuers[0];
      this.url = this.currentModel.Location;
      let url_list = this.url.split('/');
      this.$router.push({
        path: '/data/maps',
        query: {
          species: `${this.currentModel.Species.toLowerCase()}`,
          organ: `${this.currentModel.Organ.toLowerCase()}`,
          file_path: `${url_list[url_list.length - 1]}`,
        }
      })
    } else {
      const filePath = this.$router.currentRoute.query.file_path;
      for (let i = 0; i < filePath.length; i++) {
        let exist = this.scaffoldVuers[i].Location.includes(filePath)
        if (exist) {
          this.currentModel = this.scaffoldVuers[i];
          this.url = this.scaffoldVuers[i].Location;
          break
        }
      }
    }
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
      let url = 'localhost:3000' + this.$router.currentRoute.fullPath;
      let inputNode = document.createElement('input');
      inputNode.value = url;
      document.body.appendChild(inputNode);
      inputNode.select();
      document.execCommand('copy');
      inputNode.className = 'oInput';
      inputNode.style.display = 'none';
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