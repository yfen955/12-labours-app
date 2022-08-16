<template>
  <div class="container-default">
    <BrowseMap v-on:search-text="searchText" />
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
    this.$router.push({
      path: '/data/maps',
      query: {
        species: 'cat',
        organ: 'bladder',
        file_path: 'cat_bladder_metadata.json',
        // id: '',  // when view changed, there will be id in the url
      }
    });
    this.isLoading = true;
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`https://abi-12-labours-api.herokuapp.com/spreadsheet`, config)
      // console.log(res.data);
      this.scaffoldVuers = res.data;
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
    } catch (error) {
      console.log(error);
    };
    this.isLoading = false;
  },

  methods: {
    searchText(text) {
      if (text !== "") {
        const textList = text.toLowerCase().split(' ');
        let matchData = this.scaffoldVuers.filter((data, index) => {
          for (var key in data) {
            let exist = false;
            for (var i in textList) {
              let value = data[key]
              if (typeof(value) == 'string') {
                exist = value.toLowerCase().includes(textList[i])
                if (exist) {
                  return data
                }
              }
            }
          }
        })
        // console.log(matchData);
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
    }
  },
}
</script>

<style>

</style>