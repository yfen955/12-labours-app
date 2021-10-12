<template>
    <div class="container">
        <div class="p-title">
            {{ multiContent.title.toUpperCase() }}
        </div>
        <div class="partal-help">
            <div class="f-box">
                <div class="f-title" v-html="multiContent.contents[0].html"></div>
                <div class="f-image"></div>
                <div class="f-info" v-html="multiContent.contents[1].html"></div>
                <div class="f-btn"> <el-button>FIND RESEARCH DATA</el-button></div>
            </div>
            <div class="s-box">
                <div class="s-title" v-html="multiContent.contents[2].html"></div>
                <div class="s-image"></div>
                <div class="s-info" v-html="multiContent.contents[3].html"></div>
                <div class="s-btn"> <el-button>LEARN ABOUT WORKFLOWS</el-button></div>
            </div>
            <div class="t-box">
                <div class="t-title" v-html="multiContent.contents[4].html"></div>
                <div class="t-image"></div>
                <div class="t-info" v-html="multiContent.contents[5].html"></div>
                <div class="t-btn"> <el-button>LEARN ABOUT HEALTH TRACKING</el-button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PotalHelp',

    props: {
        multiContent: {
            type: Object,
            default: () => {}
            }
  },

}
</script>

<style lang="scss" scoped>
.container{
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
</style>>
