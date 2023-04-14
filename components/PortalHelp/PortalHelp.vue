<template>
  <div class="container-default">
    <div class="top-heading">
      <h1>
        HOW CAN THE PORTAL HELP?
      </h1>
    </div>    
    <div class="cards-in-row">
      <card :specs="helpResearchers"/>
      <card :specs="helpClinicians"/>
      <card :specs="helpPatients"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortalHelp',

  data: ()=>{
    return {
      helpResearchers:{
        title:'Researchers',
        imgFile:'researcher-in-frame.png',
        detail:'This website offers computational modelling tools aimed at advancing personalised medicine and clinical research. Researchers can utilise the tool to support their studies and gain insights into various medical conditions.',
        //btnLink:{caption:'Find Research Data', to:'/'}
        btnLink:{caption:'Learn More', to:'/'}
      },
      helpClinicians:{
        title:'Clinicians',
        imgFile:'clinician-in-frame.png',
        detail:'This website provides a valuable resource for clinicians by offering a computational modeling tool for medical research. Clinicians will be able to access/input medical imaging data to create computational models. The tool can help clinicians in making informed decisions for their patients, as well as support their ongoing research efforts.',
        //btnLink:{caption:'Learn about Workflows', to:'/'}
        btnLink:{caption:'Learn More', to:'/'}
      },
      helpPatients:{
        title:'Patients',
        imgFile:'patient-in-frame.png',
        detail:'This website is dedicated to advancing medical research and personalized medicine through computational modeling. Patients can access information about the research being conducted, and may benefit from the results of this research in the future. Patients will also be able to access their health records with your health devices.',
        //btnLink:{caption:'More about Health Tracking', to:'/'}
        btnLink:{caption:'Learn More', to:'/'}
      }
    }
  }
}
</script>

<style scoped lang="scss">

  .test{}    /*** Empty CSS to handle bug on dependency: 'Some styles used above won't work without this empty CSS'  ***/

</style>