<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumb" :key="item.label">
      <span @click="handlePath(item.to)">{{ item.label }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'FilesBreadcrumb',
  props: [ 'breadcrumb' ],
  data: () => {
    return {
      
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
span {
  margin-top: .5rem;
  margin-bottom: .5rem;
  color: $app-secondary-color;
  text-transform: capitalize;
}
</style>