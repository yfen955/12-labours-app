<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="login container-default">
        <div class="login__title top-heading">
          <h1>LOGIN</h1>
        </div>
        <div class="login__fields vertical-flex"> <!--  @submit.prevent.native="localSignIn" -->
          <el-form label-position="top">
            <el-form-item> 
               <div class="error">{{error}}</div>
            </el-form-item>
            <el-form-item :required="email.required" :label="email.display">
              <el-input 
                v-model="email.value" 
                @blur="fieldChange('email')" 
                placeholder="Enter email">
              </el-input>
              <div class="error">{{email.message}}</div>
            </el-form-item> 
            <el-form-item :required="password.required" :label="password.display">          
              <el-input 
                v-model="password.value" 
                @blur="fieldChange('password')" 
                placeholder="Enter password"
                autocomplete="off" 
                type="password">
              </el-input>
              <div class="error">{{password.message}}</div>
            </el-form-item> 
            <div class="nav-button"><!--native-type="submit"  @click="localSignIn"-->
              <el-button :disabled="submitDisabled" @click="localSignIn">
                Login
              </el-button>
              <div class="signup-link">
                Do not have an account? 
                <nuxt-link to="/signup">Sign up Here</nuxt-link>
              </div>
            </div>
          </el-form>
        </div>
        <div class="google-signin flex-box">
          <div class="customGoogleBtn" @click="googleSignIn">
            <span class="icon"></span>
            <span class="buttonText" >Sign in with Google</span>
          </div>
        </div>
      </div>
      <div class="signup-picture">
      </div>
    </div>
  </div>
</template>

<script>

export default { 
  name: 'LoginPage',

  data: () => {
    return { 
      email:{
        display:'Email', value:null,format:'email',message:'',required:true  
      },    
      password:{
        display:'Password', value:null,message:'', required:true
      },
      invalidFields:['email','password'],
      submitDisabled:true,
      error:'',
    }
  },

  methods: {
    fieldChange:function(fieldName){
      let field=this[fieldName]
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
    async localSignIn() {
      try {
        let response =  await this.$auth.loginWith('local', {
          data: {
            email: this.email.value,
            password: this.password.value
          }
        }).then((response) => { 
          this.$auth.setUser(response.data.user)     
          this.$router.replace('/?login=true')
        })
      } 
      catch (err) {
        this.error=err.response? err.response.data.message : err.message
      }
    },
    async googleSignIn(){
      this.$auth.loginWith('google', { params: { prompt: "select_account" } })
    }
  },

  watch:{
    invalidFields: {
      handler: function(val) {
        this.submitDisabled=val.length>0
      }
    }
  },

  mounted(){
    const isError=this.$route.query.err
    if(isError) this.$toast.error('Your request for authentication failed. Try again!',{duration:5000, position: 'bottom-right'})
  }
}

</script>

<style scoped lang="scss">
  @import '@/assets/google.scss';

  .login{
    width:50%;
    @media only screen and (max-width:  $viewport-sm) {
      width:100%;
    }
    box-sizing:border-box;
    &__title{
      padding:1rem;
      font-size:1.5rem;
      font-weight:bold;
      line-height:2.25rem;
    }
    &__fields{
      padding:1rem;
      align-items:center;
    }
  }

  .nav-button{
    padding-top:1rem;
  }

  .signup-link{
    font-size:0.75rem;
  }

  .google-signin{
    justify-content:center;
    padding: 2rem 0 10rem 0;
    @media only screen and (max-width:  $viewport-sm) {
      padding: 0.5rem 0 2rem 0;
    }
  }
</style>