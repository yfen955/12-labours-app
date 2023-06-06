<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, i) in breadcrumb.slice(0, breadcrumb.length - 1)" :key="i">
      <span class="hyperlink" @click="handlePath(item.to)">{{ item.label }}</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item class="title">{{ title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'FilesBreadcrumb',
  props: [ 'breadcrumb' ],
  // data: () => {
  //   return {
  //     title: '',
  //   }
  // },

  computed: {
    title: function() {
      return this.breadcrumb[this.breadcrumb.length - 1].label;
    }
  },

  methods: {
    handlePath(path) {
      let file_path = `/tempZone/home/rods/12L/datasets/${this.$route.params.id}`;
      if (path.length > 6)
        file_path = file_path + `/${path.slice(6)}`;
      this.$emit('folder_path', file_path);
    }
  }
}
</script>

<style scoped lang="scss">
.hyperlink {
  margin-top: .5rem;
  margin-bottom: .5rem;
  color: $app-secondary-color;
  text-transform: capitalize;
  text-decoration: underline;
}
.title {
  text-transform: capitalize;
}
</style>