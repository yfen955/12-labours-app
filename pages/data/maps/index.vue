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
      const config = {
        headers: {
          'Accept': 'application/json'
        }
      }
      try {
        const res = await axios.get(`https://abi-12-labours-api.herokuapp.com/search`, config)
        // console.log(res);
        let model = res.data.filter((record, index) => {
          if (index == text || record.Organ.toLowerCase() === text || record.Species.toLowerCase() === text)
            return record
        })
        this.url = model[0].Location;
        console.log(model);
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style>

</style>