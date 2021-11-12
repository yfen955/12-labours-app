<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <!-- About 12 Labours -->
    <div class="container-default shaded flex-box">
      <div class="tohu-image"">
        <img src="~/static/img/tohu.png">
      </div>
      <div class="vertical-flex">
        <h1 class="top-heading">
          {{about.title.toUpperCase() }}
        </h1>
        <div v-html="about.content.html"/>
      </div>
    </div>
    <!-- Project Aims & Information -->
    <div class="container-default flex-box">
      <div class="project-aims default-inner">
        <h1 class="top-heading">
          {{projectAims.title.toUpperCase()}}
        </h1>
        <div class="flex-box"  v-for="(content,index) in projectAims.contents" :key="index">
          <div class="project-aims__num vertical-flex">{{ index+1 }}</div> 
          <div v-html="content.html"></div>
        </div>
      </div>
      <div class="project-information default-inner ">
        <h1 class="top-heading">
          PROJECT INFORMATION
        </h1>
       <el-collapse accordion  v-for="(item,index) in projectInfo.title"  :key="index">
          <el-collapse-item :title="item.toUpperCase()" :name="index">
            <div v-html="projectInfo.content[index].html"></div>
            <div class="nav-button">
              <nuxt-link :to="projectInfo.link[index]">
                <el-button>
                  {{projectInfo.linkCaption[index].toUpperCase()}}
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
    <section-with-image
      :title="partners.title"
      :contents="partners.contents"/>
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
      pageTitle: 'ABOUT',
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

<style scoped lang="scss">

  .tohu-image{
    padding:0.06rem 6rem;

    img{
      display:block;
      height:28.75rem;
      width:15rem;
    }
  }

  .project-aims{
    width:50%;

    &__num{
      color:$mildBlue;
      font-size:9.38rem;
      line-height:6.88rem;
      opacity: 0.1;
      padding-bottom:2.5rem;
    }
  }

  .project-information{
    width:50%;
  }

  .nav-button{
    padding-left:0.75rem;
    padding-top:1rem;
  }

</style>
