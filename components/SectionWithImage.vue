<template>
  <div class="container-default shaded" :style="this.hideBgColor? bgStyle:''">
    <h1 class="top-heading">
      {{title.toUpperCase()}}
    </h1>
    <div class="flex-box --space-between">
      <div class="default-inner">
        <slot></slot>
      </div>
      <div class="side-img">
        <img :src="require(`~/static/img/${sideImage}`)"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SectionWithImage',

  props: {
    title: {
      type: String,
      required: true
    },
    hideBgColor:{
      type:Boolean,
      default:false
    },
    sideImage:{
      type:String,
      default:'researcher-doctor.png'
    }
  },

  computed: {
    bgStyle () { 
      return {              
        'background-color': 'transparent'               
      }
    }
  }
}

</script>

<style scoped lang="scss">

.side-img{
  padding-right:3.38rem;
  padding-left:2rem;
  img{
    height:20.13rem;
    width:15.31rem;
    display:block;
  }

  @media only screen and (max-width: $viewport-md){    
    display:none;
  }
}

p{
  margin-bottom:1.5rem;
}
</style>