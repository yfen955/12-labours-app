<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="container-default vertical-flex signup">
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
          <el-button>
            Sign up
          </el-button>  
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
  },
  /*
  computed: {
    imgPath() {
      return {
        require("~/static/img/"+ imgFile)
      }
    }
  }*/
}

</script>

<style scoped lang="scss">
  .signup{
    width:50%;
    box-sizing:border-box;
    &.__title{

    }
    &.__text{

    }
    &.__user{

    }
    &.__image{
      display: block;
      width:11.5rem;
      height:14.5rem;
      @media only screen and (min-width:$md-start) and (max-width:$md-end) {
        width:6rem;
        height:8rem;
      }
    }
    &.__nav-button{

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