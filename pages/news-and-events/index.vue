<template>
  <div class="news-and-events-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()" />
    <div :style="urlStyle" class="news-events-banner">
      <div class="banner__title-box">
        <span>{{banner.values.title}}</span>
      </div>
    </div>
    <latest-news :newsList="topNews.newsList"/>
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
   @import "@abi-software/twelve-labours-design-system-components/src/assets/_variables.scss";

  .news-and-events-page{
        width:100%;
  }

  .news-events-banner{
    display:flex;
    align-items:center;
    justify-content:flex-end;    
    height:300px;
    background-image:var(--banner-url);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .banner__title-box{
    height:108px;
    width:340px;
    margin-right:60px;
    border-radius:20px;
    background-color: $blue;
    display:flex;
    align-items:center;
    justify-content:center;
    span{
      font-weight:bold;
      font-size: 40px;
      line-height: 44px;
      color:$cochlear;
    }
  }
</style>