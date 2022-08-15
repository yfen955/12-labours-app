<template>
  <div>
    <client-only placeholder="Loading scaffold ...">
      <div class="scaffoldvuer-container">
        <BrowseMap v-on:search-text="searchText" />
        <Map :location='url' />
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
      isLoadingSearch: false,
      scaffoldVuers: [],
      defaultModel: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/others/29_Jan_2020/heartICN_metadata.json',
      url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/others/29_Jan_2020/heartICN_metadata.json',
    }
  },

  created: async function() {
    this.isLoadingSearch = true;
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`https://abi-12-labours-api.herokuapp.com/spreadsheet`, config)
      // console.log(res.data);
      this.scaffoldVuers = res.data;
    } catch (error) {
      console.log(error);
    };
    this.isLoadingSearch = false;
  },

  methods: {
    async searchText(text) {
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
                  console.log(value);
                  return data
                }
              }
            }
          }
        })
        // console.log(matchData);
        this.url = matchData[0].Location;
      } else {
        this.url = this.defaultModel;
      }
    }
  },
}
</script>

<style>

</style>