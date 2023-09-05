<template>
  <div>
    <twelve-labours-header2 :auth="$auth" :headerLinks="headerLinks" @isSignOut="signOut">
      <template v-slot:logo>
        <img class="header-logo" :src="headerLogo" alt="Logo for 12 Labours">
      </template>
    </twelve-labours-header2>
    <nuxt />
    <twelve-labours-footer :footerLinks="footerLinks">
      <template v-slot:logo>
        <img class="footer-logo" :src="footerLogo" alt="Logo for 12 Labours">
      </template>
    </twelve-labours-footer>
  </div>
</template>

<script>
import backendQuery from '@/services/backendQuery';

export default {
  data: function () {
    return {
      headerLogo: require('../static/img/12-labours-logo-black.png'),
      headerLinks: [
        {
          title: "data-and-models",
          displayTitle: "Data & Models",
          href: "/data?type=dataset",
        },
        {
          title: "resources",
          displayTitle: "Resources",
          href: "/resources",
        },
        {
          title: "about",
          displayTitle: "About",
          href: "/about",
        },
        {
          title: "news-and-events",
          displayTitle: "News & Events",
          href: "/news-and-events",
        },
        // {
        //   title: "search",
        //   displayTitle: "Search",
        //   href: "/search",
        // },
      ],
      footerLogo: require('../static/img/12-labours-logo-primary.png'),
      footerLinks: [
        {
          title: "terms-of-service",
          displayTitle: "Terms of Service",
          href: "/terms-of-service"
        },
        {
          title: "privacy-policy",
          displayTitle: "Privacy Policy",
          href: "/"
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

  methods: {
    async signOut(bool) {
      if (bool) {
        await backendQuery.revokeAccess(this.$config.query_api_url);
      }
    },

    // clean the access_token after auto logout
    checkAutoLogout() {
      let expiration = localStorage.getItem("auth.strategy") === "local" ? localStorage.getItem("auth._token_expiration.local") : localStorage.getItem("auth._token_expiration.google");
      let current = new Date().getTime();
      if (expiration && expiration < current && localStorage.getItem("access_token"))
        this.signOut(true);
    }
  },

  mounted: function() {
    this.checkAutoLogout();
  },
  
  watch: {
    '$route.fullPath': function () {
      this.checkAutoLogout();
    },
  },
}
</script>

<style lang="scss" scoped>
.header-logo {
  display: block;
  height: auto;
  width: 100%;
}

.footer-logo {
  height: 12.5rem;
  width: 14.56rem;
  white-space: nowrap;
}
</style>
