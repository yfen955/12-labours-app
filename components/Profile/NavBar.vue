<template>
  <div class="nav-container">
    <h4>Your Account</h4>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="/profile" @click="handleChange('/profile')">
        <i class="el-icon-location"></i>
        <span slot="title">View Profile</span>
      </el-menu-item>
      <el-menu-item index="/profile/edit" @click="handleChange('/profile/edit')">
        <i class="el-icon-menu"></i>
        <span slot="title">Edit Profile</span>
      </el-menu-item>
      <el-menu-item index="/profile/password" :disabled="strategy!='local'" @click="handleChange('/profile/password')">
        <i class="el-icon-document"></i>
        <span slot="title">Change Password</span>
      </el-menu-item>
      <el-menu-item index="/profile/delete" @click="handleChange('/profile/delete')">
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

  methods: {
    handleChange(path) {
      if (this.$route.path != path) {
        this.$router.push({
          path: path,
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.nav-container {
  min-width: 15rem;
}
h4 {
  padding-top: 2rem;
  text-align: center;
}
.el-menu {
  margin-top: 1rem;
  border: none;
}
.el-menu-item {
  border: 1px solid #ececee;

  &.is-active {
    background-color: $background;
  }
}
</style>