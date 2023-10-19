<template>
  <div class="page-outer">
    <div class="banner-home">
      <div class="title-box">
        <span>
          Welcome to the <br />
          12 Labours Portal, the gateway<br />
          to predictive <br />medical modelling
        </span>
      </div>
    </div>
    <portal-help />
    <div class="container-default shaded">
      <div class="top-heading">
        <h1>{{ content.values.title }}</h1>
      </div>
      <div class="default-inner">
        <div v-html="content.values.content.html" />
        <div class="nav-about">
          <!-- <nuxt-link to="/about/">
            FIND OUT MORE ABOUT THE 12 LABOURS PROJECT
          </nuxt-link> -->
        </div>
      </div>
    </div>
    <latest-news :news-list="topNews.newsList" hide-bg-color />
  </div>
</template>

<script>
import graphcmsQuery from "@/services/graphcmsQuery";
import backendQuery from "@/services/backendQuery";

export default {
  name: "App",

  async asyncData({ $graphcms }) {
    const content = await graphcmsQuery.content($graphcms, "about");
    const topNews = await graphcmsQuery.topNews($graphcms, 3);
    return { content, topNews };
  },

  methods: {
    privateTokenExist() {
      const token = backendQuery.getLocalStorage("query_access_token");
      return !token || token === this.$config.query_access_token ? false : true;
    },
  },

  async mounted() {
    const loginSuccess = this.$route.query.login;
    if (loginSuccess && !this.privateTokenExist()) {
      this.$toast.success("Successfully Logged In!", {
        duration: 3000,
        position: "bottom-right",
      });
      await backendQuery.fetchAccessToken(
        this.$config.query_api_url,
        this.$auth.$state.user.email
      );
    }
  },
};
</script>

<style scoped lang="scss">
.banner-home {
  display: flex;

  background: url("~static/img/digital-twin.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;

  justify-content: flex-end;
  padding-right: 3.75rem;
  padding-top: 12.81rem;
  height: 60rem;
  box-sizing: border-box;

  @media only screen and (max-width: $viewport-md) {
    justify-content: center;
    padding: 6rem 1rem;
    height: fit-content;
  }
}

.title-box {
  min-width: 15rem;
  margin: auto;
  height: fit-content;
  border-radius: 1.25rem;
  background-color: $blue;
  display: flex;
  padding: 2.25rem;

  span {
    font-weight: bold;
    font-size: 2.5rem;
    line-height: 2.75rem;
    color: $cochlear;

    @media only screen and (max-width: $viewport-sm) {
      font-size: 2rem;
      line-height: 2rem;
    }
  }
}

.nav-about {
  padding-top: 1rem;
  text-align: right;

  a {
    font-weight: 600;
  }
}
</style>
