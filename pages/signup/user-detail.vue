<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="signup container-default vertical-flex">
        <div class="top-heading">
          <h1>SIGN UP</h1>
        </div>
        <div class="fields">
          <el-form label-position="top">
            <contact-info :show-bg=false :show-phone=false @field-change="getField"/>
            <el-form-item :required="password.required" :label="password.display" >
              <el-input 
                v-model="password.value" 
                @blur="fieldChange('password')" 
                :maxlength="password.maxLength" 
                autocomplete="off" 
                type="password"></el-input>
              <span class="error">{{password.message}}</span>
            </el-form-item> 
            <el-form-item :required="confirmPassword.required" :label="confirmPassword.display">
              <el-input 
                v-model="confirmPassword.value" 
                @blur="fieldChange('confirmPassword')" 
                :maxlength="confirmPassword.maxLength" 
                autocomplete="off" 
                type="password">
              </el-input>
              <span class="error">{{confirmPassword.message}}</span>
            </el-form-item> 
            <div v-if="userType=='researcher'">
              <el-form-item :required="profession.required" :label="profession.display">
                <el-input 
                  v-model="profession.value" 
                  @blur="fieldChange('profession')" 
                  :maxlength="profession.maxLength">
                </el-input>
                <span class="error">
                  {{profession.message}}
                </span>
              </el-form-item>  
              <el-form-item :required="institution.required" :label="institution.display">
                <el-input 
                  v-model="institution.value" 
                  @blur="fieldChange('institution')" 
                  :maxlength="institution.maxLength">
                </el-input>
                <span class="error">
                  {{institution.message}}
                </span>
              </el-form-item>           
            </div>
            <div v-if="userType=='clinician'">
              <el-form-item :required="hpi.required" :label="hpi.display">
                <el-input 
                  v-model="hpi.value" 
                  @blur="fieldChange('hpi')" 
                  :maxlength="hpi.maxLength">
                </el-input>
                <span class="error">
                  {{hpi.message}}
                </span>
              </el-form-item> 
              <el-form-item :required="hospital.required" label="Healthcare center/Hospital" >
                <el-input 
                  v-model="hospital.value" 
                  @blur="fieldChange('hospital')" 
                  :maxlength="hospital.maxLength">
                </el-input>
                <span class="error">
                  {{hospital.message}}
                </span>
            </el-form-item>                         
            </div>
            <div v-if="userType=='patient'">
              <el-form-item :required="nhi.required" :label="nhi.display">
                <el-input 
                  v-model="nhi.value" 
                  @blur="fieldChange('nhi')" 
                  :maxlength="nhi.maxLength">
                </el-input>
                <span class="error">
                  {{nhi.message}}
                </span>
              </el-form-item>
              <el-form-item :required="dhb.required" :label="dhb.display">
                <el-select v-model="dhb.value" placeholder="Select title" @change="selectChange('dhb')">
                  <el-option v-for="item in dhbOptions"
                    :key="item.name"
                    :label="item.display"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="signup__nav-button">
          <el-button native-type="submit" :disabled="submitDisabled" @click="onSubmit">
            Sign up
          </el-button>  
        </div>
      </div>
      <div class="picture">
      </div>
    </div>
  </div>
</template>

<script>

import graphcmsQuery from '@/services/graphcmsQuery'
export default { 

  name: 'SignupPage',

  async asyncData({$graphcms}) {
    const feedbackReason= await graphcmsQuery.feedbackReason($graphcms)
    return {feedbackReason}
  },

  data: () => {
    return {      
      userType:null,
      submitDisabled:true,
      dhbOptions: [,],
      contactInfoValues:{title:'',firstName:'',lastName:'',email:'',confirmEmail:''},
      password:{
        display:'Password', value:null,message:'', required:true,format:'password',match:'confirmPassword', minLength:8, maxLength:15
      },
      confirmPassword:{
        display:'Confirm Password', value:null, message:'', required:true,format:'password',match:'password', minLength:8, maxLength:15
      },
      profession:{
        display:'Profession', value:null, message:'', required:true
      },
      institution:{
        display:'Institution', value:null, message:'', required:true
      },
      hpi:{
        display:'HPI', value:null, message:'', required:true
      },
      nhi:{
        display:'NHI', value:null,message:'', required:true
      },
      hospital:{
        display:'Hospital', value:null, message:'', required:true
      },
      nhi:{
        display:'NHI', value:null,message:'', required:true
      },
      dhb:{
        display:'DHB', value:null,message:'', required:true
      },
      invalidFields:[],
      researcherFields:['title','firstName','lastName','email','confirmEmail','password','confirmPassword','profession','institution'],
      clinicianFields:['title','firstName','lastName','email','confirmEmail','password','confirmPassword','hpi','hospital'],
      patientFields:['title','firstName','lastName','email','confirmEmail','password','confirmPassword','nhi','dhb']
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
      //this.submitSuccess=true;
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

    this.dhbOptions= this.feedbackReason.__type.enumValues
    this.dhbOptions.map(e => e.display = e.name.replace(/_/g,' '))  
  },

  /*
  validate({ params}) {
    return params.user
  }*/
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

  .picture{
    width:50%;
    border: 1px solid #707070;
    height: 60rem;
    background-image:
    linear-gradient(217deg, #00467FE0 0%, #0080A7B0 53%, #0080A7B0 60%, #00467FDE 100%),
    url("~static/img/virtual-screen.png");
    background-repeat: no-repeat;
    background-size: cover;

    @media only screen and (max-width:  $viewport-sm) {
      display:none;
    }
  }
</style>