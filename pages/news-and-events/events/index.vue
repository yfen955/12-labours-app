<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()" />
    <banner :banner-data="banner.values"/>
    <div class="event-container container-default">
        <div class="top-heading">
            <h1>
                EVENTS 
            </h1>
        </div> 
        <div class="category-tab">
          <tab-nav
          :tabs="tabs"
          :active-tab="activeTab"
          @tabClick="onTabClick($event)"
        />
        </div>      
        <div class="event-items">
            <div v-for="eventItem in pagedEvents"  class="event-items__item">
              <event-item :event-item="eventItem"/>
            </div>
        </div> 
        <div class="not-found"  :style="this.eventsList.length>0? 'display:none' : ''">
          <h2>No records found for this category</h2>
        </div>      
        <div class="paginator" :style="this.eventsList.length==0? 'display:none' : ''">     
          <pagination
            :total-count="totalCount"
            :page-size="pageSize"          
            @select-page="onPaginationChange"
          />       
        </div>      
    </div>
  </div>
</template>


<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'eventPage',
  
  async asyncData({$graphcms}) { 
    const topEvents=await graphcmsQuery.topEvents($graphcms);   
    const banner= await graphcmsQuery.banner($graphcms, 'events');
    const eventsCategory=await graphcmsQuery.eventsCategory($graphcms);
    return {banner,eventsCategory,topEvents}
  },

  data: () => {
    return {
      pageTitle: 'Events',
      breadcrumb: [
        {
          to: { name: 'index'},
          label: 'HOME'
        },
        {
          to: {name: 'news-and-events'},
          label: 'NEWS & EVENTS'
        }
      ],
      activeTab: '',            
      eventsList:[],              
      pageSize: 2,
      totalCount:0,
      currentPage:1
    }
  },

  methods: {
    onTabClick(clickedTab){
      this.activeTab=clickedTab; 
    },
    onPaginationChange: function(page) {
      this.currentPage=page
    }
  },

  created(){

    /*Populate tabs with eventsCategory Enum from GraphCMS */
    const catEnum=this.eventsCategory.__type.enumValues

    /* For enums, GraphCMS only allows underscore */
    /* Adding label field as well as replacing underscores with spaces */

    catEnum.map(e => e.label = e.name.replace(/_/g,' '));  
    this.tabs=catEnum

    if(this.tabs.length<=0)
      this.$router.replace({ path: '/404' });  

    this.activeTab=this.tabs[0].name 
  },

  computed: {
    pagedEvents() {
      return this.eventsList.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage)
    }
  },

  watch: { 
    activeTab: function () {  
      this.eventsList=this.topEvents.eventsList.filter(item => item.category==this.activeTab)
      this.totalCount=this.eventsList.length
      this.currentPage=1    
    }
  }
}
</script>

<style scoped lang="scss">

  .event-container{
    display:flex;
    flex-direction:column;
  }

  .category-tab{
      margin-top:12px;    
      padding-left:32px;
    }

  .event-items{
    width:100%;
    display:flex;   
    flex-direction:column;   

    .event-items__item{
      padding-left:32px;
      padding-top:40px;
    }   
  }

  .paginator{
    margin-top:24px;   //TBC  //7
    margin-bottom:40px;
    display:flex;
    justify-content:center;
  }

  .not-found{
    text-align:center;
  }
</style>