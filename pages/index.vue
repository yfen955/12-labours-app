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
  height:60rem;
}
  
 .title-box{
    height:15rem;
    width:44.38rem;
    margin-top:12.81rem;
    margin-right:3.75rem;
    border-radius:1.25rem;
    background-color: $blue;
    display:flex;
    align-items:center;
    justify-content:center;
    span{
      font-weight:bold;
      font-size: 2.5rem;
      line-height: 2.75rem;
      color:$cochlear;
    }
  }

 .nav-about{
    padding-top:1rem;
    text-align: right; 
    a{font-weight:600}
 }

</style>
