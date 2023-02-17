<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <!-- Project Aims & Information -->
    <div class="project container-default flex-box">
      <div class="project__item default-inner">
        <h1 class="top-heading">
          {{projectAims.title.toUpperCase()}}
        </h1>
        <div class="flex-box"  v-for="(content,index) in projectAims.contents" :key="index">
          <div class="num vertical-flex">{{ index+1 }}</div> 
          <div v-html="content.html"></div>
        </div>
      </div>
      <div class="project__item default-inner ">
        <h1 class="top-heading">
          PROJECT INFORMATION
        </h1>
       <el-collapse>
          <el-collapse-item  v-for="(item,index) in projectInfo.title"  :key="index" :title="item.toUpperCase()" :name="index">
            <div v-html="projectInfo.content[index].html"></div>
            <div class="nav-button">
              <nuxt-link :to="projectInfo.link[index]">
                <el-button>
                  {{projectInfo.linkCaption[index]}}
                </el-button>
              </nuxt-link>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <latest-news :newsList="topNews.newsList"/>
    <latest-events :eventsList="topEvents.eventsList"/>
    <!-- Partners -->
    <section-with-image :title="partners.title">
      <div v-for="(item,index) in partners.contents" :key="index" v-html="item.html"/>
    </section-with-image>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'AboutPage',

   async asyncData({$graphcms}) {
    const [dataAbout, dataAims, dataInfo, dataPartners,topNews,topEvents] = await Promise.all([ 
      graphcmsQuery.content($graphcms, 'about_long'),
      graphcmsQuery.multiContent($graphcms, 'project_aims'),
      graphcmsQuery.projectInformation($graphcms, 'info'),
      graphcmsQuery.multiContent($graphcms, 'partners'),
      graphcmsQuery.topNews($graphcms, 3),
      graphcmsQuery.topEvents($graphcms, 5)
    ]);

    return {
      about: dataAbout.values,
      projectAims: dataAims.values,   
      projectInfo: dataInfo.values,
      partners: dataPartners.values,
      topNews,
      topEvents
    };
    
  },

  data: () => {
    return {
      pageTitle: 'About',
      breadcrumb: [
        {
          to: {
            name: 'index'
          },
          label: 'Home'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

  .about{
    @media only screen and (max-width: $viewport-md){    
      flex-direction:column;
      row-gap:2rem;
    }
  }

  .tohu-image{
    padding:0.06rem 6rem;
    justify-content:center;
    img{
      display:block;
      height:28.75rem;
      width:15rem;
      @media only screen and (max-width: $viewport-md){    
        height:14rem;
        width:7.5rem;
      }
    }
  }

  .project{
    &__item{
      width:50%;
    }
    
    @media only screen and (max-width: $viewport-sm){    
      flex-direction:column;
      row-gap:2rem;
      &__item{
        width:100%;
      }
    }
  }

  .num{
    color:$mildBlue;
    font-size:9.38rem;
    line-height:6.88rem;
    opacity: 0.1;
    padding-bottom:2.5rem;
  }

  .nav-button{
    padding-left:0.75rem;
    padding-top:1rem;
  }

</style>
