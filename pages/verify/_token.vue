<template>
  <div class="page-outer">
    <div class="container-default msg-box flex-box">
      <div v-if="!error" class="top-heading">
        <h3>Your request is being verified.....</h3>
      </div>
      <div v-if="error" class="err-message">
        <span>{{error}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default { 
  name: 'VerifyTokenPage',

  validate({ params}) {
    return params.token 
  },

  async asyncData({params}) {
    const access_token=params.token
    return{access_token}
  },

  data: () => {
    return { 
      error:'',
    }
  },

  created(){
    this.confirmUser();
  },

  methods: {
    async confirmUser(){
      try{
        this.error=''
        await this.$axios.post('/user/local/confirm', {},{
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.access_token}`
          }      
        })
        .then((response)=>{  
          if(response.status===200){
            if(this.$auth.loggedIn){
              this.$router.replace('/')  //TBC
            }
            else{
              this.$toast.success('You can now login with your credentials!',{duration:3000, position: 'bottom-right'})
              this.$router.replace('/login')
            }
          }
        })
      } 
      catch (error) {
        this.error = error.response? error.response.data.message : error
      }
    }
  }
}

</script>

<style scoped lang="scss">
  .msg-box{
    justify-content:center;
    padding:8rem 1rem 9rem 1rem;
    @media only screen and (max-width:  $viewport-sm) {
      padding:2rem 1rem 2rem 1rem;
    }
  }

</style>