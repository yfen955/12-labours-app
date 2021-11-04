<template>
  <div class="container-default shaded vertical-flex" :style="this.hideBgColor? bgStyle : ''">
    <div class="top-heading">
      <h1>
        HOW CAN THE PORTAL HELP?
      </h1>
    </div>       
    <div class="helper cards-in-row">
      <card class="item" :specs="helpResearchers"/>
      <card class="item" :specs="helpClinicians"/>
      <card class="item" :specs="helpPatients"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Portalhelp',

  props: {
    hideBgColor:{
      type:Boolean,
      default:false
    }
  },

  data: ()=>{
    return {
      helpResearchers:{
        title:'Researchers',
        imgFile:'researcher-in-frame.png',
        detail:' Want access to the latest data, or share your research with others? Then the 12 Labours Portal is the place to be.',
        btnLink:{caption:'Find Research Data', to:'/'}
      },
      helpClinicians:{
        title:'Clinicians',
        imgFile:'doctor-in-frame.png',
        detail:'The 12 Labours Portal allows you to access and upload data to visualise results that may aid prognosis and help you to develop your treatment plans.',
        btnLink:{caption:'Learn about Workflows', to:'/'}
      },
      helpPatients:{
        title:'Patients',
        imgFile:'patient-in-frame.png',
        detail:'Want to track your health status or set personal health improvement goals? The portal allows you to link your health records with your health devices.',
        btnLink:{caption:'Learn Health Tracking', to:'/'}
      }
    }
  },

  computed: {
    bgStyle () { 
      return {              
          'background-color': '#FFFFFF'               
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .helper{
    padding-bottom:40px;
  }
</style>