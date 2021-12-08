<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <banner :banner-data="banner.values"/>
    <div class="container-default vertical-flex">
      <div class="top-heading">
        <h1>
          NEWS
        </h1>
      </div> 
      <div class="default-inner">
        <div class="category-tab">
          <tab-nav
          :tabs="tabs"
          :active-tab="activeTab"
          @tabClick="onTabClick($event)"
        />
        </div>      
        <div class="news-items vertical-flex">
            <div v-for="newsItem in pagedNews"  class="news-items__item">
              <news-item :news-item="newsItem"/>
            </div>
        </div> 
        <div class="not-found"  :style="this.newsList.length>0? 'display:none' : ''">
          <h2>No records found for this category</h2>
        </div>      
        <div class="paginator" :style="this.newsList.length==0? 'display:none' : ''">     
          <pagination
            :total-count="totalCount"
            :page-size="pageSize"          
            @select-page="onPaginationChange"
          />       
        </div> 
      </div>     
    </div>
  </div>
</template>


<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'NewsPage',
  
  async asyncData({$graphcms}) { 
    const topNews=await graphcmsQuery.topNews($graphcms);   
    const banner= await graphcmsQuery.banner($graphcms, 'news');
    const newsCategory=await graphcmsQuery.newsCategory($graphcms);
    return {banner,newsCategory,topNews}
  },

  data: () => {
    return {
      pageTitle: 'News',
      breadcrumb: [
        {
          to: { name: 'index'},
          label: 'Home'
        },
        {
          to: {name: 'news-and-events'},
          label: 'News & Events'
        }
      ],
      activeTab: '',            
      newsList:[],              
      pageSize: 5,
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

    /*Populate tabs with NewsCategory Enum from GraphCMS */
    const catEnum=this.newsCategory.__type.enumValues

    /* For enums, GraphCMS only allows underscore */
    /* Adding label field as well as replacing underscores with spaces */

    catEnum.map(e => e.label = e.name.replace(/_/g,' '));  
    this.tabs=catEnum

    if(this.tabs.length<=0)
      this.$router.replace({ path: '/404' });     //TBC - if needed

    this.activeTab=this.tabs[0].name 
  },

  computed: {
    pagedNews() {
      return this.newsList.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage)
    }
  },

  watch: { 
    activeTab: function () {  
      this.newsList=this.topNews.newsList.filter(item => item.category==this.activeTab)
      this.totalCount=this.newsList.length
      this.currentPage=1    //Reset page as well
    }
  }
}
</script>

<style scoped lang="scss">

  .category-tab{
    margin-top:0.75rem;    
  }

  .news-items{
    width:100%;

    .news-items__item{
      padding-top:2.5rem;
    }   
  }

  .paginator{
    margin-top:1.5rem;  
    display:flex;
    justify-content:center;
  }

  .not-found{
    padding:2rem 0;
  }
</style>