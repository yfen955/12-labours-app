<template>
  <el-button
    type='success'
    @click='copyLink()'
    size='small'
    class="copy-btn"
  >
    Copy the link
  </el-button>
</template>

<script>
export default {
  name: 'CopyLink',
  methods: {
    copyLink() {
      let url = process.env.base_url + this.$router.currentRoute.fullPath;  // current url
      let inputNode = document.createElement('input');  // create a new input
      inputNode.value = url;  // set the value to the url
      document.body.appendChild(inputNode);
      inputNode.select();
      document.execCommand('copy');   // call to execute the browser copy command
      inputNode.className = 'oInput';
      inputNode.style.display = 'none';   // hide the input
      this.$message.success('copied');
    }
  }
}
</script>

<style>
.copy-btn {
  margin-left: 60%;
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>