<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="signup container-default vertical-flex">
        <div class="top-heading">
          <h1>SIGN UP</h1>
        </div>
        <div class="fields flex-box">
          <el-form label-position="top"> <!-- @submit.prevent.native="register" -->
            <el-form-item> 
              <div class="error">{{error}}</div>
            </el-form-item>
            <contact-info 
              :show-bg=false 
              :phone-data={visible:false} 
              :email-data="emailData"
              :confirm-email-data="confirmEmailData"
              :first-name-data="firstNameData"
              :last-name-data="lastNameData"
              @field-change="getField"
            />
            <el-form-item v-if="strategy=='local'" :required="password.required" :label="password.display" >
              <el-input 
                v-model="password.value" 
                @input="fieldChange('password')" 
                :maxlength="password.maxLength" 
                :placeholder="password.placeholder"
                autocomplete="off" 
                type="password"></el-input>
              <div class="error">{{password.message}}</div>
            </el-form-item> 
            <el-form-item v-if="strategy=='local'" :required="confirmPassword.required" :label="confirmPassword.display">
              <el-input 
                v-model="confirmPassword.value" 
                @input="fieldChange('confirmPassword')" 
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
                @input="fieldChange('profession')" 
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
                @input="multiValueField('hpi')">
              </el-input> &mdash;
              <el-input 
                v-model="hpi.splitValues[1]" 
                maxlength=3 
                placeholder="XXX" 
                class="short --3digits" 
                @input="multiValueField('hpi')">
              </el-input> &mdash;
              <el-input 
                v-model="hpi.splitValues[2]" 
                maxlength=1 
                placeholder="X" 
                class="short --1digit" 
                @input="multiValueField('hpi')">
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
                @input="multiValueField('nhi')">
              </el-input> &mdash;
              <el-input 
                v-model="nhi.splitValues[1]" 
                maxlength=2 
                placeholder="XX" 
                class="short --2digits" 
                @input="multiValueField('nhi')">
              </el-input> &mdash;
              <el-input 
                v-model="nhi.splitValues[2]" 
                maxlength=2 
                placeholder="XX" 
                class="short --2digits" 
                @input="multiValueField('nhi')">
              </el-input>
              <div class="error">
                {{nhi.message}}
              </div>
            </el-form-item>
            <el-form-item :required="dhb.required" :label="dhb.display" v-if="userType=='patient' || userType=='clinician'">
              <el-select v-model="dhb.value" :placeholder="dhb.placeholder" @change="selectChange('dhb')">
                <el-option-group v-for="group in dhbs" :key="group.label" :label="group.label">
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
        <div class="signup__nav-button"><!--native-type="submit" @click="register"-->
          <el-button  :disabled="submitDisabled" @click="register">
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

  async asyncData({$axios,query}) {
    const  hospitals  = await $axios.$get(`/hospitals`)
    const institutions=await $axios.$get(`/institutions`)
    const dhbs=await $axios.$get(`/dhbs`)
    const strategy=query.strategy || 'local'
    return{dhbs,hospitals,institutions,strategy}
  },

  data: () => {
    return {  
      userType:null,
      submitDisabled:true, 
      contactInfoValues:{},   
      emailData:{},confirmEmailData:{},firstNameData:{},lastNameData:{},
      password:
        {display:'Password', value:null,message:'', required:true,format:'password',match:'confirmPassword', minLength:8, maxLength:20,placeholder:'Enter your password'},     
      confirmPassword:
        {display:'Confirm Password', value:null, message:'', required:true,format:'password',match:'password', minLength:8, maxLength:20,placeholder:'Please confirm your password'},
      profession:
        {display:'Profession', value:null, message:'', required:true,maxLength:255,placeholder:'Enter your profession'},
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
      error:''
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
        this.updateValidity(field.match,false)
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

    async register(){
      try {
        this.error=''
        const endpoint= this.strategy=='google' ? '/user/google/register' : '/user/local/register' 
        await this.$axios.post(endpoint, {
          strategy:this.strategy,
          userInfo: this.getFormData()      
        })
        .then((response)=>{  
          this.$auth.logout()    //TBC: if needed
          if(this.strategy=='google'){
            this.$auth.strategy.token.set(response.data.access_token)  
            this.$auth.setUser(response.data.user)
            this.$toast.success('Successfully created new account!',{duration:3000, position: 'bottom-right'})
            this.$router.replace('/')
          }
          else{
            this.$router.replace({ name: 'verify-email-id',  
              params: {id:response.data.email},
              query:{emailSent:response.data.emailSent}
            })
          }
        })
      } 
      catch (error) {
        this.error = error.response? error.response.data.message : error
      }
    },

    getFormData:function(){
      return{
        userTypeName:this.userType,
        title:this.contactInfoValues.title,
        firstName:this.contactInfoValues.firstName,
        lastName:this.contactInfoValues.lastName,
        email:this.contactInfoValues.email,
        password:this.password.value,
        profession:this.profession.value,
        institutionId:this.institution.value,
        hpi:this.hpi.value,
        nhi:this.nhi.value,
        hospitalId:this.hospital.value,
        dhbId:this.dhb.value,
        googleId: (this.googleProfile && this.googleProfile.googleId) ? this.googleProfile.googleId : null
      }
    }
  },

  computed:{
    googleProfile(){
      return this.$auth.$storage.getCookie('googleProfile')
    }
  },
  
  watch:{
    invalidFields: {
      handler: function(val) {
        this.submitDisabled=val.length>0
      }
    }
  },

  created() 
  {
    try{
      this.userType= this.$route.params.user 
      if(!this.userType)
        this.$router.replace({ path: '/signup' })

      if(this.strategy=='google' && !this.googleProfile)
        this.$router.replace({ path: '/error' })

      this.contactInfoValues=
        this.strategy=='google' ? {title:'',firstName:this.googleProfile.firstName,lastName:this.googleProfile.lastName,email:this.googleProfile.email} : {title:'',firstName:'',lastName:'',email:'',confirmEmail:''}    
      
      const userFields=this.strategy=='google' ? ['title', 'firstName','lastName','email'] :  ['title','firstName','lastName','email','confirmEmail','password','confirmPassword']

      switch(this.userType.toLowerCase()){
        case "researcher":
          this.invalidFields=[...userFields,'profession','institution']
          break;
        case "clinician":
          this.invalidFields=[...userFields,'profession','hpi','hospital','dhb']
          break;
        case "patient":
          this.invalidFields= [...userFields,'nhi','dhb']
          break;
      }

      if(this.strategy=='google'){ 
        this.emailData ={disabled:true,value:this.googleProfile.email},
        this.confirmEmailData ={visible:false}
        this.firstNameData={value:this.googleProfile.firstName}
        this.lastNameData={value:this.googleProfile.lastName}
      }
    }
    catch(err){
      console.log(err)
    }
  },

  beforeDestroy() {
    this.$auth.$storage.removeCookie('googleProfile', true) 
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