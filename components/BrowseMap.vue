<template>
  <form @submit.prevent='onSubmit'>
    <input type="text" v-model="text" placeholder="search model index...">
    <input type="submit" value="search model">
  </form>
</template>

<script>
export default {
    name: 'BrowseMap',
    data() {
        return {
            text: '',
        }
    },
    methods: {
        onSubmit() {
            this.$emit('search-text', this.text)
            this.text = ''
        }
    }
}
</script>

<style>

</style>