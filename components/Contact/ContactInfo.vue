<template>
  <div :class="showBg?'form-section':''"> 
    <el-form-item v-if="title.visible" :required="title.required" :label="title.display">
      <el-select class="--sm" v-model="title.value" :placeholder="title.placeholder" @change="selectChange('title')">
        <el-option label="Dr" value="Dr"></el-option>
        <el-option label="Mr" value="Mr"></el-option>
        <el-option label="Miss" value="Miss"></el-option>
        <el-option label="Mrs" value="Mrs"></el-option>
        <el-option label="Ms" value="Ms"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="firstName.visible" :required="firstName.required" :label="firstName.display">
      <el-input v-model="firstName.value" @blur="fieldChange('firstName')" :maxlength="firstName.maxLength" :placeholder="firstName.placeholder" :disabled="firstName.disabled"></el-input>
      <div class="error">{{firstName.message}}</div>
    </el-form-item>
    <el-form-item v-if="lastName.visible" :required="lastName.required" :label="lastName.display">
      <el-input v-model="lastName.value" @blur="fieldChange('lastName')" :maxlength="lastName.maxLength" :placeholder="lastName.placeholder" :disabled="lastName.disabled"></el-input>
      <div class="error">{{lastName.message}}</div>
    </el-form-item>
    <el-form-item v-if="phone.visible" :required="phone.required" :label="phone.display">
      <el-input v-model="phone.value" @blur="fieldChange('phone')" :maxlength="phone.maxLength" :placeholder="phone.placeholder" :disabled="phone.disabled"></el-input>
      <div class="error">{{phone.message}}</div>
    </el-form-item>
    <el-form-item v-if="email.visible" :required="email.required" :label="email.display">
      <el-input v-model="email.value" @blur="fieldChange('email')" :maxlength="email.maxLength" :placeholder="email.placeholder" :disabled="email.disabled"></el-input>
      <div class="error">{{email.message}}</div>
    </el-form-item> 
    <el-form-item v-if="confirmEmail.visible" :required="confirmEmail.required" :label="confirmEmail.display">
      <el-input v-model="confirmEmail.value" @blur="fieldChange('confirmEmail')" :maxlength="confirmEmail.maxLength" :placeholder="confirmEmail.placeholder" :disabled="confirmEmail.disabled"></el-input>
      <div class="error">{{confirmEmail.message}}</div>
    </el-form-item>
  </div>
</template>

<script>

export default {
  name: 'ContactInformation',

  data: () => {
     return {
      title: {
        display:'Title', value:null,required:true,placeholder:'Select title',visible:true,disabled:false
      },
      firstName:{
        display:'First Name', value:null,message:'',required:true,maxLength:150,placeholder:'Enter your first name',visible:true,disabled:false
      },
      lastName:{
        display:'Last Name', value:null,message:'',required:true,maxLength:150,placeholder:'Enter your last name',visible:true,disabled:false
      },
      phone:{
        display:'Phone', value:null,message:'',format:'phone',maxLength:50,placeholder:'Enter your phone',visible:true,disabled:false
      },
      email:{
        display:'Email', value:null,message:'',required:true,format:'email',match:'confirmEmail',minLength:10,maxLength:255,placeholder:'Enter your email address',visible:true,disabled:false
      },
      confirmEmail:{
        display:'Confirm Email', value:null,message:'',required:true,format:'email',match:'email',minLength:10,maxLength:255,placeholder:'Please confirm your email address',visible:true,disabled:false
      }
    }
  },

  props:{
    showBg:{
      type:Boolean,
      default:true
    },
    titleData:{
      type: Object,
      default: () => {}
    },
    firstNameData:{
      type: Object,
      default: () => {}
    },
    lastNameData:{
      type: Object,
      default: () => {}
    },
    phoneData:{
      type: Object,
      default: () => {}
    },
    emailData:{
      type: Object,
      default: () => {}
    },
    confirmEmailData:{
      type: Object,
      default: () => {}
    }
  },

  methods: {
    fieldChange: function(name) {
      let field=this[name]
      let fieldToMatch=this[field.match] 
      let result=this.$validateElement(field,fieldToMatch)
      field.message=result.strMessage
      if(result.matchFlag){
        fieldToMatch.message=null
        this.$emit('field-change', {fieldName:field.match,fieldValue:fieldToMatch.value,invalid:false})
      }     

      this.$emit('field-change', {fieldName:name,fieldValue:field.value,invalid:Boolean(field.message)})
    },
    selectChange:function(name){
      let field=this[name]
      this.$emit('field-change', {fieldName:name,fieldValue:field.value,invalid:false})
    }
  },
  
  created(){
    this.title= {...this.title ,...this.titleData}
    this.firstName= {...this.firstName ,...this.firstNameData}
    this.lastName= {...this.lastName ,...this.lastNameData}
    this.phone= {...this.phone ,...this.phoneData}
    this.email= {...this.email ,...this.emailData}
    this.confirmEmail= {...this.confirmEmail ,...this.confirmEmailData}
  }
}
</script>