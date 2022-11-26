<template>
  <div>
    <h4>Your Account</h4>
    <el-menu
      :default-active="$route.path"
      :router="true"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/profile">
        <i class="el-icon-location"></i>
        <span slot="title">View Profile</span>
      </el-menu-item>
      <el-menu-item index="/profile/edit">
        <i class="el-icon-menu"></i>
        <span slot="title">Edit Profile</span>
      </el-menu-item>
      <el-menu-item index="/profile/password" :disabled="strategy!='local'">
        <i class="el-icon-document"></i>
        <span slot="title">Change Password</span>
      </el-menu-item>
      <el-menu-item index="/profile/delete">
        <i class="el-icon-setting"></i>
        <span slot="title">Delete Account</span>
      </el-menu-item>
    </el-menu>
  </div>
  
</template>

<script>
export default {
  name: "NavigationBar",

  computed:{
    strategy() {
      return this.$store.state.auth.strategy;
    }
  },
}
</script>

<style scoped lang="scss">
h4 {
  padding-top: 2em;
  text-align: center;
}
.el-menu {
  padding-top: 1em;
  border: none;
}
.el-menu-item {
  border: 1px solid #ececee;

  &.is-active {
    background-color: $background;
  }
}
</style>