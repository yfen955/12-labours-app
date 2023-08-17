<template>
  <client-only placeholder="Loading Dicom Viewer ...">
    <div>
      <div class="toolbar">
        <div class="name">
          <h1>DICOM Tags</h1>
        </div>
        <div class="search">
          <el-input
            v-model="search"
            placeholder="Type to search"
            @input="searchOnTable"
          />
        </div>
        <div class="slider">
          <el-slider
            :disabled="sliderMin === sliderMax ? true : false"
            :min="sliderMin"
            :max="sliderMax"
            v-model="instanceNumber"
            @input="onSliderChange"
          />
        </div>
      </div>

      <div class="toolbar">
        <el-table v-if="searched.length > 0" :data="searched" height="500">
          <el-table-column label="Name" prop="name" min-width="300">
          </el-table-column>
          <el-table-column label="Value" prop="value" min-width="300">
          </el-table-column>
        </el-table>
        <el-table
          v-else
          :data="[{ empty: `No tags found for this ${search} query.` }]"
          style="width: 100%"
          height="500"
        >
          <el-table-column label="Empty" prop="empty" min-width="600">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </client-only>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn, Input, Slider } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

locale.use(lang);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Slider);

const toLower = (text) => {
  if (text) {
    return text.toString().toLowerCase();
  } else {
    return "";
  }
};

const searchAll = (items, term) => {
  if (term) {
    return items.filter((item) => {
      return (
        toLower(item.name).includes(toLower(term)) ||
        toLower(item.value).includes(toLower(term))
      );
    });
  }
  return items;
};

const getMetaArray = (tagData, instanceNumber) => {
  const reducer = getTagReducer(tagData, instanceNumber, "");
  const keys = Object.keys(tagData);
  return keys.reduce(reducer, []);
};

const getTagReducer = (tagData, instanceNumber, prefix) => {
  return (accumulator, currentValue) => {
    let name = currentValue;
    const element = tagData[currentValue];
    let value = element.value;
    // possible 'merged' object
    if (typeof value[instanceNumber] !== "undefined") {
      value = value[instanceNumber].value;
    }
    // force instance number (otherwise takes value in non indexed array)
    if (name === "InstanceNumber") {
      value = instanceNumber;
    }
    // recurse for sequence
    if (element.vr === "SQ") {
      // sequence tag
      accumulator.push({
        name: (prefix ? prefix + " " : "") + name,
        value: "",
      });
      // sequence value
      for (let i = 0; i < value.length; ++i) {
        const sqItems = value[i];
        const keys = Object.keys(sqItems);
        const res = keys.reduce(
          getTagReducer(sqItems, instanceNumber, prefix + "[" + i + "]"),
          []
        );
        accumulator = accumulator.concat(res);
      }
    } else {
      accumulator.push({
        name: (prefix ? prefix + " " : "") + name,
        value: value,
      });
    }
    return accumulator;
  };
};

export default {
  name: "TagsTable",
  props: ["tagsData"],
  data: () => ({
    search: null,
    searched: [],
    sliderMin: undefined,
    sliderMax: undefined,
    instanceNumber: undefined,
  }),
  methods: {
    searchOnTable() {
      const metaArray = getMetaArray(this.tagsData, this.instanceNumber);
      this.searched = searchAll(metaArray, this.search);
    },
    onSliderChange(value) {
      this.instanceNumber = value;
      this.searchOnTable();
    },
  },
  created() {
    // set slider with instance numbers ('00200013')
    let instanceNumbers = this.tagsData["InstanceNumber"].value;
    if (typeof instanceNumbers === "string") {
      instanceNumbers = [instanceNumbers];
    }
    // convert string to numbers
    const numbers = instanceNumbers.map(Number);
    numbers.sort((a, b) => a - b);

    this.sliderMin = numbers[0];
    this.sliderMax = numbers[numbers.length - 1];
    this.instanceNumber = numbers[0];

    const metaArray = getMetaArray(this.tagsData, this.instanceNumber);
    this.searched = metaArray;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar {
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  .name,
  .search,
  .slider {
    min-width: 120px;
    margin-right: 5px;
  }
}
</style>
