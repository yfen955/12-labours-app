<template>
  <div class="contact-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
        <div class="upper-container">
           <div class="contact-title">CONTACT US</div>
           <div class="upper-content">
              <p>Use the form below to submit your inquiry.</p>
              <p>For other topics such as Frequently Asked Questions, Help documentation or Glossary updates,
               visit our <nuxt-link to="/help">Help</nuxt-link> page.
              </p>
              <p>
               For feedback on the 12 labours Portal website please use the 
               <nuxt-link to="/siteFeedback">Site Feedback</nuxt-link> form.
              </p>
           </div>
           <div class="image"></div>
        </div>

        <div class="below-container">
          <div class="form-title">CONTACT US FORM</div>
          <div class="subtitle1">Reason:</div>
          <div class="reasonForm">
              <h2>Let us know why you’re contacting us <span style="color:#D11241">*</span></h2>
              <!-- <el-form
                v-model="isFormValid"
              > -->
                <el-select 
                  v-model="value"
                  placeholder="Please select reason"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              <!-- </el-form> -->
          </div>
          <div class="subtitle2">Contact Information:</div>
            <contact-form></contact-form>
          <div class="subtitle3">Details:</div>
            <contact-detail></contact-detail>
        </div>
        <div class="btn-c"><el-button :disabled="isFormValid">CONTACT US</el-button></div>
    </div>

</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery';
import ContactForm from "@/components/ContactUsForm/ContactForm.vue";
import ContactDetail from '@/components/ContactUsForm/ContactDetail.vue';

export default {
  name: 'ContactPage',
  components: {
    ContactForm,
    ContactDetail

  },
  // async asyncData({$graphcms}) {
  //   return await graphcmsQuery.content($graphcms, 'about_long');
  // },

  data: () => {
    return {
      pageTitle: 'CONTACT',
      breadcrumb: [
        {
          to: {
            name: 'index'
          },
          label: 'HOME'
        }
      ],
       options: [{
          value: 'option1',
          label: 'Want to know more information'
        }, {
          value: 'option2',
          label: 'aaa'
        }, {
          value: 'option3',
          label: 'bbb'
        }, {
          value: 'option4',
          label: 'ccc'
        }],
        value: '',
        isFormValid: true,
    }
  },
  mounted(){
    let obtain = this.value;
    if(obtain == null){
      this.isFormValid=true;
    }else{
      this.isFormValid=false;
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.contact-page{
  // height: 1564px;
  height: 2000px;
 @media screen and (max-width: 1440px){
   margin-top: 0;
 }
 background: rgb(128, 218, 240);
}

.upper-container{
  position: relative;
  height: 400px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
  .contact-title{
    position: absolute;
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
  .upper-content{
    position: absolute;
    margin-top: 105px;
    margin-left: 92px;
    width: 864px;
    height: 140px;
    text-align: left;
    font: normal normal normal 18px/24px Arimo;
    letter-spacing: 0px;
    opacity: 1;
    a{
      text-align: left;
      font: normal normal normal 18px/24px Arimo;
      letter-spacing: 0px;
      color: #D11241;
    }
  }
  .image{
    position: absolute;
    margin-top: 56px;
    margin-left: 1070px;
    width: 246px;
    height: 322px;
    opacity: 1;
    border: 1px solid lightblue;
  }
}

.below-container{
  position: relative;
  height: 1124px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
  .form-title{
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
  .subtitle1{
    position: absolute;
    margin-top: 105px;
    margin-left: 92px;
    width: 1255px;
    height: 20px;
    text-align: left;
    font: normal normal bold 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
  }
  .subtitle2{
    @extend .subtitle1;
    margin-top: 281px;
  }
  .subtitle3{
    @extend .subtitle1;
    margin-top: 917px;
  }
}

.btn-c{
  margin-top: 200px;
  margin-left: 132px;
}

.reasonForm{
  position: absolute;
  margin-top: 141px;
  margin-left: 108px;
  width: 1256px;
  height: 116px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
}

h2{
  text-align: left;
  font: normal normal 600 18px/24px Arimo;
  letter-spacing: 0px;
  opacity: 1;
  margin-top: 24px;
  margin-left:24px;
  color: #262626;
}

// .el-input{
//   width: 600px;
//   height: 40px;
//   border-radius: 10px;
//   opacity: 1;
  
// }

::v-deep .el-select .el-input .el-select__caret:before{
  width: 20px;
  height: 10px;
}

 ::v-deep .el-input--suffix .el-input__inner {
    width: 600px;
    
    
}
::v-deep .el-input__inner{
  margin: 0px;
  padding: 0 20px;
}

::v-deep .el-select{
  margin-left: 24px;
  
}
</style>
