<template>
  <div class="home-page">
    <div class="content-body">
      <div class="first-containerbox">
        <div class="firstbox">
          <div class="box-title">
            Welcome to the 12 Labours Portal, the gateway to predictive medical modelling
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

      <div class="fourth-containerbox"></div>      

     
    </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'
import PotalHelp from '@/components/PortalHelp.vue'

export default {
  name: 'App',
  components: {
    PotalHelp
  },
  // async asyncData({$graphcms}) {
  //   return await graphcmsQuery.content($graphcms, 'about');
  // },
   async asyncData({$graphcms}) {
    const content= await graphcmsQuery.content($graphcms, 'about');    
    const portalHelp= await graphcmsQuery.portalHelp($graphcms, 'portal_help'); 
    return {content,portalHelp}
  },

  data() {
    return {

    }
    
  }
}
</script>

<style lang="scss">
.content-body {
  height: 2504px;
  @media screen and (max-width: 1440px){
   margin-top: 0;
 }
 background: red;
}
.first-containerbox{
  border: 1px solid lightblue;
  position: relative;
  height: 806px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
  .firstbox{
    margin-top: 205px;
    margin-left: 680px;
    position:absolute;
    width: 710px;
    height: 243px;
    background: #00467F 0% 0% no-repeat padding-box;
    border-radius: 20px;
    opacity: 1;
    .box-title{
      margin: 32px 36px 35px 40px;
      position:absolute;
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

.second-containerbox{
  position: relative;
  height: 668px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
}

.third-containerbox{
  position: relative;
  height: 293px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
  .t-title{
    margin: 40px 448px 220px 449px;
    position: absolute;
    width: 543px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/34px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
  .t-content{
    margin-top: 105px;
    margin-left: 100px;
    position: absolute;
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
    margin-top: 237px;
    margin-left: 982px;
    position: absolute;
    width: 358px;
    height: 16px;
    text-align: right;
    text-decoration: underline;
    font: normal normal 600 14px/24px Arimo;
    letter-spacing: 0px;
    color: #D11241;
    opacity: 1;
  }
}

.fourth-containerbox{
  position: relative;
  height: 737px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
}

</style>
