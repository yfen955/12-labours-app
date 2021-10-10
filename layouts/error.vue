<template>    
  <div class="error-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="page-wrap-container">
        <h4>
          PAGE NOT FOUND
        </h4>
        <div class="sub-container">
          <div class="error-left-subcontainer">
            <div class="error-content">
            <p>
              I am sorry but we cannot find what you have been looking for.
            </p>
            <p>        
              Maybe the page has moved - we suggest visiting the homepage to help you discover what you are looking for.
            </p>
            </div>
            <div class="btn-backhome">
              <NuxtLink to="/"><el-button>VISIT THE HOMEPAGE</el-button></NuxtLink>
            </div>  
          </div>
          <div class="right-container">
            <div class="right-side-image"></div>
          </div>
        </div>
      </div>

        <div class="down-container">
          <div class="p-title">
            HOW CAN THE PORTAL HELP?
          </div>
          <div class="partal-help">
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
  //   backToHome(){
  //     this.$router.push('/');
  //   }
  }
}
</script>

<style lang="scss" scoped>
.page-wrap-container{
  height: 400px;
  background: #F8F8F8 0% 0% no-repeat padding-box;;
  opacity: 1;
  display: flex;
  flex-direction:column;
  h4{
    width: 1320px;
    margin-top: 40px;
    margin-bottom: 0;
    height: 33px;
    align-self: center;
    text-align: center;
    font: normal normal bold 30px/34px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
}

.sub-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  .error-left-subcontainer{
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 86.4%;
    margin-top:32px;
    margin-left: 92px;
    .error-content{
      width: 864px;
      text-align: left;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
      text-align: left;
      font: normal normal normal 18px/24px Arimo;
      p{
      margin: 0 0 1rem !important;
      }
    }
    .btn-backhome{
      align-self: flex-start;
      margin-left: 214px;
      margin-top: 30px;
    }
  }
}

.right-container{
  display: flex;
  flex-direction: column;
  width: 36%;
  .right-side-image{
    border: 1px solid lightblue;
    width: 246px;
    height: 322px;
    }
}


.down-container{
  height: 672px;
  background: #FFFFFF 0% 0% no-repeat padding-box;;
  opacity: 1;
  display: flex;
  flex-direction:column;
  .p-title{
    margin-top:40px;
    width: 543px;
    height: 33px;
    align-self: center;
    text-align: center;
    font: normal normal bold 30px/36px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
}

.partal-help{
  display: flex;
  flex-direction: row;
  justify-content: center;
  .f-box{
    margin-right: 51px;
    margin-top: 32px;
    box-shadow: 0px 2px 5px #00000019;
    border: 1px solid #D1D1D1;
    border-radius: 20px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 346px;
    height: 523px;
    .f-title{
      margin-top: 20px;
      align-self: center;
      width: 218px;
      text-align: center;
      font: normal normal bold 18px/24px Arimo;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
    }
    .f-image{
      width: 189px;
      height: 250px;
      border: 1px solid lightblue;
      margin: 22px 79px 10px 78px;
    }
    .f-info{
      margin-left: 22px;
      width: 302px;
      height: 92px;
      text-align: left;
      font: normal normal normal 18px/24px Arimo;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
    }
    .f-btn{
      margin-left:13px;
      margin-top: 42px;
      width: 320px;
      height: 32px;
      background: #D11241 0% 0% no-repeat padding-box;
      border-radius: 20px;
      opacity: 1;
    }
  }
  .s-box{
    margin-left: 0;
    margin-right: 0;
    @extend .f-box;
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
      margin-top: 20px;
    }
  }
  .t-box{
    @extend .f-box;
    margin-left: 59px;
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
      margin-top: 20px;
    }
  }
 
}

::v-deep .el-button{
            width: 320px;
            font-size: 15px;
        }
</style>