<template>
  <div class="news-and-events-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()" />
    <div :style="urlStyle" class="news-events-banner">
      <div class="banner__title-box">
        <span>{{banner.values.title}}</span>
      </div>
    </div>
    <div class="news-container">
       <latest-news :newsList="topNews.newsList"/>
    </div>
   
    <latest-events :eventsList="topEvents.eventsList"/>
  </div>
</template>


<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'NewsAndEventsPage',
  
  async asyncData({$graphcms}) {
    const topNews= await graphcmsQuery.topNews($graphcms, 3);    
    const topEvents= await graphcmsQuery.topEvents($graphcms, 5); 
    const banner= await graphcmsQuery.banner($graphcms, 'news_and_events');
    return {topNews,topEvents,banner}
  },
  
  data: () => {
    return {
      pageTitle: 'News & Events',
      breadcrumb: [
        {
          to: {
            name: 'index'
          },
          label: 'HOME'
        }
      ]
    }
  },
  
  computed: {
    urlStyle () {
      return {
        '--banner-url': 'url('+this.banner.values.image.url+')'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .news-container{
    background: #F8F8F8;
  }

  .news-and-events-page{
    width:100%;
  }
  
</style>