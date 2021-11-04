<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
      <div class="shaded with-background-image">
        <div class="top-heading">
          <h1>
            TERMS OF SERVICE
          </h1>
        </div>
        <div class="terms-text with-bg-image" v-html="termsOfService">                             
        </div> 
      </div>  
      <div class="transparent">
        <div class="top-heading">
          <h1>
            DEFINITIONS
          </h1>
        </div>
        <div class="terms-text" v-html="definitions">                  
        </div> 
      </div>
      <div class="shaded">
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
      <div class="transparent">
        <div class="top-heading">
          <h1>
            USER CODE OF CONDUCT
          </h1>
        </div>
        <div class="terms-text" v-html="codeOfConduct">                                    
        </div> 
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
        pageTitle: 'TERMS OF SERVICE',
        breadcrumb: [
            {
            to: { name: 'index'},
            label: 'HOME'
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

    .shaded{
      @extend .container-default;
      background-color:$background;

      &.with-background-image{
        background-image: url("~static/img/researcher-doctor.png");
        background-repeat: no-repeat;
        background-position:right 124px top 50px;
        background-size: 224px 330px;
      }
    }

    .transparent{
      @extend .container-default;
      background-color:$cochlear;
    }

    .terms-text{
      padding-left:32px;
      padding-bottom:40px;

      &.with-bg-image{
        padding-right:300px;
        padding-bottom:160px; 
      }
    }
</style>