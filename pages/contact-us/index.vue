<template>
  <div class="contact-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
       <template v-if="!isSubmitted">
        <div class="upper-container">
          <div class="contact-title">CONTACT US</div>
          <div class="upper-sub-container">
            <div class="left">
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
             </div>
             <div class="right">
              <div class="image"></div>
             </div>
            </div>
           </div>         


        <div class="below-container">
          <div class="form-title">CONTACT US FORM</div>
          <div class="down-sub-container">
            <div class="sub-container-1">
              <div class="subtitle1">Reason:</div>
              <div class="reasonForm">
                <h2>Let us know why you’re contacting us <span style="color:#D11241">*</span></h2>
                <div class="selecOptions">
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
                </div>
              </div>
            </div>
            
            <div class="sub-container-2">
              <div class="subtitle2">Contact Information:</div>
              <div class="contactForm">
                <contact-form :get-value.sync="formValue"></contact-form>
              </div>
            </div>
            
            <div class="sub-container-3">
              <div class="subtitle3">Details: </div>
              <div class="text" v-if="this.value==''">
                <p>Please select your reason for contacting us so we can capture all of the important information.</p>
              </div>
              <div class="detailForm"> 
                <contact-detail v-if="this.value!=''" :detail-value.sync="contactDetailValue"></contact-detail>
              </div>
              <div class="btn-container">
                <div class="btn-c" @click="isSubmitted = true">
                  <el-button v-if="this.value==''||this.formValue==''||this.contactDetailValue==''" disabled >CONTACT US</el-button>
                  <el-button v-else>CONTACT US</el-button>
                </div>
              </div>
            </div>
            
            
          </div>
          
        </div>
      </template>
      <div v-if="isSubmitted">
        <div class="submitted-success" >
          <h4>
            THANK YOU
          </h4>
          <div class="success-sub-container">
            <div class="left-subcontainer">
              <div class="success-content">
                <p>
                  Thank you for contacting us. 
                  Our team will aim to get back to you within 5 working days with an update.
                </p>
              </div>
            </div>
            <div class="right-subcontainer">
              <div class="right-image"></div>
            </div>
          </div>
        </div>
        <div>
          <portal-help :multiContent="portalHelp.values"></portal-help>
        </div>
      </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'
import ContactForm from "@/components/ContactUsForm/ContactForm.vue";
import ContactDetail from '@/components/ContactUsForm/ContactDetail.vue';
import PortalHelp from '@/components/PortalHelp/PortalHelp.vue'
export default {
  name: 'ContactPage',
  components: {
    ContactForm,
    ContactDetail,
    PortalHelp

  },
   async asyncData({$graphcms}) {
    const portalHelp= await graphcmsQuery.portalHelp($graphcms, 'portal_help');
    return {portalHelp}
  },

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
        formValue: '',
        contactDetailValue: '',
        isSubmitted: false
    }
  },

  methods: {
    	getValue(val){
	      	this.formValue=val;
	      	
	    },
      detailValue(val){
        this.contactDetailValue=val;
      }
      
  }
}
</script>

<style lang="scss" scoped>
.submitted-success{
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
.success-sub-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  .left-subcontainer{
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top:32px;
    margin-left: 92px;
    .success-content{
      align-self: center;
      width: 864px;
      text-align: left;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
      text-align: left;
      font: normal normal normal 18px/24px Arimo;
    }
  }
}
.right-subcontainer{
  display: flex;
  flex-direction: column;
  margin-left: 114px;
  .right-image{
    border: 1px solid lightblue;
    width: 246px;
    height: 322px;

  }
}
.upper-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  height: 400px;
  .contact-title{
    align-self: center;
    margin-top: 40px;
    width: 1320px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/34px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
}
.upper-sub-container{
  display: flex;
  flex-direction: row;
}
.left{
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 86.4%;
  margin-top:32px;
  justify-content: flex-start;

}
  .upper-content{
    width: 864px;
    height: 140px;
    text-align: left;
    font: normal normal normal 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
    p{
      margin: 0 0 1rem !important;
    }
    a{
      text-align: left;
      font: normal normal normal 18px/24px Arimo;
      letter-spacing: 0px;
      color: #D11241;
    }
  }

  .right{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 36%;
    .image{
      border: 1px solid lightblue;
      width: 246px;
      height: 322px;
    }
  }

.below-container{
  display: flex;
  flex-direction: column;
  .form-title{
    align-self: center;
    margin-top: 40px;
    width: 1320px;
    height: 33px;
    text-align: center;
    font: normal normal bold 30px/34px Arimo;
    letter-spacing: 0px;
    color: #00467F;
    opacity: 1;
  }
}

.down-sub-container{
  display: flex;
  flex-direction: column;
  align-items:center;
  .sub-container-1{
    width: 1256px;
    height: 184px;
  }
  .subtitle1{
    margin-top: 32px;
    width: 1255px;
    height: 20px;
    text-align: left;
    font: normal normal bold 18px/24px Arimo;
    letter-spacing: 0px;
    color: #262626;
    opacity: 1;
  }
  .reasonForm{
    width: 1256px;
    height: 116px;
    background: #F8F8F8 0% 0% no-repeat padding-box;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 16px;
    margin-top:16px;
    
    h2{
      text-align: left;
      font: normal normal 600 18px/24px Arimo;
      letter-spacing: 0px;
      opacity: 1;
      margin-top: 24px;
      margin-left:24px;
      color: #262626;
      margin-bottom: 8px;
    }
    .selecOptions{
      align-self: flex-start;
      margin-left:24px;
    }
  }

  .sub-container-2{
    width: 1256px;
    .subtitle2{
      margin-top:24px;
      width: 1255px;
      height: 20px;
      text-align: left;
      font: normal normal bold 18px/24px Arimo;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
    }
    .contactForm{
      background: #F8F8F8 0% 0% no-repeat padding-box;
      opacity: 1;
      margin-left: 10px;
      margin-top: 16px;
    }
  }

  .sub-container-3{
    width: 1256px;
    .subtitle3{
      margin-top:24px;
      width: 1255px;
      height: 20px;
      text-align: left;
      font: normal normal bold 18px/24px Arimo;
      letter-spacing: 0px;
      color: #262626;
      opacity: 1;
    }
    .text{
      margin-top: 16px;
      margin-left:16px;
      width: 1256px;
      height: 65px;
      background: #F8F8F8 0% 0% no-repeat padding-box;
      opacity: 1;
      p{
        text-align: left;
        font: italic normal normal 16px/20px Arimo;
        letter-spacing: 0px;
        color: #262626;
        opacity: 1;
        padding-top: 24px;
        padding-left: 24px;
      }
    }
  }
  
}
.btn-container{
  
    width: 180px;
    height: 32px;
    margin-top: 35px;
    margin-left: 40px;
    margin-bottom: 39px;
  }

::v-deep .el-button[disabled], .el-button[disabled]:hover{
  width: 180px;
  height: 32px;
  background: #D1D1D159 0% 0% no-repeat padding-box;
  border-radius: 20px;
  opacity: 1;
}
::v-deep .el-button:focus, .el-button[disabled], .el-button[disabled]:focus, .el-button[disabled]:hover{
  text-align: center;
  font: normal normal 600 18px/24px Arimo;
  letter-spacing: 0px;
  color: #D1D1D1;
  opacity: 1;
  padding: 6px 32px;
}


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
.down-sub-container .reasonForm .selecOptions{
    align-self: flex-start;
    margin-left: 0px;
}

::v-deep .el-form-item__error{
  margin-left:24px;
  font: normal normal normal 14px/24px Arimo;
  letter-spacing: 0px;
  color: #D11241;
  opacity: 1;
}

::v-deep .el-form-item.is-error .el-input__inner{
  border: 1px solid #D11241;
}
</style>
