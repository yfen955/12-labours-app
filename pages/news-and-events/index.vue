<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()" />
    <banner :banner-data="banner.values"/>
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
  }
}
</script>