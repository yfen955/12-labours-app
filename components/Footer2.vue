<template>
    <div class="footer">
        <div class="footer-container">
          <div class="logo-wrapper">
            <div class="logo">
            <component
                :is="linkComponent"
                :to="{ name: 'index' }"
              >
              <!-- Provide a way to slot in the logo -->
                <slot name="logo">
                  <twelve-labours-logo type="black"/>
                </slot>
              </component>
            </div>
          </div>
          <div class="footer-navigation">
            <footer-links/>
          </div>
        </div>
    </div>
</template>


/****************    CODE   ****************/

<script>
//import TwelveLaboursLogo from "../../TwelveLaboursLogo/TwelveLaboursLogo.vue";

export default {
  name: "TwelveLaboursFooter",

  props: {
    linkComponent: {
      type: String,
      default: "nuxt-link"
    }
  },

 /* components: {
    TwelveLaboursLogo
  },*/
  methods: {
    /**
     * Sets a link to active based on current page
     * @param {String} query
     */
    activeLink: function(query) {
      if (this.currentPath === query) {
        return true;
      } else {
        return false;
      }
    },
  }

};
</script>


/****************    STYLES   ****************/

<style scoped lang="scss">
//@import "@/assets/_variables.scss";

.footer {
  display: flex;
  @media only screen and (max-width:  $viewport-md) {
    display:none;
  }
}

.footer-container {
  display: flex;
  flex-direction: row;
  width: 100%;
 // height:13.88rem;
  background-color: $grey;
  padding:0 3.75rem;
  justify-content:space-between; 
  align-items:center;
}

.logo-wrapper{
  padding:0.75rem 0rem;
}

.logo
{
  height: 12.5rem;   
  width: 14.6rem;  
  white-space: nowrap;
}

.footer-navigation{
  padding:2rem 0;
}

</style>
