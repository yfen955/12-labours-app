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

  data: () => {
    return {
      twitterLink: {
        type: String,
        default: undefined,
      },
      facebookLink: {
        type: String,
        default: undefined,
      },
      linkedInLink: {
        type: String,
        default: undefined,
      },
    };
  },

  created: function() {
    this.twitterLink = this.$config.social_twitter;
    this.facebookLink = this.$config.social_facebook;
    this.linkedInLink = this.$config.social_linkedin;
  },
}
</script>

<style scoped lang="scss">
  .navigation-social{
      display: flex; 
      column-gap: 0.38rem;   
  }

  .svg-fill{
    color: $app-primary-color;
    height:1.75rem;
    width:1.75rem;
    padding:0.38rem;    
    
    border-radius:50%;
    border:1px solid $app-primary-color;
    background-color:$cochlear;
  }

</style>
