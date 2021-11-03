<template>
  <card-small :specs="cardSpecs"/>
</template>

<script>
export default {
    name: 'InteractiveViewer',

  data: () => {
    return {
      cardSpecs:{
        title:'Interactive Viewer',
        imgFile:'patient-in-frame.png',
        detail:'  View the interactive 3D scaffold',
        btnLink:{caption:'Launch Interactive Viewer', to:'https://sparc.science/maps', external:true}
      }
    }
  }
}
</script>
