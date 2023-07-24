<template>
  <div class="page-outer">
    <div class="container-default">
      <div v-if="message" class="msg-box">
        {{ message }}
      </div>
      <div v-else>
        <div>
          <h1>Reset your password</h1>
          <el-form label-position="top" class="pwd-form">
            <el-form-item :required="email.required" :label="email.label"> 
              <el-input 
                v-model="email.value" 
                @input="fieldChange()" 
                placeholder="Enter Email"
              />
            </el-form-item>
            <el-form-item> 
              <div class="error">{{ email.message }}</div>
            </el-form-item>
            <el-button :disabled="submitDisabled" @click="sendEmail()">
              <p>Send reset email</p>
            </el-button>
          </el-form>
        </div>
        <div v-if="error" class="err-message">
          {{ error }}
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',

  data: () => {
    return { 
      email:{
        required: true,
        display: "Email",
        label:"Enter your user account's verified email address.",
        value:null,
        format:'email',
        message:''
      },
      message: '',
      error: '',
      submitDisabled: true,
    }
  },

  methods: {
    fieldChange() {
      let result = this.$validateElement(this.email);
      this.email.message = result.strMessage;
      if (!result.strMessage) {
        this.submitDisabled = false;
      } else {
        this.submitDisabled = true;
      }
    },

    async sendEmail() {
      await this.$axios
        .post('/user/local/password/reset', { 
          email: this.email.value
         }, {
          headers: { 'Authorization': this.$config.login_api_key }
        })
        .then((res) => {
          this.message = res.data.message;
        })
        .catch((err) => {
          this.error = err.response ? err.response.data.message : err;
        });
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  white-space: nowrap;
}
.pwd-form {
  margin: auto;
  margin-top: 2rem;
  max-width: 25rem;
  min-width: 13rem;
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
.msg-box{
  text-align:center;
  font-size: 1.5em;
  margin: 10rem 0 0 0;
  min-width: 13rem;
}
.err-message {
  margin-top: 2rem;
  text-align: center;
}
</style>