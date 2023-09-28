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
    <p class="indent --2">
      <b>Anatomical structure:</b>
      <span v-if="detail_data.study_organ_system.length === 0"> N/A</span>
      <nobr
        v-else
        v-for="(organ, i) in detail_data.study_organ_system"
        :key="i"
      >
        <nobr v-if="i < detail_data.study_organ_system.length - 1">
          {{ organ[0].toUpperCase() + organ.slice(1) }},
        </nobr>
        <nobr v-else>
          {{ organ[0].toUpperCase() + organ.slice(1) }}
        </nobr>
      </nobr>
    </p>
    <p class="indent --2">
      <b>Species:</b>
      <span v-if="species_list.length === 0"> N/A</span>
      <nobr
        v-else
        v-for="(item, i) in species_list"
        :key="i"
      >
        <nobr v-if="i < species_list.length - 1">
          {{ item[0].toUpperCase() + item.slice(1) }},
        </nobr>
        <nobr v-else>
          {{ item[0].toUpperCase() + item.slice(1) }}
        </nobr>
      </nobr>
    </p>
    <p class="indent --2">
      <b>Sex:</b>
      <span v-if="sex_list.length === 0"> N/A</span>
      <nobr
        v-else
        v-for="(item, i) in sex_list"
        :key="i"
      >
        <nobr v-if="i < sex_list.length - 1">
          {{ item[0].toUpperCase() + item.slice(1) }},
        </nobr>
        <nobr v-else>
          {{ item[0].toUpperCase() + item.slice(1) }}
        </nobr>
      </nobr>
    </p>
    <p class="indent --2">
      <b>Age range:</b>
      <span v-if="age_list.length === 0"> N/A</span>
      <nobr
        v-else
        v-for="(item, i) in age_list"
        :key="i"
      >
        <nobr v-if="i < age_list.length - 1">
          {{ item[0].toUpperCase() + item.slice(1) }},
        </nobr>
        <nobr v-else>
          {{ item[0].toUpperCase() + item.slice(1) }}
        </nobr>
      </nobr>
    </p>
    <div v-if="detail_data.number_of_samples[0] > 0 || detail_data.number_of_subjects[0] > 0">
      <p class="indent --2">
        <b>Number of samples:</b>
        {{ detail_data.number_of_samples[0] }} samples from {{ detail_data.number_of_subjects[0] }} subjects
      </p>
    </div>
    <div v-else>
      <p class="indent --2"><b>Number of samples:</b> N/A</p>
    </div>
    <hr>
    <p><b>Keywords:</b> {{ displayKeywords(detail_data.keywords) }}</p>
  </div>
</template>

<script>
export default {
  name: "AbstractInfo",
  props: [ "detail_data", "species_list", "sex_list", "age_list" ],
  methods: {
    displayKeywords(keywords) {
      let result = "";
      for (let i = 0; i < keywords.length; i++) {
        let word = keywords[i].trim();
        result += ", " + word.charAt(0).toUpperCase() + word.slice(1);
      }
      return result.slice(2);
    }
  }
}
</script>

<style scoped lang="scss">
// 
</style>