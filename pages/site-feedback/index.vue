<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div v-if="!submitSuccess">
      <section-with-image  :title="pageTitle">
        <p>Use the form below to submit your feedback.</p>
        <p>Site feedback includes: Reporting bug, missing information, incorrect information or feature requests. </p>
        <p>For all other queries about the 12 Labours Portal please use the <nuxt-link to="/contact">Contact us</nuxt-link> form.</p>
      </section-with-image>
      <div class="container-default">
        <div class="top-heading">
          <h1>
            SITE FEEDBACK FORM {{from}}
          </h1>
        </div>
        <div class="default-inner">
          <el-form label-position="top">
            <h2>
              Reason:
            </h2>
            <div class="form-section">
              <el-form-item :required="reason.required" label="Let us know, why you’re submitting feedback?">
                <el-select class="--lg" v-model="reason.value" placeholder="Please select reason" @change="selectChange('reason')">
                  <el-option v-for="item in reasonOptions"
                    :key="item.name"
                    :label="item.display"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <h2>
              Contact Information:
            </h2>
            <contact-info @field-change="getField"/>
            <h2>
              Details:
            </h2>
            <div class="form-section">
              <div v-if="!(reason.value)" class="field1 reason-prompt">
                <i>Please select your reason for submitting feedback, so we can capture all of the important information.</i>
              </div>
              <div v-if="reason.value"> 
                <el-form-item :required="detail.required"  label="What are you submitting feedback on?">
                  <el-radio-group v-model="feedbackOn">
                    <el-radio label="lastPage">
                      Last page visited - 
                        <!--<nuxt-link target="_blank" :to="lastVisitedPage" :event="triggerEvent">
                          {{linkLabel}}
                        </nuxt-link> -->
                        <a @click="$router.go(-1)">Visit Again</a>         
                    </el-radio><br/>
                    <el-radio label="general">
                      General feedback
                    </el-radio>
                  </el-radio-group>
                </el-form-item> 
                <el-form-item :required="detail.required"  label="Tell us what information was incorrect and how we can improve it.">
                  <div class="multi-detail">
                    <multiline-text
                      :max-length="detail.maxLength" 
                      :min-length="detail.minLength" 
                      placeholder-text="Enter your details"
                      @text-change="multiChange"/>
                  </div>
                  <div class="error">{{detail.message}}</div>
                </el-form-item>          
              </div>
            </div>
            <div class="form-button"> 
              <el-button native-type="submit" :disabled="submitDisabled" @click="onSubmit">
                Submit Feedback
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="submitSuccess">
      <section-with-image :title="successTitle">
        <p>Thank you for submitting feedback. Our team will aim to get back to you within 5 working days with an update.</p>
        <p>What would you like to do now?</p>
        <div class="spacer">
          <nuxt-link to="/">
            <el-button>Visit the Home Page</el-button>
          </nuxt-link>
          <!--
          <nuxt-link :to="lastVisitedPage">
            <el-button>Return to Previous Page</el-button>
          </nuxt-link>-->
          <a @click="$router.go(-1)">
            <el-button>Return to Previous Page</el-button>
          </a>   
        </div>
      </section-with-image>
      <portal-help/>
    </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'
export default {
  name: 'FeedbackPage',

  async asyncData({$graphcms}) {
    const feedbackReason= await graphcmsQuery.feedbackReason($graphcms)
    return {feedbackReason}
  },

  data: () => {
    return {
      pageTitle: 'Site Feedback',
      successTitle:'Thank You',
      breadcrumb: [
        {
          to: {name: 'index'},
          label: 'Home'
        }
      ],
      reasonOptions: [,],
      reason:{
        display:'Reason', value:null, required:true
      },
      contactInfoValues:{title:'',firstName:'',lastName:'',phone:'',email:'',confirmEmail:''},
      feedbackOn: 'general',
      detail:{
        display:'Detail', value:null,message:'', required:true, minLength:20, maxLength:2500
      },
      invalidFields:['reason','title','firstName','lastName','email','confirmEmail','detail'],
      submitDisabled:true,
      submitSuccess:false,
    }
  },

  methods: {
    getField:function({fieldName, fieldValue,invalid}){
      this.contactInfoValues[fieldName]=fieldValue
      this.updateValidity(fieldName,invalid)
    },
    selectChange:function(fieldName){
      this.updateValidity(fieldName,false)
    },
    multiChange:function(input){
      let field=this['detail']
      field.value=input     
      let result=this.$validateElement(field,null)
      field.message=result.strMessage
      this.updateValidity('detail',Boolean(field.message))
    },
    updateValidity:function(fieldName,invalid){
      const fieldIndex=this.invalidFields.indexOf(fieldName)
      if(invalid){
        if(fieldIndex==-1)
          this.invalidFields.push(fieldName)
      }
      else{
        if(fieldIndex>-1)
          this.invalidFields.splice(fieldIndex, 1)
      }
    },
    onSubmit:function(){
      /*TBD: Code to submit form values */
      this.submitSuccess=true;
    }
  },

  watch:{
    invalidFields: {
      handler: function(val) {
        this.submitDisabled=val.length>0
      }
    }
  },

  created(){
    this.reasonOptions= this.feedbackReason.__type.enumValues
    this.reasonOptions.map(e => e.display = e.name.replace(/_/g,' '))  

    const lastRoute=this.$nuxt.context.from
    if(lastRoute)
    {
      this.lastVisitedPage=lastRoute.fullPath
      this.linkLabel=this.lastVisitedPage
      this.triggerEvent="click"
    }
    else{
      this.linkLabel="Not found"
      this.lastVisitedPage="/"
      this.triggerEvent=""
    }    
  }
}
</script>

<style scoped lang="scss">

.reason-prompt{
  padding-bottom:1rem;
}

.spacer{
  display:flex;
  flex-wrap:wrap;
  column-gap:40px;
  row-gap:20px;
}

.form-button{
  padding:1.5rem 0.5rem 1rem 1.5rem;
  @media only screen and (max-width:  $viewport-sm) {
    padding:0;
    .el-button{
      padding:0.375rem 1rem;
    }
  }
}

</style>