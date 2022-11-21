<template>
  <div class="page-outer">
    <div v-if="message" class="container-default msg-box flex-box">
      {{ message }}
    </div>
    <div v-else>
      <h1>Reset your password</h1>
      <el-form label-position="top" class="psd-form">
        <el-form-item :required="email.required" :label="email.label"> 
          <el-input 
            v-model="email.value" 
            @blur="fieldChange()" 
            placeholder="Enter Email"
          />
        </el-form-item>
        <el-form-item> 
          <div class="error">{{ email.message }}</div>
        </el-form-item>
        <el-button :disabled="submitDisabled" @click="sendEmail()">
          Send password reset email 
        </el-button>
      </el-form>
      <div v-if="error" class="err-message">
        {{ error }}
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
      const path = `/user/local/password/reset`;
      await this.$axios
        .post(path, { email: this.email.value })
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
}
.psd-form {
  margin: auto;
  margin-top: 2em;
  margin-bottom: 1em;
  max-width: 25em;
  padding: 1em;
  border: 1px solid #E4E7ED;
  background-color: $background;

  ::v-deep .el-input__inner {
    width: 100%;
  }

  ::v-deep .el-form-item {
    margin-bottom: 0.5em;
  }
}
.msg-box{
  justify-content:center;
  font-size: 1.5em;
  padding:8rem 1rem 20rem 1rem;
  @media only screen and (max-width:  $viewport-sm) {
    padding:2rem 1rem 2rem 1rem;
  }
}
.err-message {
  text-align: center;
  margin-bottom: 10em;
}
</style>