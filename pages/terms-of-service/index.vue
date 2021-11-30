<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <section-with-image :title="pageTitle"> 
      <div v-html="termsOfService"/>
    </section-with-image>
    <div class="container-default">
      <div class="top-heading">
        <h1>
          DEFINITIONS
        </h1>
      </div>
      <div class="terms-text" v-html="definitions">                  
      </div> 
    </div>
    <div class="container-default shaded">
      <div class="top-heading">
        <h1>
          ACCOUNT TERMS
        </h1>
      </div>
      <div class="terms-text">                 
          <span v-html="accountTerms1"></span><br/><br/>
          <span v-html="accountTerms2"></span>
      </div> 
    </div>
    <div class="container-default">
      <div class="top-heading">
        <h1>
          USER CODE OF CONDUCT
        </h1>
      </div>
      <div class="terms-text" v-html="codeOfConduct"/>                                    
    </div>                          
  </div>
</template>          


<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default { 
    name: 'TermsOfServicePage',
  
    async asyncData({$graphcms}) {
        return await graphcmsQuery.multiContent($graphcms,"terms_of_service")
    },

    data: () => {
      return {      
        pageTitle: 'Terms of Service',
        breadcrumb: [
            {
            to: { name: 'index'},
            label: 'Home'
            }
        ]
      }
    },

    created(){
      this.termsOfService=this.values.contents[0].html
      this.definitions=this.values.contents[1].html
      this.accountTerms1=this.values.contents[2].html
      this.accountTerms2=this.values.contents[3].html
      this.codeOfConduct=this.values.contents[4].html
    }
  }

  </script>

<style scoped lang="scss">

 .terms-text{
    padding-left:2rem;
  }
  
</style>