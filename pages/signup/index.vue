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
            <el-button @change="selectChange('signup')">
              Sign up
            </el-button>
          </nuxt-link>  
        </div>
      </div>
      <div class="picture">
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
        if(user=='researcher')
          this.imgFile='researcher-in-frame.png'
        else if(user=='clinician')
          this.imgFile='doctor-in-frame.png'
        else if(user=='patient')
          this.imgFile='patient-in-frame.png'
      }
    }
  }
}

</script>

<style scoped lang="scss">
  .signup{
    width:50%;
    align-items:center;
    box-sizing:border-box;
    &__title{
      padding-top:6.25rem;
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
        @media only screen and (min-width:$md-start) and (max-width:$md-end) {
          width:6rem;
          height:8rem;
        }
      }
    }
    &__nav-button{
      padding:1rem;
    }
  }

  .picture{
    width:50%;
    border: 1px solid #707070;
    height: 60rem;
    background-image:
    linear-gradient(217deg, #00467FE0 0%, #0080A7B0 53%, #0080A7B0 60%, #00467FDE 100%),
    url("~static/img/virtual-screen.png");
    background-repeat: no-repeat;
    background-size: cover;

    @media only screen and (max-width:  $viewport-sm) {
      display:none;
    }
  }
</style>