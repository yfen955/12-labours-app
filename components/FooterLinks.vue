<template>
  <div class="footer-links" :style="alterStyles" >
    <div class="navigation">
        <div class="navigation__links">
        <ul>
          <li v-for="link in footerLinks" :key="link.href">
              <a :href="link.href">
              {{ link.displayTitle.toUpperCase() }}
            </a>
          </li>
        </ul>
        </div>
        <div v-if="menuOnly" class="divider"/>
        <div class="navigation__social">
          <a :href="twitterLink" target="_blank">
            <svgicon icon="social/twitterFull"/>
          </a>
          <a :href="youtubeLink" target="_blank">
            <svgicon icon="social/youtubeFull"/>
          </a>
            <a :href="facebookLink" target="_blank">
            <svgicon icon="social/facebook"/>
          </a>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "FooterLinks",
  
  props: {
    linkComponent: {
      type: String,
      default: "nuxt-link"
    },
    twitterLink: {
      type: String,
      default: "https://twitter.com/sparc_science"
    },
    youtubeLink: {
      type: String,
      default: "https://www.youtube.com/results?search_query=sparc+nih"
    },
    facebookLink: {
      type: String,
      default: "https://www.facebook.com/12-labours"
    },
    footerLinks: {
      type: Array,
      default: function() { return [
          {
            title: "terms-of-service",
            displayTitle: "Terms of Service",
            href: "/terms-of-service"
          },
          {
            title: "privacy-policy",
            displayTitle: "Privacy Policy",
            href: "/privacy"
          },
          {
            title: "site-feedback",
            displayTitle: "Site Feedback",
            href: "/site-feedback"
          },
          {
            title: "contact",
            displayTitle: "Contact",
            href: "/contact"
          }
        ]
      }
    },
    currentPath: {
      type: String,
      default: "/"
    },
    menuOnly:{
      type:Boolean,
      default:false
    }
  },

  computed: {
    alterStyles () {
      return {
          '--main-align': this.menuOnly ? 'center' : 'flex-end',
          '--list-item-align': this.menuOnly ? 'center' : 'right',
          '--list-item-font-size': this.menuOnly ? '0.875rem' : '1rem',
          '--list-item-font-weight': this.menuOnly ? '400' : '600',
          '--list-item-line-height': this.menuOnly ? '0.75rem' : '1.125rem',
          '--social-align':this.menuOnly ? 'center' : 'flex-end'
      }
    }
  }
};
</script>


<style scoped lang="scss">

.footer-links {
  background-color: $grey;
}

.navigation{
  display: flex;
  flex-direction: column;
  justify-content:var(--main-align);
  padding:0.5rem 0rem; 

  &__links{
    ul {
      list-style: none;
      text-align:var(--list-item-align);
      margin:0rem;
      padding:0rem;
      li {
        margin-bottom:0.5rem;
        a {
          text-decoration: none  !important;
          font-weight:var(--list-item-font-weight);
          font-size:var(--list-item-font-size);
          line-height:var(--list-item-line-height);
          color: $cochlear !important; 
          &.active,&:hover, &:focus {
            color: $cochlear;
          }
        }
      }
    } 
  }

  &__social{
    display: flex;
    justify-content: var(--social-align);  
      column-gap:0.5rem;
  }
}  

.svg-fill{
  color:$grey;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  height:1.63rem;
  width:1.63rem;
  padding:0.25rem;
  border-radius:2px;
}


.divider {
  border: none;
  clear: both;
  display: block;
  background-color: $lightGrey;
  height: 1px;
  margin-bottom: 0.5rem;
}
</style>