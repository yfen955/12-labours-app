<template>
  <card-small :specs="cardSpecs"/>
</template>

<script>
export default {
    name: 'DataBrowser',

  data: () => {
    return {
      cardSpecs:{
        title:'data browser',
        imgFile:'researcher-in-frame.png',
        detail:'Browse data and models.',
        btnLink:{caption:'View Data Browser', to:'/'}
      }
    }
  }
}
</script>
