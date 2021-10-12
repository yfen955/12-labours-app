<template>
    <div class="news-container">
        <div class="top-heading">
            <h1>
                LATEST NEWS
            </h1>
        </div>       
        <div class="news-items">
            <div v-for="newsItem in newsList" :key="newsItem.index" class="news-items__item">
                <news-card :newsItem="newsItem"/>
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
    }
  }
}
</script>


<style scoped lang="scss">

    .news-container{
        display:flex;
        flex-direction:column;
        padding-left:60px;
        padding-right:60px;
        background-color:$background;

        h1{
            margin:0px;
            line-height:34px;
        }
    }

    .top-heading{ 
        width:100%;
        padding-top:40px;
        padding-bottom:32px;
        text-align: center; 
    }

    .news-items{
        width:100%;
        display:flex;      
        justify-content:center;      
        align-items: center;
        .news-items__item{
            padding-left:19px;
            padding-right:19px;
        }
    }

    .view-all{
        width:100%;
        padding-top:38px;
        padding-bottom:40px;
        text-align: center; 
        a{
            font-weight:600;
        }
    }

</style>
