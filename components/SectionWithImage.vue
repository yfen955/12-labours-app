<template>
  <div class="container-default shaded" :style="this.hideBgColor? bgStyle:''">
    <h1 class="top-heading">
      {{title.toUpperCase()}}
    </h1>
    <div class="flex-box --space-between">
      <div class="default-inner">
        <div v-for="item in contents" :key="item.index">
          <div v-html="item.html"/>
        </div>
        <div class="flex-box --wrap">
          <div v-for="item in navigationButtons" :key="item.index">
            <div class="nav-button">
              <nuxt-link :to="item.linkTo">
                <el-button>
                  {{item.linkCaption.toUpperCase()}}
                </el-button>
              </nuxt-link>
            </div>
          </div>
        </div>
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
    contents: {
      default: () => [],
      required: true
    },
    navigationButtons:{
       default: () => []
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

.nav-button{
  padding-top:2.25rem;
  padding-right:2rem;
}
</style>