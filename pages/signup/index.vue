<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="signup container-default vertical-flex">
        <div class="signup__title top-heading">
          <h1>SIGN UP</h1>
        </div>
        <div class="signup__text">
          I'm signing up as a
        </div>
        <div class="signup__user">
          <el-select class="--sm" v-model="userType">
            <el-option label="Researcher" value="researcher"></el-option>
            <el-option label="Clinician" value="clinician"></el-option>
            <el-option label="Patient" value="patient"></el-option>
          </el-select>
        </div>
        <div class="signup__image">
          <img :src="require(`~/static/img/${imgFile}`)"/>
        </div>
        <div class="signup__nav-button">
          <nuxt-link :to="{name: 'signup-user-detail', params: {user: userType}}">
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

  data: () => {
    return {      
      userType:'researcher',
      imgFile:'researcher-in-frame.png'
    }
  },

  watch:{
    userType: {
      handler: function(user) {
        this.imgFile=`${user}-in-frame.png`
      }
    }
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