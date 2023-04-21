<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Patients</h1>
      <br>
      <p>This website is dedicated to advancing medical research and personalized medicine through computational modeling. Patients can access information about the research being conducted, and may benefit from the results of this research in the future. Patients will also be able to access their health records with your health devices.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientsPage',
  data: () => {
    return {
      pageTitle: 'Patients',
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'Home'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
// 
  </style>