<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <banner :banner-data="banner.values" height="30rem"/>   <!-- Optional height attribute to display varying heights-->
    <div class="container-default">
      <div class="default-inner">                 
        There are two ways to discover data and models within the 12 Labours portal.
        <ul>  
          <li>Interactive viewer - allows you to traverse a 3D scaffold of the human body/organs and drill down across the multiple levels of physiological modelling.</li>
          <li>Data browser - allows you to search for data & models using filters and tags.</li>
        </ul>
      </div> 
      <div class="wide-cards">
        <card-small class="item" :specs="interactiveViewerSpecs"/>
        <card-small class="item" :specs="dataBrowserSpecs"/>
      </div>          
    </div>
  </div>
</template>

<script>
  
import graphcmsQuery from '@/services/graphcmsQuery'

export default {
  name: "DataAndModelsPage",

  async asyncData({$graphcms}) {  
    const banner= await graphcmsQuery.banner($graphcms, 'data_and_models');
    return {banner}
  },

  data: () => {
    return {
      pageTitle: "Data & Models",
      breadcrumb: [
        {
          to: {
            name: "index",
          },
          label: "Home",
        }
      ],
      interactiveViewerSpecs:{
        title:'Interactive Viewer',
        imgFile:'patient-in-frame.png',
        detail:'View the interactive 3D whole body map',
        btnLink:{caption:'Launch Interactive Viewer', to: {
            name: 'data-maps-scaffold-id',
            params: {
              id: '7a0f44d7-98c6-4ced-bd5f-58a68b31fc8f',   // use a default id for the scaffold
            }
          }
        }
      },
      dataBrowserSpecs:{
        title:'data browser',
        imgFile:'researcher-in-frame.png',
        detail:'Browse data and models.',
        btnLink:{
          caption:'View Data Browser',
          to: {
            path: '/data/browser',
            query: {
              type: 'dataset',
              page: 1,
              limit: 10,
            }
          }
        }
      }
    }
  }
}

</script>

<style scoped lang="scss">
  ul{
    padding-bottom:1rem;
  }
</style>