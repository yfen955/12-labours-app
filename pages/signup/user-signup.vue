<template>
  <div class="page-outer">
    <div class="flex-box">
      <div class="signup container-default vertical-flex">
        <div class="signup__title top-heading">
          <h1>SIGN UP</h1>
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
      
    }
  },

  props: {
    
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
  
  methods: {
    signup:function(){
      this.submitSuccess=true;
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