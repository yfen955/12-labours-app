<template>
  <div class="page-outer">
    <div class="container-default msg-box">
      <div class="err-box flex-box" v-if="emailAttemtps==allowedAttempts">
        <span class="err-message">
          You have reached maximum attempts to send email. <br/>
          If you still haven't received email, contact site adminsitration for help.
      </span>
      </div>
      <div v-if="!error">
        <div v-if="emailSent">
          <h1 class="top-heading">CONFIRM EMAIL</h1>
          <p>A verification email has been sent to you. Please check your inbox and click <b>verification link</b>.</p>
          <div v-if="emailAttemtps<allowedAttempts" class="shaded resend-box">
            If you haven't received any email, click the following button. <br/>
            <el-button class="resend-btn" @click="resend">Resend Email</el-button>
          </div>
        </div>
        <div v-else>
          <h1 class="top-heading">Problem while sending email</h1>
          <p>Due to some problem, the confirmation email failed to reach your inbox.</p>
          <div v-if="emailAttemtps<allowedAttempts" class="shaded resend-box">
            To send again, click the following button. <br/>
            <el-button class="resend-btn" @click="resend">Resend Email</el-button>
          </div>
        </div>
      </div>
      <div class="err-box flex-box">
        <span class="err-message">
          {{error}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default { 
  name: 'VerifyMessagePage',

  validate({params}) {
    return params.id
  },

  async asyncData({params,query}) {
    const email=params.id
    let emailSent=query.emailSent
    return{email,emailSent}
  },

  data: () => {
    return { 
      allowedAttempts:10,
      emailAttemtps:1,
      error:'',
    }
  },

  methods:{
    async resend(){
      try {
        this.error=''
        if(this.emailAttemtps++ <this.allowedAttempts) {       
          await this.$axios.post('/user/local/email', {
            email: this.email
          }, {
            headers: {'Authorization': this.$config.login_api_key}
          })
          .then((response)=>{  
            if(response.data.alreadyActive){
              this.$toast.success('Please login with your credentials!',{duration:3000, position: 'bottom-right'})
              this.$router.push('/login')
            }
            else
            {
              this.emailSent=response.data.emailSent
              if(response.status===200) this.$toast.success('Sent again!',{duration:3000, position: 'bottom-right'})
            }
          })
        }
      } 
      catch (error) {      
        this.error = error.response? error.response.data.message : error
      }
    }
  }
}

</script>

<style scoped lang="scss">

  h1{
    margin-bottom:0.5rem;
  }
  .msg-box{
    padding:3rem 1rem 2rem 3rem;
  }

  .err-box{
    justify-content:center;
    padding:2rem 0.5rem 3rem 0.5rem;
  }

  .resend-box{
    margin-top:3rem;
    padding:2rem;
  }

  .resend-btn{
    margin-top:1rem;
  }
</style>