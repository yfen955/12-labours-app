<template>
  <div class="about-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div>
      <h4>
        {{ values.title.toUpperCase() }}
      </h4>
      <div v-html="values.content.html" />
    </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'AboutPage',

  async asyncData({$graphcms}) {
    return await graphcmsQuery.content($graphcms, 'about_long');
  },

  data: () => {
    return {
      pageTitle: 'ABOUT',
      breadcrumb: [
        {
          to: {
            name: 'index'
          },
          label: 'HOME'
        }
      ],
    }
  }
}
</script>

<style scoped lang="scss">

.page {
  display: flex;
  margin-top: 7rem;

  p {
    color: #606266;
  }
}

.subpage {
  .subpage-col {
    @media screen and (max-width: 767px) {
      margin-top: 0;
    }
    .about-page-text {
      @media screen and (max-width: 767px) {
        margin-left: 0;
      }
    }

    .about-page-portal-img-mobile {
      display: none;
      @media screen and (max-width: 767px) {
        display: block;
        margin-bottom: 1.25rem;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .about-page-portal-img {
      display: none;
    }
  }

  .row {
    display: flex;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
  }
}

.about-page-link {
  color: white;
  text-decoration: underline;
  &:hover {
    color: #909399;
  }
}

.about-page-button {
  width: 12.3rem;
  height: 2.5rem;
  border-radius: 0.25em;
  margin-top: 1rem;
  background: #fff;
  a {
    font-size: 1.25em;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: uppercase;
    text-decoration: none;
  }
}

.about-teams-and-projects-button {
  text-transform: uppercase;
  height: 2.5rem;
  width: 12.4rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-weight: 500;
  a {
    text-decoration: none;
    color: #fff;
  }
  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
}

.about {
  text-align: center;
  min-height: 50vh;
  margin-top: 9rem;
}
</style>
