<template>
    <div class="container-default shaded vertical-flex" :style="this.hideBgColor? bgStyle : ''">
        <div class="top-heading">
            <h1>
                LATEST NEWS
            </h1>
        </div>       
        <div class="cards-in-row">
            <div v-for="newsItem in newsList" :key="newsItem.index">
                <news-card  :newsItem="newsItem"/>
            </div>
        </div>
        <div class="view-all">
            <nuxt-link to="/news-and-events/news/">VIEW ALL NEWS</nuxt-link>        
        </div>
    </div>
</template>

<script>
export default {
  name: 'LatestNews',

  props: {
    newsList: {
      type: Array,
      default: () => []
    },
    linkComponent: {
      type: String,
      default: 'nuxt-link'
    },
    hideBgColor:{
        type:Boolean,
        default:false
    }
  },

  computed: {
        bgStyle () { 
            return {              
                'background-color': '#FFFFFF'               
            }
        }
    }
}
</script>


<style scoped lang="scss">

    .view-all{
        padding-top:38px;
        text-align: center; 
        a{
            font-weight:600;
        }
    }

</style>
