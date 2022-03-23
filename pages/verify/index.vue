<template>
  <div class="page-outer">
    <div class="container-default msg-box">
      <div v-if="validRequest && emailSent">
        <h1>A Verification email has been sent to your email.</h1>
        <p>Please check your inbox and click <b>verification link</b>.</p>
        <div class="shaded resend-box">
          If you haven't received any email, click the following button. <br/>
          <el-button class="resend-btn" @click="resend">Resend Email</el-button>
        </div>
      </div>
      <div v-if="validRequest && !emailSent">
        <h1>Problem while sending email</h1>
        <p>Due to some problem, the confirmation email failed to reach your inbox.</p>
        <div class="shaded resend-box">
          To send again, click the following button. <br/>
          <el-button class="resend-btn" @click="resend">Resend Email</el-button>
        </div>
      </div>
      <div class="err-box">
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

  validate({ params}) {
    return params.fromRegistration && params.registrationEmail && params.emailSent
  },

  async asyncData({params}) {
    const validRequest=params.fromRegistration
    const email=params.registrationEmail
    let emailSent=params.emailSent
    return{validRequest,email,emailSent}
  },

  data: () => {
    return { 
      error:'',
    }
  },

  methods:{
    async resend(){
      try {
        this.error=''
        await this.$axios.post('/user/local/email', {
          email:this.email   
        })
        .then((response)=>{  
          if(response.data.alreadyActive){
            this.$toast.success('Please login with your credentials!',{duration:3000, position: 'bottom-right'})
            this.$router.push('/login')
          }
          else
          {
            this.emailSent=response.data.emailSent
          }
        })
      } 
      catch (error) {
        this.emailSent=false
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
    padding-top:2rem;
  }

  .resend-box{
    margin-top:1rem;
    padding:2rem;
  }

  .resend-btn{
    margin-top:0.5rem;
  }
</style>