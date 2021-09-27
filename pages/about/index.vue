<template>
  <div class="about-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="first-container">
      <div class="imagebox"></div>
      <div class="first-right-container">  
        <div class ="title">{{ about.title.toUpperCase() }} </div>
        <div class="page-content" v-html="about.content.html"></div>
      </div>
    </div>

    <div class="second-container">
      <div class="left-box">
        <div class ="title1-2">{{ project_aims.title.toUpperCase() }} </div>
        <div class="page-content2" v-for="(content,index) in project_aims.contents" :key="content.index">
          <div class = "multicontent-num">{{ index+1 }}</div> 
          <div class = "content-html" v-html="content.html"></div>
        </div>
      </div>
        <div class="right-box">
          <div class="title2-2">PROJECT INFORMATION</div>
          <div class="right-page-content">
          <el-collapse accordion>
            <el-collapse-item :title="info.title[0].toUpperCase()" name="1">
              <div class="ps-content" v-html="info.content[0].html"></div>
              <div class="btn-fs"><el-button>{{ info.button[0].toUpperCase() }}</el-button></div>
            </el-collapse-item>
            <el-collapse-item :title="info.title[1].toUpperCase()" name="2">
              <div class="is-content" v-html="info.content[1].html"></div>
              <div class="btn-is"><el-button>{{ info.button[1].toUpperCase() }}</el-button></div>
            </el-collapse-item>
            <el-collapse-item :title="info.title[2].toUpperCase()" name="3">
              <div class="phi-content" v-html="info.content[2].html"></div>
              <div class="btn-donate"><el-button>{{ info.button[2].toUpperCase() }}</el-button></div>
            </el-collapse-item>
            <el-collapse-item :title="info.title[3].toUpperCase()" name="4">
              <div class="tos-content" v-html="info.content[3].html"></div>
              <div class="btn-viewmore"><el-button>{{ info.button[3].toUpperCase() }}</el-button></div>
            </el-collapse-item>
            <el-collapse-item :title="info.title[4].toUpperCase()" name="5">
              <div class="pp-content" v-html="info.content[4].html"></div>
              <div class="btn-pp"><el-button>{{ info.button[4].toUpperCase() }}</el-button></div>
            </el-collapse-item>
          </el-collapse>
          </div>
        </div>
      </div>

      <div class="third-container"></div>
      <div class="fourth-container"></div>
      <div class="fifth-container">
        <div class="image-5"></div>
        <div class ="title5">{{ partners.title.toUpperCase() }} </div>
        <div class="page-content5-1" v-html="partners.contents[0].html"></div>
        <div class="page-content5-2" v-html="partners.contents[1].html"></div>
        <div class="page-content5-3" v-html="partners.contents[2].html"></div>
        <div class="page-content5-4" v-html="partners.contents[3].html"></div>
      </div>
    </div>

</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'AboutPage',
  

 

   async asyncData({$graphcms}) {
    const [data1, data2, data3, data4] = await Promise.all([ 
      graphcmsQuery.content($graphcms, 'about_long'),
      graphcmsQuery.multiContent($graphcms, 'project_aims'),
      graphcmsQuery.projectInformation($graphcms, 'info'),
      graphcmsQuery.partnerShips($graphcms, 'partners')

    ]);
    return {
      about: data1.values,
      project_aims: data2.values,   
      info: data3.values,
      partners: data4.values,
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
      ],
    }
  },

  
}
</script>

<style scoped lang="scss">
.about-page{
 height: 2859px;
 @media screen and (max-width: 1440px){
   margin-top: 0;
 }
}


.first-container{
  height: 540px;
  background: #F8F8F8 0% 0% no-repeat padding-box;;
  opacity: 1;
  position: relative;

  .imagebox{
    border: 1px solid lightskyblue;
    width: 241px;
    height: 460px;
    margin-top: 40px;
    margin-left: 155px;
    position: absolute;
  }
  .first-right-container{
    .title{
      position: absolute;
      margin-top: 40px;
      margin-left: 504px;
      margin-bottom: 32px;
      width: 876px;
      height: 33px;
      text-align: center;
      font: normal normal bold 30px/36px Arimo;
      letter-spacing: 0px;
      color: #00467F;
      opacity: 1;
    }
    .page-content{
      position: absolute;
      margin-top: 105px;
      margin-left: 504px;
      width: 864px;
      height: 116px;
      text-align: left;
      font: normal normal normal 18px/24px Arimo;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
          p{
          margin: 0 0 4px !important;
          }
      }
  }

}

.second-container{
  height: 539px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
  position: relative;
  .left-box{
    position:absolute;
    width: 714px;
    height: 539px;
    .title1-2{
    position: absolute;
    margin-top: 41px;
    margin-left: 60px;
    width: 654px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/36px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
    .page-content2{
      .multicontent-num{
    position: absolute;
    margin-top: 74px;
    margin-left: 92px;
    padding-bottom: 20px;
    width: 83px;
    height: 168px;
    text-align: left;
    font: normal normal normal 150px/150px Arimo;
    letter-spacing: 0px;
    color: #0080A7;
    opacity: 0.1;
    }
      .content-html{
      position: relative;
      padding-top: 90px;
      margin-left: 175px;
      width: 507px;
      height: 68px;
      text-align: left;
      font: normal normal normal 18px/24px Arimo;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
      }
    }
  }
}
  .right-box{
    position:absolute;
    width: 687px;
    height: 539px;
    margin-left: 726px;
    .title2-2{
    position: absolute;
    margin-top: 41px;
    margin-left: 0px;
    width: 654px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/36px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
}

::v-deep .el-collapse-item__header{
      display: flex;
      align-items: center;
      height: 20px;
      width: 590px;
      cursor: pointer;
      border-bottom: 2px solid #D1D1D1;
      transition: border-bottom-color .3s;
      margin-top: 16px;
      padding-bottom: 16px;
      font: normal normal 600 18px/24px Arimo;
      letter-spacing: 0px;
      color: #00467F;
      opacity: 1;
    }

::v-deep .el-collapse-item__content{
    padding-bottom: 25px;
    font-size: 13px;
    color: #303133;
    line-height: 30px;
}

::v-deep .el-collapse{
  margin-top:106px;
  margin-left: 32px;
  border-top: 2px solid #D1D1D1;
  width: 590px;
}

::v-deep .el-collapse-item__arrow{
  font-weight: 800;
  width: 10px;
  height: 20px;
  transform: rotate(0deg) scale(1.5);
  margin: 0 20px 0 auto;
}
::v-deep .el-collapse-item__arrow.is-active {
    transform: rotate(90deg) scale(1.5);
}
::v-deep .el-collapse-item__wrap {
    background-color:#F8F8F8;
    border-bottom: 2px solid #D1D1D1;
}

::v-deep .el-collapse-item__content{
  padding-bottom: 0px;
}
.phi-content{
  margin-top: 12px;
  margin-bottom: 16px;
  margin-left: 16px;
  width: 562px;
  height: 44px;
  text-align: left;
  font: normal normal normal 18px/24px Arimo;
  letter-spacing: 0px;
  color: #262626;
  opacity: 1;
}

.btn-donate{
   margin: 16px auto 16px 28px;
}

.tos-content{
  @extend.phi-content;
  width: 562px;
  height: 140px;
  margin: 12px 12px 12px 16px;
}

.btn-viewmore{
  margin: 12px auto 12px 28px;
}

.ps-content{
  @extend.phi-content;
}
.btn-fs{
  margin: 16px;
}
.is-content{
   @extend.phi-content;
}
.btn-is{
  margin: 16px;
}
.pp-content{
  @extend.phi-content;
}
.btn-pp{
  margin: 16px;
}

.third-container{
  height: 730px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
  position: relative;
}
.fourth-container{
  height: 559px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
  position: relative;
}
.fifth-container{
  height: 451px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
  position: relative;

  .image-5{
    border: 1px solid lightskyblue;
    width: 246px;
    height: 322px;
    margin-top: 89px;
    margin-left: 1080px;
    position: absolute;
  }

  .title5{
    position: absolute;
    margin-top: 40px;
    margin-left: 60px;
    width: 1320px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/34px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
  .page-content5-1{
    margin-top: 105px;
    margin-left: 92px;
    width: 895px;
    height: 20px;
    text-align: left;
    font: normal normal 600 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
    position: absolute;
  }
  .page-content5-2{
    margin-top: 133px;
    margin-left: 105px;
    width: 895px;
    height: 116px;
    text-align: left;
    font: normal normal normal 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    position: absolute;
    opacity: 1;
     
  }

  .page-content5-3{
    margin-top: 273px;
    margin-left: 92px;
    width: 895px;
    height: 20px;
    text-align: left;
    font: normal normal 600 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
    position: absolute;
  }
  .page-content5-4{
    margin-top: 301px;
    margin-left: 92px;
    width: 895px;
    height: 68px;
    text-align: left;
    font: normal normal normal 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
    position: absolute;
  }
  
}
</style>
