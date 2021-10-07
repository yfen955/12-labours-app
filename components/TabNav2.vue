<template>
    <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-item">
          <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name" class="tab-item">
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    props: {
        tabs: {
        type: Array,
        default: () => []
        },
        activeTab: {
        type: String,
        default: ''
        }
    },

    methods: {
      handleClick(tab, event) {
        this.$emit('tabClick',tab.name)
      } 
    },

    created(){
      this.activeName = this.activeTab    //Need to do this for prop mutating warning
    }
  }
</script>


<style lang="scss" scoped>
//@import '../../../assets/_variables.scss';

.tabs {
  //display:flex;
}


.el-tabs__nav{
  &is-top{
    color:pink;
    div >>> .tab-item{
          color:green;
    }
  }

 ::v-deep .tab-item {
    background-color: red;
    color:green;
  }
}

.el-tab__item {
    ::v-deep  .tab-item {
    color:green;
    }
  }

</style>
