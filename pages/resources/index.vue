<template>
  <div class="page-outer vertical-flex">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <banner :banner-data="banner.values" height="30rem"/>   <!-- Optional height attribute to display varying heights-->
    <div class="container-default">                
      <div class="wide-cards">
        <card-small class="item" :specs="dataAndModels"/>
        <card-small class="item" :specs="tools"/>
      </div>          
    </div>
    <div class="container-default shaded">
       <div class="top-heading">
        <h1>
          RESOURCES
        </h1>
      </div>    
      <div class="cards-in-row">
        <card :specs="technicalResources"/>
        <card :specs="educationalResources"/>
        <card :specs="medicalResources"/>
      </div>
    </div>
  </div>
</template>

<script>
  
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: "ResourcesPage",

  async asyncData({$graphcms}) {  
    const banner= await graphcmsQuery.banner($graphcms, 'resources');
    return {banner}
  },

  data: () => {
    return {
      pageTitle: "Resources",
      breadcrumb: [
        {
          to: {
            name: "index",
          },
          label: "Home",
        }
      ],
      dataAndModels:{
        title:' Data and Models',
        imgFile:'patient-in-frame.png',
        detail:'  Want the latest research data and models.',
        btnLink:{caption:'Find Research Data', to:'/data'}
      },
      tools:{
        title:'Tools',
        imgFile:'researcher-in-frame.png',
        detail:'Want the latest research tools.',
        btnLink:{caption:'Find Research Tools', to:'/'}
      },
      technicalResources:{
        title:'Technical Resources',
        imgFile:'researcher-in-frame.png',
        detail:'Learn all about API Access, how to use the modelling workflows and how to connect devices to models.',
        //btnLink:{caption:'View Technical Resources', to:'/'}
        btnLink:{caption:'View More', to:'/'}
      },
      educationalResources:{
        title:'Educational Resources',
        imgFile:'clinician-in-frame.png',
        detail:'Learn all about the educational benefits the 12 Labours portal could help.',
        //btnLink:{caption:'View Educational Resources', to:'/resources/educational'}
        btnLink:{caption:'View More',  to:'/resources/educational'}
      },
      medicalResources:{
        title:'Medical Resources',
        imgFile:'patient-in-frame.png',
        detail:'Learn all about the medical benefits the 12 Labours portal could help, including disease information and publications.',
        //btnLink:{caption:'View Medical Resources', to:'/'}
        btnLink:{caption:'View More', to:'/'}
      }
    }
  }
}

</script>

<style scoped lang="scss">
  .must-have-css{}
</style>