<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="signup container-default vertical-flex">
        <div class="top-heading">
          <h1>SIGN UP</h1>
        </div>
        <div class="fields flex-box">
          <el-form label-position="top">
            <contact-info :show-bg=false :show-phone=false @field-change="getField"/>
            <el-form-item :required="password.required" :label="password.display" >
              <el-input 
                v-model="password.value" 
                @blur="fieldChange('password')" 
                :maxlength="password.maxLength" 
                :placeholder="password.placeholder"
                autocomplete="off" 
                type="password"></el-input>
              <div class="error">{{password.message}}</div>
            </el-form-item> 
            <el-form-item :required="confirmPassword.required" :label="confirmPassword.display">
              <el-input 
                v-model="confirmPassword.value" 
                @blur="fieldChange('confirmPassword')" 
                :maxlength="confirmPassword.maxLength" 
                :placeholder="confirmPassword.placeholder"
                autocomplete="off" 
                type="password">
              </el-input>
              <div class="error">{{confirmPassword.message}}</div>
            </el-form-item> 
            <el-form-item :required="profession.required" :label="profession.display" v-if="userType=='researcher' || userType=='clinician'" >
              <el-input 
                v-model="profession.value" 
                @blur="fieldChange('profession')" 
                :placeholder="profession.placeholder"
                :maxlength="profession.maxLength">
              </el-input>
              <div class="error">
                {{profession.message}}
              </div>
            </el-form-item>  
            <el-form-item :required="institution.required" :label="institution.display" v-if="userType=='researcher'" >
              <el-select v-model="institution.value" :placeholder="institution.placeholder" @change="selectChange('institution')">
                <el-option v-for="item in institutions"
                  :key="item.value"
                  :label="item.display"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="error">
                {{institution.message}}
              </div>
            </el-form-item>           
            <el-form-item :required="hpi.required" :label="hpi.display" v-if="userType=='clinician'">
              <el-input 
                v-model="hpi.splitValues[0]" 
                maxlength=3 
                placeholder="XXX" 
                class="short --3digits"
                @blur="multiValueField('hpi')">
              </el-input> &mdash;
              <el-input 
                v-model="hpi.splitValues[1]" 
                maxlength=3 
                placeholder="XXX" 
                class="short --3digits" 
                @blur="multiValueField('hpi')">
              </el-input> &mdash;
              <el-input 
                v-model="hpi.splitValues[2]" 
                maxlength=1 
                placeholder="X" 
                class="short --1digit" 
                @blur="multiValueField('hpi')">
              </el-input>
              <div class="error">
                {{hpi.message}}
              </div>
            </el-form-item> 
            <el-form-item :required="hospital.required" :label="hospital.display" v-if="userType=='clinician'">
              <el-select v-model="hospital.value" :placeholder="hospital.placeholder" @change="selectChange('hospital')">
                <el-option v-for="item in hospitals"
                  :key="item.value"
                  :label="item.display"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="error">
                {{hospital.message}}
              </div>
            </el-form-item>                         
            <el-form-item :required="nhi.required" :label="nhi.display" v-if="userType=='patient'">
              <el-input 
                v-model="nhi.splitValues[0]" 
                maxlength=3 
                placeholder="XXX" 
                class="short --3digits" 
                @blur="multiValueField('nhi')">
              </el-input> &mdash;
              <el-input 
                v-model="nhi.splitValues[1]" 
                maxlength=2 
                placeholder="XX" 
                class="short --2digits" 
                @blur="multiValueField('nhi')">
              </el-input> &mdash;
              <el-input 
                v-model="nhi.splitValues[2]" 
                maxlength=2 
                placeholder="XX" 
                class="short --2digits" 
                @blur="multiValueField('nhi')">
              </el-input>
              <div class="error">
                {{nhi.message}}
              </div>
            </el-form-item>
            <el-form-item :required="dhb.required" :label="dhb.display" v-if="userType=='patient' || userType=='clinician'">
              <el-select v-model="dhb.value" :placeholder="dhb.placeholder" @change="selectChange('dhb')">
                <el-option-group v-for="group in dhbs" :key="group.label":label="group.label">
                  <el-option v-for="item in group.options"
                    :key="item.value"
                    :label="item.display"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="signup__nav-button">
          <el-button native-type="submit" :disabled="submitDisabled" @click="onSubmit">
            Sign up
          </el-button>  
        </div>
      </div>
      <div class="signup-picture">
      </div>
    </div>
  </div>
</template>

<script>

export default { 

  name: 'SignupPage',

  async asyncData({$axios}) {
    const  hospitals  = await $axios.$get(`/hospitals`)
    const institutions=await $axios.$get(`/institutions`)
    const dhbs=await $axios.$get(`/dhbs`)
    return{dhbs,hospitals,institutions}
  },

  data: () => {
    return {      
      userType:null,
      submitDisabled:true,     
      contactInfoValues:
        {title:'',firstName:'',lastName:'',email:'',confirmEmail:''},     
      password:
        {display:'Password', value:null,message:'', required:true,format:'password',match:'confirmPassword', minLength:8, maxLength:15,placeholder:'Enter your password'},     
      confirmPassword:
        {display:'Confirm Password', value:null, message:'', required:true,format:'password',match:'password', minLength:8, maxLength:15,placeholder:'Please confirm your password'},
      profession:
        {display:'Profession', value:null, message:'', required:true,maxLength:100,placeholder:'Enter your profession'},
      institution:
        {display:'Institution', value:null, message:'', required:true,placeholder:'Select your institution'},
      hpi:
        {display:'HPI number', value:null, message:'', required:true,minLength:7, maxLength:7,splitValues:['','','']},
      nhi:{  
        display:'NHI number', value:null,message:'', required:true,minLength:7, maxLength:7,splitValues:['','','']},
      hospital:
        {display:'Healthcare center/Hospital', value:null, message:'', required:true,placeholder:'Select your hospital'},
      dhb:
        {display:'DHB', value:null,message:'', required:true,placeholder:'Select your DHB'},
      invalidFields:[],
      researcherFields:
        ['title','firstName','lastName','email','confirmEmail','password','confirmPassword','profession','institution'],
      clinicianFields:
        ['title','firstName','lastName','email','confirmEmail','password','confirmPassword','profession','hpi','hospital','dhb'],
      patientFields:
        ['title','firstName','lastName','email','confirmEmail','password','confirmPassword','nhi','dhb']
    }
  },
  
  methods: {
    getField:function({fieldName, fieldValue,invalid}){
      this.contactInfoValues[fieldName]=fieldValue
      this.updateValidity(fieldName,invalid)
    },

    fieldChange: function(name) {
      let field=this[name]
      let fieldToMatch=this[field.match] 
      let result=this.$validateElement(field,fieldToMatch)
      field.message=result.strMessage
      this.updateValidity(name,Boolean(field.message)) 
      if(result.matchFlag){
        fieldToMatch.message=null
        this.updateValidity(name,false)
      }  
    },

    selectChange:function(fieldName){
      this.updateValidity(fieldName,false)
    },

    multiValueField:function(fieldName){
      let field=this[fieldName] 
      let [value1,value2,value3]=field.splitValues;
      field.value=value1 +value2 +value3
      let result=this.$validateElement(field,null)
      field.message=result.strMessage
      this.updateValidity(fieldName,Boolean(field.message)) 
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
    }
  },

  watch:{
    invalidFields: {
      handler: function(val) {
        this.submitDisabled=val.length>0
      }
    }
  },

  created() {
    this.userType= this.$route.params.user 
    if(this.userType){ 
      switch(this.userType){
        case "researcher":
          this.invalidFields=this.researcherFields
          break;
        case "clinician":
          this.invalidFields=this.clinicianFields
          break;
        case "patient":
          this.invalidFields=this.patientFields
          break;
      }
    }
    else{
      this.$router.replace({ path: '/signup' })
    }
  }
}

</script>

<style scoped lang="scss">
  .signup{
    width:50%;
    @media only screen and (max-width:  $viewport-sm) {
      width:100%;
    }
    align-items:center;
    box-sizing:border-box;
    &__nav-button{
      padding:1rem;
    }
  }

  .fields{
    width:100%;
    justify-content:center;
  }

  .short{
    .el-input__inner {text-transform:uppercase;}
    &.--3digits{
      width:4.5rem;
    }
    &.--2digits{
      width:4rem;
    }
    &.--1digit{
      width:3rem;
    }
  }
</style>