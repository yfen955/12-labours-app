<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="signup container-default vertical-flex">
        <div class="signup__title top-heading">
          <h1>SIGN UP </h1>
        </div>
        <div class="signup__text">
          I'm signing up as a
        </div>
        <div class="signup__user">
          <el-select class="--sm" v-model="userType">
            <el-option v-for="item in userTypes"
              :key="item.value"
              :label="item.display"
              :value="item.display.toLowerCase()">
            </el-option>
          </el-select>
        </div>
        <div class="signup__image">
          <img :src="require(`~/static/img/${imgFile}`)"/>
        </div>
        <div class="signup__nav-button">
          <nuxt-link :to="{name: 'signup-user', params: {user: userType}, query :{ strategy : strategy}}">
            <el-button>
              Sign up
            </el-button>
          </nuxt-link>  
        </div>
      </div>
      <div class="signup-picture">
      </div>
    </div>
  </div>
</template>

<script>

export default { 
  name: 'SignupPage',

  async asyncData({$axios,query}) {
    const userTypes=await $axios.$get(`/user/types`)
    const strategy= query.strategy
    return {userTypes,strategy}
  },

  data: () => {
    return {   
      userType:'',
      imgFile:'',
    }
  },

  watch:{
    userType: {
      handler: function(userType) {
        this.imgFile=`${userType.toLowerCase()}-in-frame.png`
      }
    }
  },
  
  created(){
    this.userType=this.userTypes[0].display.toLowerCase()
    this.imgFile=`${this.userType}-in-frame.png`
  },

  mounted(){
    if(this.strategy && this.strategy=='google')
      this.$toast.show('Follow these steps to create account at 12 Labours!',{ duration: 5000, position: 'bottom-right'})
  }
}

</script>

<style scoped lang="scss">
  .signup{
    width:50%;
    @media only screen and (max-width:  $viewport-sm) {
      width:100%;
    }
    align-items:center;
    box-sizing:border-box;
    &__title{
      padding-top:6.25rem;
      @media only screen and (max-width:  $viewport-sm) {
        padding-top:2rem;
      }
    }
    &__text{
      padding:1rem;
      font-size:1.5rem;
      font-weight:bold;
      line-height:2.25rem;
    }
    &__user{
      padding:1rem;
    }
    &__image{
      padding:1rem 1rem 3.3rem 1rem;
      display: block;
      img{
        width:11.5rem;
        height:15.5rem;
      }
    }
    &__nav-button{
      padding:1rem;
      margin-bottom:12rem;
      
      @media only screen and (max-width:  $viewport-sm) {
        margin-bottom:3rem;
      }
    }
  }

</style>