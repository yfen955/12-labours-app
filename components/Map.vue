<template>
  <div>
    <client-only placeholder="Loading scaffold ...">
      <div class="scaffoldvuer-container">
        <ScaffoldVuer :url='location' style="height:90%" />
      </div>
    </client-only>
  </div>
  
</template>

<script>
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';

export default {
    name: 'Map',
    components: { 
      ScaffoldVuer: process.client
        ? () => import('@abi-software/scaffoldvuer').then(m => m.ScaffoldVuer)
        : null
    },
    props: ['location'],
}
</script>

<style>
.scaffoldvuer-container {
  height: 90vh;
  max-width: calc(100% - 48px);
  left: 24px;
  overflow: hidden;
  position: relative;
}
</style>