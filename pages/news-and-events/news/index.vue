<template>
  <div class="news-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()" />
    <banner :banner-data="banner.values"/>
    <div class="news-container">
        <div class="top-heading">
            <h1>
                NEWS 
            </h1>
        </div> 
        <div class="category-tab">
          <tab-nav2
          :tabs="tabs"
          :active-tab="activeTab"
          @tabClick="onTabClick($event)"
        />
        </div>      
        <div class="news-items">
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
          label: 'HOME'
        },
        {
          to: {name: 'news-and-events'},
          label: 'NEWS & EVENTS'
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

    catEnum.map(e => e.label = e.name.replace("_", " "));  
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

  .news-page{
    width:100%;
  }
  
  .news-container{
    display:flex;
    flex-direction:column;
    padding-left:60px;
    padding-right:60px;
  }

  .top-heading{ 
    width:100%;
    padding-top:40px;
    padding-bottom:32px;    //TBC  - 40
    text-align: center; 
    h1{
        margin:0px;
        line-height:34px;
      }
    }

  .category-tab{
      margin-top:12px;    //TBC  - 4
      padding-left:32px;
      //margin-bottom:28px;     //TBC - can make it 40 after tabnav finalised   //***//
    }

  .news-items{
    width:100%;
    display:flex;   
    flex-direction:column;   
    //margin-top: 2px;    //***//

    .news-items__item{
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