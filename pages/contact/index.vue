<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div v-if="!submitSuccess">
      <section-with-image :title="formTitle">
          <p>
            Use the form below to submit your inquiry. 
          </p>
          <p>
            For other topics such as Frequently Asked Questions, Help documentation or Glossary updates, visit our 
            <nuxt-link to="/help">Help</nuxt-link> page. 
          </p>
          <p>
            For feedback on the 12 Labours Portal website please use the <nuxt-link to="/site-feedback">Site Feedback form</nuxt-link>.
          </p>
      </section-with-image> 
      <div class="container-default">
        <div class="top-heading">
          <h1>
            CONTACT US FORM 
          </h1>
        </div>
        <div class="default-inner">
          <el-form label-position="top">
            <h2>Reason:</h2>
            <div class="form-section">
              <el-form-item :required="reason.required" label="Let us know, why you’re contacting us?">
                <el-select class="--lg" v-model="reason.value" placeholder="Please select reason"  @change="selectChange('reason')">
                  <el-option v-for="item in reasonOptions"
                    :key="item.name"
                    :label="item.display"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <h2>Contact Information:</h2>
            <contact-info @field-change="getField"/>
            <h2>Details:</h2>
            <div class="form-section">
              <div v-if="!(reason.value)" class="field1 reason-prompt">
                <i>Please select your reason for contacting us, so we can capture all of the important information.</i>
              </div>
              <div v-if="reason.value">   
                <el-form-item :required="area.required" label="What area would you like to know more information about?">
                  <el-select v-model="area.value" placeholder="Please select an option" @change="selectChange('area')">
                    <el-option v-for="item in areaOptions"
                      :key="item.name"
                      :label="item.display"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :required="detail.required"  
                  label="Tell us details on how we can help provide this information">
                  <div class="multi-detail">
                    <multiline-text
                      :max-length="detail.maxLength" 
                      :min-length="detail.minLength"   
                      placeholder-text="Enter your details"
                      @text-change="multiChange"/>
                  </div>
                  <span class="error">{{detail.message}}</span>
                </el-form-item>          
              </div>
            </div>
            <div class="form-button"> 
              <el-button native-type="submit" :disabled="submitDisabled" @click="onSubmit">
                Contact Us
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="submitSuccess">
      <section-with-image :title="successTitle">
        <p>
          Thank you for contacting us. Our team will aim to get back to you within 5 working days with an update.
        </p>
      </section-with-image>
      <portal-help/>
    </div>
  </div>
</template>


<script>
import graphcmsQuery from '@/services/graphcmsQuery'
export default {
  name: 'ContactPage',

  async asyncData({$graphcms}) {
    const contactReason= await graphcmsQuery.contactReason($graphcms)
    const contactArea= await graphcmsQuery.contactArea($graphcms)
    return {contactReason,contactArea}
  },

  data: () => {
    return {
      pageTitle: 'Contact',
      breadcrumb: [
        {
          to: {name: 'index'},
          label: 'Home'
        }
      ],
      formTitle:'Contact us',
      successTitle:'Thank You',
      reasonOptions: [,],
      areaOptions:[,],
      reason:{
        display:'Reason', value:null, required:true
      },
      contactInfoValues:{title:'',firstName:'',lastName:'',phone:'',email:'',confirmEmail:''},
      area:{
        display:'Area', value:null,required:true
      },
      detail:{
        display:'Detail', value:null,message:'', required:true,minLength:20, maxLength:1500
      },
      invalidFields:['reason','title','firstName','lastName','email','confirmEmail','area','detail'],
      submitDisabled:true,
      submitSuccess:false
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
      let result= this.$validateElement(field,null)
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
    updateSubmit:function(){        
      const invalid=Object.values(this.form).find((obj) => {
	      return obj.message != null
      })
      this.submitDisabled=Boolean(invalid)
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
    this.reasonOptions= this.contactReason.__type.enumValues
    this.reasonOptions.map(e => e.display = e.name.replace(/_/g,' '))  

    this.areaOptions= this.contactArea.__type.enumValues
    this.areaOptions.map(e => e.display = e.name.replace(/_/g,' ')) 
  }
}

</script>

<style scoped lang="scss">

.reason-prompt{
  padding-bottom:1rem;
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
