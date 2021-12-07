<template>
  <div class="form-section">  
  <el-form-item required label="What area would you like to know more information about?">
      <el-select v-model="title" placeholder="Select title" @change="fieldChange('title',title)">
        <el-option label="Dr" value="Dr"></el-option>
        <el-option label="Mr" value="Mr"></el-option>
        <el-option label="Mrs" value="Mrs"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :required="firstName.required" :label="firstName.display">
      <el-input v-model="firstName.value" @blur="fieldChange('firstName',firstName.value)"></el-input>
      <span v-if="firstName.message!='none'">{{firstName.message}}</span>
    </el-form-item>
    <el-form-item :required="lastName.required" :label="lastName.display">
      <el-input v-model="lastName.value" @blur="fieldChange('lastName', lastName.value)" :maxlength="lastName.max"></el-input>
      <span v-if="lastName.message!='none'">{{lastName.message}}</span>
    </el-form-item>
    <el-form-item :required="phone.required" :label="phone.display">
      <el-input v-model="phone.value" @blur="fieldChange('phone',phone.value)"></el-input>
      <span v-if="phone.message!='none'">{{phone.message}}</span>
    </el-form-item>
    <el-form-item :required="email.required" :label="email.display">
      <el-input v-model="email.value" @blur="fieldChange('email',email.value)"></el-input>
      <span v-if="email.message!='none'">{{email.message}}</span>
    </el-form-item> 
    <el-form-item :required="confirmEmail.required" :label="confirmEmail.display">
      <el-input v-model="confirmEmail.value" @blur="fieldChange('confirmEmail',confirmEmail.value)"></el-input>
      <span v-if="confirmEmail.message!='none'">{{confirmEmail.message}}</span>
    </el-form-item>   
  </div>
</template>

<script>

export default {
  name: 'ContactPage',

  data: () => {
    return {
      title:'',
    }
  },
  props: {
    //title: {},
    firstName:{},
    lastName:{},
    phone:{},
    email:{},
    confirmEmail:{}
  },
  methods: {
    fieldChange: function(name,value) {
      this.$emit('field-change', {fieldName:name,fieldValue:value})
    }
  },
  watch:{

  }
}
</script>