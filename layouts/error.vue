<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="page-wrap container">
      <div class="subpage">
        <div>
          <h4>
            PAGE NOT FOUND
          </h4>
          <div>
            <p>
              I am sorry but we cannot find what you have been looking for.
            </p>
            <p>        
              Maybe the page has moved - we suggest visiting the homepage to help you discover what you are looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: 'ErrorPage',

  data: () => {
    return {
      pageTitle: 'PAGE NOT FOUND',
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