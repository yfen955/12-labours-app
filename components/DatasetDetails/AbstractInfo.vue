<template>
  <div>
    <p>
      <b>Study Purpose:</b>
      {{ detail_data.study_purpose.length > 0 ? detail_data.study_purpose[0] : "N/A" }}
    </p>
    <!-- <p><b>Completeness:</b> N/A</p>
    <p><b>Primary vs derivative data:</b> N/A</p>
    <p><b>Important Notes:</b> N/A</p> -->
    <hr />
    <h2>Metadata</h2>
    <!-- <p><b>Experimental Design:</b> N/A</p>
    <p class="indent --2"><b>Protocol Links:</b> N/A</p>
    <p class="indent --2"><b>Experimental Approach:</b> N/A</p> -->
    <p><b>Subject Information:</b></p>
    <div v-for="facet_list, key, i in facets_dict" :key="i">
      <p class="indent --2" v-if="key !== 'Data type'">
        <b>{{ key }}:</b>
        <span v-if="facet_list.length === 0"> N/A</span>
        <span v-else>{{ facet_list.join(', ') }}</span>
        <!-- <nobr
          v-else
          v-for="(facet, n) in facet_list"
          :key="n"
        >
          <nobr v-if="n < facet_list.length - 1">{{ facet }}, </nobr>
          <nobr v-else>{{ facet }}</nobr>
        </nobr> -->
      </p>
    </div>
    <div v-if="detail_data.numberSamples > 0 || detail_data.numberSubjects > 0">
      <p class="indent --2">
        <b>Number of samples:</b>
        {{ detail_data.numberSamples }} samples from {{ detail_data.numberSubjects }} subjects
      </p>
    </div>
    <div v-else>
      <p class="indent --2"><b>Number of samples:</b> N/A</p>
    </div>
    <hr>
    <p><b>Keywords:</b> {{ detail_data.keywords.join(', ') }}</p>
  </div>
</template>

<script>
export default {
  name: "AbstractInfo",
  props: [ "detail_data", "facets_dict" ],
}
</script>

<style scoped lang="scss">
// 
</style>