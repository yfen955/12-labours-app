<template>
  <div :class="showBg?'form-section':''"> 
  <el-form-item :required="title.required" :label="title.display">
      <el-select class="--sm" v-model="title.value" :placeholder="title.placeholder" @change="selectChange('title')">
        <el-option label="Dr" value="Dr"></el-option>
        <el-option label="Mr" value="Mr"></el-option>
        <el-option label="Miss" value="Miss"></el-option>
        <el-option label="Mrs" value="Mrs"></el-option>
        <el-option label="Ms" value="Ms"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :required="firstName.required" :label="firstName.display">
      <el-input v-model="firstName.value" @blur="fieldChange('firstName')" :maxlength="firstName.maxLength" :placeholder="firstName.placeholder"></el-input>
      <div class="error">{{firstName.message}}</div>
    </el-form-item>
    <el-form-item :required="lastName.required" :label="lastName.display">
      <el-input v-model="lastName.value" @blur="fieldChange('lastName')" :maxlength="lastName.maxLength" :placeholder="lastName.placeholder"></el-input>
      <div class="error">{{lastName.message}}</div>
    </el-form-item>
    <el-form-item v-if="showPhone" :required="phone.required" :label="phone.display">
      <el-input v-model="phone.value" @blur="fieldChange('phone')" :maxlength="phone.maxLength" :placeholder="phone.placeholder"></el-input>
      <div class="error">{{phone.message}}</div>
    </el-form-item>
    <el-form-item :required="email.required" :label="email.display">
      <el-input v-model="email.value" @blur="fieldChange('email')" :maxlength="email.maxLength" :placeholder="email.placeholder"></el-input>
      <div class="error">{{email.message}}</div>
    </el-form-item> 
    <el-form-item :required="confirmEmail.required" :label="confirmEmail.display">
      <el-input v-model="confirmEmail.value" @blur="fieldChange('confirmEmail')" :maxlength="confirmEmail.maxLength" :placeholder="confirmEmail.placeholder"></el-input>
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
        display:'Title', value:null,required:true,placeholder:'Select title'
      },
      firstName:{
        display:'First Name', value:null,message:'',required:true,maxLength:100,placeholder:'Enter your first name'
      },
      lastName:{
        display:'Last Name', value:null,message:'',required:true,maxLength:100,placeholder:'Enter your last name'
      },
      phone:{
        display:'Phone', value:null,message:'',format:'phone',maxLength:50,placeholder:'Enter your phone'
      },
      email:{
        display:'Email', value:null,message:'',required:true,format:'email',match:'confirmEmail',minLength:10,maxLength:100,placeholder:'Enter your email address'
      },
      confirmEmail:{
        display:'Confirm Email', value:null,message:'',required:true,format:'email',match:'email',minLength:10,maxLength:100,placeholder:'Please confirm your email address'
      }
    }
  },

  props:{
    showBg:{
      type:Boolean,
      default:true
    },
    showPhone:{
      type:Boolean,
      default:true
    },
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
  }
}
</script>