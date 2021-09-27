<template>
  <div class="error-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="page-wrap-container">
      <div class="subpage">
        <div class="upper-container">
          <h4>
            PAGE NOT FOUND
          </h4>
          <div class="error-content">
            <p>
              I am sorry but we cannot find what you have been looking for.
            </p>
            <p>        
              Maybe the page has moved - we suggest visiting the homepage to help you discover what you are looking for.
            </p>
          </div>
          <div class="right-side-image"></div>
          <div class="btn-backhome">
           <el-button @click="backToHome()">VISIT THE HOMEPAGE</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="down-container">
      <!-- <portal-help :multiContent="portalHelp.values"></portal-help> -->
      <div class="partal-help">
    <div class="p-title">
       HOW CAN THE PORTAL HELP?
    </div>
    <div class="f-box">
        <div class="f-title" >
          RESEARCHERS
        </div>
        <div class="f-image"></div>
        <div class="f-info">Want access to the latest data, 
                or share your research with others? 
                Then the 12 Labours Portal is the place to be.</div>
        <div class="f-btn"> <el-button>FIND RESEARCH DATA</el-button></div>
    </div>

    <div class="s-box">
        <div class="s-title">CLINICIANS</div>
        <div class="s-image"></div>
        <div class="s-info">The 12 Labours Portal allows you to access and upload data 
                to visualise results that may aid prognosis and help you to develop your treatment plans.</div>
        <div class="s-btn"> <el-button>LEARN ABOUT WORKFLOWS</el-button></div>
    </div>

    <div class="t-box">
        <div class="t-title">PATIENTS</div>
        <div class="t-image"></div>
        <div class="t-info">Want to track your health status or set personal health improvement goals? 
                The portal allows you to link your health records with your health devices.</div>
        <div class="t-btn"> <el-button>LEARN ABOUT HEALTH TRACKING</el-button></div>
    </div>
</div>
    </div>
  </div>
</template>

<script>
// import graphcmsQuery from '@/services/graphcmsQuery'
// import PotalHelp from '@/components/PortalHelp.vue'

export default {
  name: 'ErrorPage',
  // components: {
  //   PotalHelp
  // },

//  async asyncData({$graphcms}) {
//     const portalHelp= await graphcmsQuery.portalHelp($graphcms, 'portal_help'); 
//     return portalHelp
//   },

  data: () => {
    return {
      pageTitle: 'PAGE NOT FOUND',
      breadcrumb: [
        {
          to: {
            name: 'index'
          },
          label: 'HOME'
        }
      ],
    }
  },
  methods:{
    backToHome(){
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page{
height: 1111px;
 @media screen and (min-width: 1440px){
   margin-top: 0;
 }
}
.page-wrap-container{
  position: relative;
  height: 400px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
  .upper-container{
    h4{
    position:absolute;
    margin-top: 40px;
    margin-left: 60px;
    width: 1320px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/36px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
   }
   .error-content{
    position: absolute;
    margin-top: 105px;
    margin-left: 92px;
    width: 864px;
    height: 92px;
    text-align: left;
    font: normal normal normal 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
   }
 }
  
}
.btn-backhome{
  position:absolute;
  margin-top: 227px;
  margin-left: 92px;
}
.right-side-image{
  border: 1px solid blue;
  width: 246px;
  height: 322px;
  margin-top: 56px;
  margin-left: 1070px;
  position: absolute;
  opacity: 1;
}

.down-container{
  height: 672px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
  .partal-help{
    position: relative;
    .p-title{
        position: absolute;
        margin: 40px 448px 32px 449px;
        width: 543px;
        height: 33px;
        text-align: center;
        font: normal normal bold 30px/36px Arimo;
        letter-spacing: 0px;
        color: #00467F;
        opacity: 1;
        // display: flex;
    }
    .f-box{
        position: absolute;
        margin-top: 105px;
        margin-left: 146px;
        width: 346px;
        height: 523px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 2px 5px #00000019;
        border: 1px solid #D1D1D1;
        border-radius: 20px;
        opacity: 1;
        .f-title{
            margin-top: 20px;
            margin-left: 64px;
            width: 218px;
            height: 20px;
            text-align: center;
            font: normal normal bold 18px/24px Arimo;
            letter-spacing: 0px;
            color: #262626;
            opacity: 1;
            position: absolute;
        }
        .f-image{
            width: 189px;
            height: 250px;
            border: 1px solid lightblue;
            margin: 62px 79px 219px 78px;
            position: absolute;
        }
        .f-info{
            position: absolute;
            margin: 322px 22px 108px 22px;
            width: 302px;
            height: 92px;
            text-align: left;
            font: normal normal normal 18px/24px Arimo;
            letter-spacing: 0px;
            color: #262626;
            opacity: 1;
        }
        .f-btn{
            margin: 459px 13px 32px 13px;
            width: 320px;
            height: 32px;
            background: #D11241 0% 0% no-repeat padding-box;
            border-radius: 20px;
            opacity: 1;
            position: absolute;
        }
    }

    .s-box{
        @extend .f-box;
        margin-left: 543px;
        .s-title{
            @extend .f-title;
        }
        .s-image{
            @extend .f-image;
        }
        .s-info{
            @extend .f-info;
            height: 116px;
        }
        .s-btn{
            @extend .f-btn;
        }
    }

    .t-box{
        @extend .f-box;
        margin-left: 948px;
        .t-title{
            @extend .f-title;
        }
        .t-image{
            @extend .f-image;
        }
        .t-info{
            @extend .f-info;
            height: 116px;
        }
        .t-btn{
            @extend .f-btn;
        }
        
    }
}

}
::v-deep .el-button{
            width: 320px;
            font-size: 15px;
        }
</style>