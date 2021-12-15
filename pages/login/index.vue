<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="login container-default vertical-flex">
        <div class="login__title top-heading">
          <h1>LOGIN</h1>
        </div>
        <div class="login__fields vertical-flex">
          <el-form label-position="top">
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
            <div class="nav-button">
              <el-button native-type="submit" :disabled="submitDisabled" @click="onSubmit">
                Login
              </el-button>
            </div>
          </el-form>
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
      submitDisabled:true
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
    onSubmit:function(){
      /*TBD: Code to verify login */
    }
  },

  watch:{
    invalidFields: {
      handler: function(val) {
        this.submitDisabled=val.length>0
      }
    }
  }
}

</script>

<style scoped lang="scss">
  .login{
    width:50%;
    @media only screen and (max-width:  $viewport-sm) {
      width:100%;
    }
    align-items:center;
    box-sizing:border-box;
    &__text{
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
    padding-bottom:12rem;
    @media only screen and (max-width:  $viewport-sm) {
      padding-bottom:2rem;
    }
  }

</style>