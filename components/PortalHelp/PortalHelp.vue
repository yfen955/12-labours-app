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
        detail:' Want access to the latest data, or share your research with others? Then the 12 Labours Portal is the place to be.',
        //btnLink:{caption:'Find Research Data', to:'/'}
        btnLink:{caption:'Learn More', to:'/'}
      },
      helpClinicians:{
        title:'Clinicians',
        imgFile:'doctor-in-frame.png',
        detail:'The 12 Labours Portal allows you to access and upload data to visualise results that may aid prognosis and help you to develop your treatment plans.',
        //btnLink:{caption:'Learn about Workflows', to:'/'}
        btnLink:{caption:'Learn More', to:'/'}
      },
      helpPatients:{
        title:'Patients',
        imgFile:'patient-in-frame.png',
        detail:'Want to track your health status or set personal health improvement goals? The portal allows you to link your health records with your health devices.',
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