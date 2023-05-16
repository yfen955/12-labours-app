<template>
  <div class="page-outer">
    <div class="container-default">
      <div v-if="!submitted">
        <h1>Reset your password</h1>
        <el-form label-position="top" class="pwd-form">
          <el-form-item :required="password.required" :label="password.display"> 
            <el-input 
              v-model="password.value" 
              @input="fieldChange('password')" 
              :placeholder="password.placeholder"
              type="password"
            />
          </el-form-item>
          <el-form-item> 
            <div class="error">{{ password.message }}</div>
          </el-form-item>
          <el-form-item :required="confirmPassword.required" :label="confirmPassword.display"> 
            <el-input 
              v-model="confirmPassword.value" 
              @input="fieldChange('confirmPassword')" 
              :placeholder="confirmPassword.placeholder"
              type="password"
            />
          </el-form-item>
          <el-form-item> 
            <div class="error">{{ confirmPassword.message }}</div>
          </el-form-item>
          <el-button :disabled="submitDisabled" @click="resetPwd()">
            <p>Reset the password</p>
          </el-button>
        </el-form>
      </div>
      
      <div v-else class="msg-box">
        <div v-if="!error" class="top-heading">
          <h3>Your request is being verified.....</h3>
        </div>
        <div v-if="error" class="err-message">
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { encryption } from '../../../plugins/encrypt-pwd.js';

export default {
  data: () => {
    return {
      password: {
        display:'New Password', value:null, message:'', required:true, format:'password', match:'confirmPassword', minLength:8, maxLength:20, placeholder:'Enter new password', disabled: true
      },     
      confirmPassword: {
        display:'Confirm Password', value:null, message:'', required:true, format:'password', match:'password', minLength:8, maxLength:20, placeholder:'Please confirm your password', disabled: true
      },
      fieldsNum: 2,
      validCount: 0,
      submitDisabled: true,
      error: '',
      submitted: false,
    }
  },

  watch:{
    validCount: {
      handler: function() {
        if (this.validCount === this.fieldsNum) {
          this.submitDisabled = false;
        }
      }
    }
  },

  methods: {
    fieldChange(name) {
      let field = this[name];
      let fieldToMatch = this[field.match];
      let result = this.$validateElement(field, fieldToMatch);
      field.message = result.strMessage;
      if (!result.strMessage) {
        field.disabled = false;
        // if changed another one to match the current one, update another one
        if (result.matchFlag) {
          fieldToMatch.message = null;
          fieldToMatch.disabled = false;
        }
      } else {
        field.disabled = true;
      }
      this.submitDisabled = this.password.disabled || this.confirmPassword.disabled;
    },

    async resetPwd() {
      this.submitted = true;
      let userData = encryption({
        key: this.$config.login_secret_key,
        data: {
          userId: this.$route.params.id,
          newPassword: this.password.value,
          oldPassword: 'none',  // this API needs old password, but in this case reset is true, so its value does not matter
          reset: true,
        },
        param: ['newPassword']
      })
      let userEmail;
      await this.$axios
        .post('/user/local/password', userData, {headers: {
          'Content-Type': 'application/json',
          'access_token': `Bearer ${this.$route.params.token}`
        }})
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('You have successfully changed your password! You are logged in now.', {duration:3000, position: 'bottom-right'});
            userEmail = res.data.email;
          }
        })
        .catch((err) => {
          this.error = err.response ? err.response.data.message : err;
        });
        // login the user
        if (userEmail) {
          try {
            await this.$auth.loginWith('local', {
              data: {
                email: userEmail,
                password: userData.newPassword
              }
            }).then((res) => { 
              this.$auth.setUser(res.data.user);
              this.$router.replace('/');
            })
          } 
          catch (err) {
            this.error = err.response ? err.response.data.message : err;
          }
        }
            
    }
  }
}
</script>

<style scoped lang="scss">
.msg-box{
  text-align:center;
  font-size: 1.5rem;
  margin: 10rem 0 0 0;
  min-width: 14rem;
}
h1 {
  text-align: center;
  white-space: nowrap;
}
.pwd-form {
  margin: auto;
  margin-top: 2rem;
  max-width: 25rem;
  min-width: 14rem;
  padding: 1rem;
  border: 1px solid #E4E7ED;
  background-color: $background;
  @media only screen and (max-width:  $viewport-sm) {
    p {
      font-size: 0.75rem;
    }
  }

  ::v-deep .el-input__inner {
    width: 100%;
  }
  ::v-deep .el-form-item {
    margin-bottom: 1rem;
  }
}
</style>