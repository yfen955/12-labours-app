<template>
  <div class="home-page">
    <div class="content-body">
      <div class="first-containerbox">
        <div class="firstbox">
          <div class="box-title">
            Welcome to the <br /> 12 Labours Portal, the gateway to predictive <br />medical modelling
          </div>
        </div>
      </div>

      <div class="second-containerbox">
        <portal-help :multiContent="portalHelp.values"></portal-help>
      </div>
      
      <div class="third-containerbox">
        <div class="t-title">
          {{ content.values.title}}
        </div>
        <div class="t-content" v-html="content.values.content.html" />
        <div class="hyperlink">
          <a href="" target="_blank">
            FIND OUT MORE ABOUT THE 12 LABOURS PROJECT
          </a>
        </div>
      </div>
      <div class="fourth-containerbox">
        <latest-news :newsList="topNews.newsList"/>
     </div>      
       
    </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'
import PotalHelp from '@/components/PortalHelp/PortalHelp.vue'
// import LatestNews from '@/components/LatestNews.vue'

export default {
  name: 'App',
  components: {
    PotalHelp,
    // LatestNews
  },
   async asyncData({$graphcms}) {
    const content= await graphcmsQuery.content($graphcms, 'about');    
    const portalHelp= await graphcmsQuery.portalHelp($graphcms, 'portal_help'); 
    const topNews= await graphcmsQuery.topNews($graphcms, 3);    
    return {content,portalHelp,topNews}
  },

  data() {
    return {

    }
    
  }
}
</script>

<style lang="scss">

.first-containerbox{
  display: flex;
  flex-direction: row;
  height: 806px;
  justify-content:flex-end;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  .firstbox{
    margin-top:205px;
    margin-right:13.6%;
    width: 710px;
    height: 243px;
    background: #00467F 0% 0% no-repeat padding-box;
    border-radius: 20px;
    opacity: 1;
    .box-title{
      margin: 32px 36px 35px 40px;
      align-self: center;
      width: 634px;
      height: 176px;
      text-align: left;
      font: normal normal bold 40px/44px Arimo;
      letter-spacing: 0px;
      color: #FFFFFF;
      opacity: 1;
    }
  }
}

.third-containerbox{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  height: 293px;
  .t-title{
    align-self: center;
    margin-top: 40px;
    width: 543px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/34px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
  .t-content{
    align-self: center;
    margin-top:32px;
    width: 1240px;
    height: 116px;
    text-align: left;
    font: normal normal normal 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
      p{
      margin: 0 0 1rem !important;
    }
  }
  .hyperlink{
    margin-top: 16px;
    margin-bottom: 40px;
    width: 1240px;
    height: 16px;
    text-align: right;
    text-decoration: underline;
    font: normal normal 600 14px/24px Arimo;
    letter-spacing: 0px;
    color: #D11241;
    opacity: 1;
    }
}
// .fourth-containerbox{
//   background: red 0% 0% no-repeat padding-box !important;
//   opacity: 1;
// }


      

</style>
