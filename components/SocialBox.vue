<template>
   <div class="navigation-social">
      <a :href="facebookLink" target="_blank">
        <svgicon icon="social/facebook"/>
      </a>
      <a :href="twitterLink" target="_blank">
        <svgicon icon="social/twitterFull"/>
      </a>
      <a :href="linkedInLink" target="_blank">
        <svgicon icon="social/linkedin"/>
      </a>           
    </div>
</template>

<script>

export default {
  name: "SocialBox",

  props: {        
      twitterLink: {
        type: String,
        default: process.env.social_twitter
      },
      facebookLink: {
        type: String,
        default: process.env.social_facebook
      },
      linkedInLink: {
        type: String,
        default:process.env.social_linkedIn
      }
  }
}
</script>

<style scoped lang="scss">
  .navigation-social{
      display: flex; 
      column-gap: 6px;   
  }

  .svg-fill{
    color: $app-primary-color;
    height:28px;
    width:28px;
    padding:6px;    //TBC
    
    border-radius:50%;
    border:1.5px solid $app-primary-color;
    background-color:$cochlear;
  }

</style>
