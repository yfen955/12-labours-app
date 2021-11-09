<template>
  <div class="page-outer">
    <div class="banner-home">
      <div class="title-box">
        <span>
          Welcome to the <br /> 12 Labours Portal, the gateway<br /> to predictive <br />medical modelling
        </span>
      </div>
    </div>
    <portal-help/> 
    <div class="container-default shaded">
      <div class="top-heading">
        <h1>{{content.values.title}}</h1>
      </div>
      <div class="default-inner">
        <div v-html="content.values.content.html"/>
        <div class="nav-about">
          <nuxt-link to="/about/">
            FIND OUT MORE ABOUT THE 12 LABOURS PROJECT
          </nuxt-link>
        </div>
      </div>
    </div>
    <latest-news :news-list="topNews.newsList" hide-bg-color/>
  </div>
</template>

<script>

import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'App',

  async asyncData({$graphcms}) {
    const content= await graphcmsQuery.content($graphcms, 'about');    
    const topNews= await graphcmsQuery.topNews($graphcms, 3);    
    return {content,topNews}
  }
}
</script>

<style scoped lang="scss">

.banner-home{
  display:flex;
  justify-content:flex-end;    
  background-image:url("~static/img/virtual-screen.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  height:960px;
}
  
 .title-box{
    height:243px;
    width:710px;
    margin-top:205px;
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

 .nav-about{
   padding-top:16px;
   text-align: right; 
   a{font-weight:600}
 }

</style>
