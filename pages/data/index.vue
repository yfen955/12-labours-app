<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()" />
    <banner :banner-data="banner.values" height="480px"/>   <!-- Optional height attribute to display varying heights-->
    <div class="container-default">
      <div class="default-inner">                 
        There are two ways to discover data and models within the 12 Labours portal.
        <ul>  
          <li>Interactive viewer - allows you to traverse a 3D scaffold of the human body and drill down across the multiple levels of physiological modelling.</li>
          <li>Data browser - allows you to search for data & models using filters and tags.</li>
        </ul>
        <div class="data-explorer">
          <div class="item">
            <interactive-viewer/>
          </div>
          <div class="item">
            <data-browser/>
          </div>
        </div>
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
          label: "HOME",
        }
      ]
    }
  }
}

</script>

<style scoped lang="scss">

.data-explorer{
  display:flex;
  justify-content: space-between;
  padding-top:40px;
}

.item{
  width: 49%;
}

</style>