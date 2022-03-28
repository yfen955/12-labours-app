<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="profile">
        <div class="container-default">
          <div class="box err-message">
            {{error}}
          </div>
          <div class="top-heading">
            <h1>PROFILE</h1> 
          </div>
          <div v-if="user"class="user-detail">
            <div>
              <div><h3>Title:</h3></div>
              <div><span>{{user.title}}</span></div>
            </div>
            <div>
              <div><h3>Email:</h3></div>
              <div><span>{{user.email}}</span></div>
            </div>
            <div>
              <div><h3>First Name:</h3></div>
              <div><span>{{user.first_name}}</span></div>
            </div>           
            <div>
              <div><h3>Last Name:</h3></div>
              <div><span>{{user.last_name}}</span></div>
            </div>
            <div>
              <div><h3>User Type:</h3></div>
              <div><span>{{user.type_name}}</span></div>
            </div>
            <div v-if="user.type_name=='Clinician' || user.type_name=='Researcher'">
              <div><h3>Profession:</h3></div>
              <div><span>{{user.profession}}</span></div>
            </div>
            <div v-if="user.type_name=='Patient'">
              <div><h3>NHI:</h3></div>
              <div><span>{{user.nhi}}</span></div>
            </div>
            <div v-if="user.type_name=='Clinician'">
              <div><h3>HPI:</h3></div>
              <div><span>{{user.hpi}}</span></div>
            </div> 
            <div v-if="user.dhb_name">
              <div><h3>DHB:</h3></div>
              <div><span>{{user.dhb_name}}</span></div>
            </div>
            <div v-if="user.hospital_name">
              <div><h3>Hospital:</h3></div>
              <div><span>{{user.hospital_name}}</span></div>
            </div>  
            <div v-if="user.institution_name">
              <div><h3>Institution:</h3></div>
              <div><span>{{user.institution_name}}</span></div>
            </div>                                                                            
          </div>
        </div>
        <div v-if="strategy==='local'" class="container-default shaded">
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
                  @blur="fieldChange('oldPassword')" 
                  :placeholder="oldPassword.placeholder"
                  autocomplete="off" 
                  type="password">
                </el-input>
                <div class="error">{{oldPassword.message}}</div>
              </el-form-item> 
              <el-form-item :required="newPassword.required" :label="newPassword.display">          
                <el-input 
                  v-model="newPassword.value" 
                  @blur="fieldChange('newPassword')" 
                  :placeholder="newPassword.placeholder"
                  autocomplete="off" 
                  type="password">
                </el-input>
                <div class="error">{{newPassword.message}}</div>
              </el-form-item> 
              <el-form-item :required="newPassword2.required" :label="newPassword2.display">          
                <el-input 
                  v-model="newPassword2.value" 
                  @blur="fieldChange('newPassword2')" 
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
        <div class="container-default" :class="strategy=='google'?'shaded':''">
          <div class="top-heading">
            <h1>DELETE ACCOUNT</h1>
          </div>
          <div v-if="deleteError" class="err-message">
            {{deleteError}}
          </div>
          <div class="box">
            <h3>We are sorry to see you going.</h3>
            <h5>Please note this action can not be undone and you will lose all your data.</h5>         
            <div class="nav-button">
              <el-button v-if="!yesDelete" @click="yesDelete=true">
                Delete My Account
              </el-button>
              <div v-else>
                <el-button @click="deleteUser">Confirm </el-button>
                <el-button @click="yesDelete=false">Cancel</el-button>
              </div>
            </div>
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
  name: 'ProfilePage',
  //middleware: 'auth',

  async asyncData({$auth,redirect}) {
    if(!$auth.loggedIn ||  !$auth.user || !$auth.strategy.token.status().valid()){     
      return redirect('/login');
    }

    const user=$auth.user
    return{user}
  },

  data: () => {
    return { 
      oldPassword:{
        display:'Old Password', value:null,message:'',required:true  ,placeholder:'Enter old Password'
      },    
      newPassword:{
        display:'New Password', value:null,message:'', required:true, format:'password', match:'newPassword2', minLength:8, maxLength:20, placeholder:'Enter new Password'
      },
      newPassword2:{
        display:'Confirm Password', value:null,message:'', required:true, format:'password', match:'newPassword', minLength:8, maxLength:20, placeholder:'Re-enter new Password'
      },
      invalidFields:['oldPassword','newPassword','newPassword2'],
      submitDisabled:true,
      yesDelete:false,
      error:null,
      passwordChangeError:null,
      deleteError:null
    }
  },

  methods: {
    fieldChange:function(fieldName){
      let field=this[fieldName]
      let fieldToMatch=this[field.match] 
      let result=this.$validateElement(field,fieldToMatch)
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
          oldPassword:this.oldPassword.value.trim()
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

    async deleteUser(){
     try {
        this.verifyLoggedIn();
        let response=await this.$axios.post( '/user/delete', {
          userId:this.user.user_id
        })
        if(response.status===200){ 
          await this.$auth.logout();    
          this.$toast.success('Your account is deleted successfully!',{duration:3000, position: 'bottom-right'})             
          this.$router.push('/')
        }
      } 
      catch (err) {
        this.deleteError=err.response? err.response.data.message : err.message
      }
    }
  },

 
  computed:{
    strategy() {
      return this.$store.state.auth.strategy
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
  .box{
    padding:0.5rem 0rem 2rem 0rem;
    @media only screen and (max-width:  $viewport-sm) {
      padding:0.5rem 0rem 0.5rem 0;
    }
  }

  .fields{
    width:100%;
    justify-content:center;
  }

  .profile{
    width:50%;
    @media only screen and (max-width:  $viewport-sm) {
      width:100%;
    }
    box-sizing:border-box;
  }

  .nav-button{
    padding-top:1rem;
  }

  .user-detail{
    div{
      margin:0.5rem;
      display:flex;
      column-gap:0.5rem;
      > div:first-child {
        display:flex;
        justify-content: flex-end;
        width:30%;
      }
      > div:nth-of-type(2) {
        width:70%;
      }
      @media only screen and (max-width:  $viewport-sm) {
        display-direction:vertical;
        row-gap:0.2rem;
      }
    }
  }
</style>