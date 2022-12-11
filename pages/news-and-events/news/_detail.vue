<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle"/>
    <div class="detail-container">
      <div class="vertical-flex"> 
        <div class="image-frame">            
          <img :src="newsItem.image.url" class="news-image" />
        </div>        
        <div class="news-title">
          <h1>{{newsItem.title}}</h1>
        </div>
        <div class="date-social flex-box --space-between --vertical-bottom">
          <div class="date-social__published flex-box --wrap">
            <span>Published&nbsp;</span>
            <span>
                {{this.$formatDDMonthYear(newsItem.publishedDate)}}
            </span>
          </div>               
          <social-box class="check-display"/>                  
        </div>            
        <div class="news-detail">
          <span v-html="newsItem.detail.html">                      
          </span>
        </div>         
        <social-box/>    
        <div class="back-to-news">
          <nuxt-link to="/news-and-events/news/">&lt; Back to News</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'
export default {
  name: 'NewsItemDetail',

  async asyncData({$graphcms, route }) {
    const slug = route.params.detail   
    const news=await graphcmsQuery.news($graphcms,slug)
    return{newsItem:news.newsItem[0]}     
  },

  data: () => {
    return {         
      breadcrumb: [
      {
        to: { name: 'index'},
        label: 'Home'
      },
      {
        to: {name: 'news-and-events'},
        label: 'News & Events'
      },
      {
        to: {name: 'news-and-events-news'},
        label: 'News'
      }] 
    }
  },

  created() {
    this.pageTitle= this.newsItem.title
  }
}

</script>


<style scoped lang="scss">

  .detail-container{
    padding:2rem 20%;    
    @media only screen and (max-width: $viewport-sm){   
      padding:2rem 4%;     
    } 
    @media only screen and (min-width: $viewport-lg){   
      padding:2rem 19.38rem;   
    }            
  }

  .image-frame{           
    display:flex;       
    justify-content:center;
  }

  .news-image{
    width: 100%;
    height:auto;
    max-width:51rem;
    max-height: 21.88rem;
    object-fit:cover;
    display:block;
  }

  .news-title{
    margin-top:1.56rem;
    margin-bottom:0.63rem;
  }

  .date-social{
    padding-bottom:0.38rem;             
    &__published{
      span{
        font-size:0.88rem;
        line-height:1.25rem;
      }
    }
  }

  .news-detail{
    padding-top:2rem;
    padding-bottom:1.56rem;        
    border-top:1px solid $lineColor1;
    border-bottom:1px solid $lineColor1;
    margin-bottom:1.25rem;     
  }

  .back-to-news{
    padding-top:1rem;
    padding-bottom:0.5rem;
    a{
      line-height:1.25rem;
    }
  }
  
  .check-display{
    @media only screen and (max-width: $viewport-sm){   
      display:none;  
    } 
  }
</style>