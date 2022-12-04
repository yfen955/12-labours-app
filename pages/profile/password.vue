<template>
  <div class="page-outer">
    <div class="flex-box">
      <NavBar />
      <div class="profile container-default">
        <div class="top-heading">
          <h1>CHANGE PASSWORD</h1>
        </div>
        <div class="flex-box fields"> 
          <el-form label-position="top">
            <el-form-item> 
              <div class="error">{{passwordChangeError}}</div>
            </el-form-item>
            <el-form-item :required="oldPassword.required" :label="oldPassword.display">
              <el-input 
                v-model="oldPassword.value" 
                @input="fieldChange('oldPassword')" 
                :placeholder="oldPassword.placeholder"
                autocomplete="off" 
                type="password">
              </el-input>
              <div class="error">{{oldPassword.message}}</div>
            </el-form-item> 
            <el-form-item :required="newPassword.required" :label="newPassword.display">          
              <el-input 
                v-model="newPassword.value" 
                @input="fieldChange('newPassword')" 
                :placeholder="newPassword.placeholder"
                autocomplete="off" 
                type="password">
              </el-input>
              <div class="error">{{newPassword.message}}</div>
            </el-form-item> 
            <el-form-item :required="newPassword2.required" :label="newPassword2.display">          
              <el-input 
                v-model="newPassword2.value" 
                @input="fieldChange('newPassword2')" 
                :placeholder="newPassword2.placeholder"
                autocomplete="off" 
                type="password">
              </el-input>
              <div class="error">{{newPassword2.message}}</div>
            </el-form-item> 
            <div class="nav-button">
              <el-button :disabled="submitDisabled" @click="changePassword">
                Change
              </el-button>
              <el-button @click="resetForm">
                Cancel
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="signup-picture"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/Profile/NavBar.vue";

export default {
  components: { NavBar },
  data: () => {
    return { 
      oldPassword:{
        display:'Old Password', value:null,message:'',required:true  ,placeholder:'Enter old Password', compare: 'newPassword'
      },    
      newPassword:{
        display:'New Password', value:null,message:'', required:true, format:'password', match:'newPassword2', minLength:8, maxLength:20, placeholder:'Enter new Password', compare: 'oldPassword'
      },
      newPassword2:{
        display:'Confirm New Password', value:null,message:'', required:true, format:'password', match:'newPassword', minLength:8, maxLength:20, placeholder:'Re-enter new Password'
      },
      invalidFields:['oldPassword','newPassword','newPassword2'],
      submitDisabled:true,
      passwordChangeError:null,
      deleteError:null
    }
  },

  async asyncData({$auth,redirect}) {
    if(!$auth.loggedIn ||  !$auth.user || !$auth.strategy.token.status().valid()){     
      return redirect('/login');
    }

    const user=$auth.user
    return{user}
  },

  watch:{
    invalidFields: {
      handler: function(val) {
        this.submitDisabled=val.length>0
      }
    }
  },

  methods: {
    fieldChange:function(fieldName){
      let field=this[fieldName]
      let fieldToMatch=this[field.match] 
      let fieldToCompare=this[field.compare]
      let result=this.$validateElement(field,fieldToMatch,fieldToCompare)
      field.message=result.strMessage
      this.updateValidity(fieldName,Boolean(field.message)) 
 
      if(result.matchFlag){
        fieldToMatch.message=null
        this.updateValidity(field.match,false)
      } 
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

    verifyLoggedIn(){
      if(!this.$auth.loggedIn || !this.$auth.user || !this.$auth.strategy.token.status().valid()){
        this.$toast.error('Your session has expired. Please login again!',{duration:3000, position: 'bottom-right'})
        this.$router.replace('/login')
      }
    },

    resetForm(){
      this.newPassword.value=this.oldPassword.value=this.newPassword2.value=this.passwordChangeError=null
      this.newPassword.message=this.oldPassword.message=this.newPassword2.message=''
      this.submitDisabled=true
      this.invalidFields=['oldPassword','newPassword','newPassword2']
    },
      
    async changePassword() {
      try {
        this.verifyLoggedIn();
        let response=await this.$axios.post('/user/local/password', {
          userId:this.user.user_id,
          newPassword:this.newPassword.value.trim(),
          oldPassword:this.oldPassword.value.trim(),
          reset:false
        })
        if(response.status===200){
          this.$toast.success('Your password is changed successfully!',{duration:3000, position: 'bottom-right'})
          this.resetForm();
        }
      } 
      catch (err) {
        this.passwordChangeError=err.response? err.response.data.message : err.message
      }
    },
  }
}
</script>

<style scoped lang="scss">
.profile{
  width:50%;
  @media only screen and (max-width:  $viewport-sm) {
    width:100%;
  }
  box-sizing:border-box;
}
.fields{
  width:100%;
  justify-content:center;
}
.nav-button{
  padding-top:1rem;
}
.flex-box {
  height: 30em;
}
</style>