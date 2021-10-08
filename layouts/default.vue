<template>
  <div>
    <twelve-labours-header>
      <template v-slot:logo>
        <img class="header-logo" src="img/12-labours-logo-black.png" alt="Logo for 12 Labours">
      </template>
    </twelve-labours-header>
    <nuxt />
    <twelve-labours-footer>
      <template v-slot:logo>
        <img class="footer-logo" src="img/12-labours-logo-primary.png" alt="Logo for 12 Labours">
      </template>
    </twelve-labours-footer>
  </div>
</template>

<style lang="scss" scoped>
.header-logo {
  display: block;
  height: auto;
  width: 100%;
}
.footer-logo
{
  height: 200px;   
  width: 233px;  
  white-space: nowrap;
}

</style>

