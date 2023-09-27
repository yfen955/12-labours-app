<template>
  <div>
    <el-card shadow="never" class="description-container">
      <h1>{{ title }}</h1>
      <div class="information-top">
        <section class="description">
          <p>
            <b>Contributors: </b>
            <span
              v-if="
                detail_data.contributor_name.length !==
                  detail_data.contributor_orcid.length
              "
            >
              {{ combineNames() }}
            </span>
            <span
              v-else
              v-for="(name, i) in detail_data.contributor_name"
              :key="i"
            >
              <!-- Must be on one line so that there are no space between the text and comma -->
              <a :href="modifyLink(i)">{{modifyName(name)}}</a>{{i===detail_data.contributor_name.length-1?'':','}}
            </span>
          </p>
          <hr />
          <p>
            <b>Description: </b>
            {{ detail_data.subtitle[0] }}
          </p>
        </section>
        <el-card shadow="never">
          <p><b>Dataset ID:</b> {{ $route.params.id }}</p>
          <!-- <p>
            <b>Viewing version:</b> {{ detail_data.metadata_version[0] }}
          </p> -->
          <div v-if="detail_data.identifier_type[0] === 'DOI'">
            <b>DOI: </b>
            <div
              v-for="(item, i) in detail_data.identifier"
              :key="i"
              class="indent display-ellipsis --1"
            >
              <a :href="item" target="_blank">{{ item }}</a>
            </div>
          </div>
          <!-- need more data to display these infomation -->
          <p v-if="detail_data.date">Date: {{ detail_data.date }}</p>
          <p v-if="detail_data.files">
            <i class="el-icon-document-copy"></i>
            {{ detail_data.files }} files
          </p>
          <p v-if="detail_data.size">
            <i class="el-icon-files"></i> {{ detail_data.size }} GB
          </p>
          <!-- <p>
            <b>Latest version:</b> {{ detail_data.metadata_version[0] }}
          </p> -->
          <p v-if="detail_data.date">Date: {{ detail_data.date }}</p>
          <p v-if="detail_data.other_version">View other version</p>
        </el-card>
      </div>
      <hr v-if="detail_data.download_num" />
      <div class="information-bottom" v-if="detail_data.download_num">
        <p class="usage"><b>Usage Rights:</b> N/A</p>
        <p class="download"><b>Downloads:</b> N/A</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HeaderInfo",
  props: [ "detail_data", "title" ],

  methods: {
    combineNames() {
      let result = "";
      let name_list = this.detail_data.contributor_name;
      name_list.map((item) => {
        let person_names = item.split(", ");
        result += person_names[1] + " " + person_names[0] + ", ";
      });
      return result.slice(0, -2);
    },

    modifyLink(i) {
      return this.$parent.modifyLink(i);
    },

    modifyName(name, i) {
      return this.$parent.modifyName(name, i);
    },
  }
}
</script>

<style scoped lang="scss">
//
</style>