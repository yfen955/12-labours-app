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
import Map from '../../../components/Map.vue';
import BrowseMap from '../../../components/BrowseMap.vue';
import w3_data from '../../../assets/spreadsheet.json';
import axios from "axios";

export default {
  components: { Map, BrowseMap },

  data() {
    return {
      url: 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/others/29_Jan_2020/heartICN_metadata.json',
    }
  },

  methods: {
    async searchText(text) {
      // const config = {
      //   headers: {
      //     'Accept': 'application/json'
      //   }
      // }
      // try {
      //   const res = await axios.get(`/search/${text}`, config)
      //   console.log(res.data);
      //   this.url = res.data.location;
      // } catch (error) {
      //   console.log(error);
      // }
      console.log(w3_data[0]);
      this.url = w3_data[0].Location;
    }
  },
}
</script>

<style>

</style>