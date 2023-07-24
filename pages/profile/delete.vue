<template>
  <div class="page-outer">
    <div class="profile-container">
      <NavBar />
      <div class="profile container-default" :class="strategy == 'google' ? 'shaded' : ''">
        <div class="top-heading">
          <h1>DELETE ACCOUNT</h1>
        </div>
        <div class="flex-box fields">
          <div v-if="deleteError" class="err-message">
            {{ deleteError }}
          </div>
          <div class="box">
            <h3>We are sorry to see you going.</h3>
            <h5>Please note this action can not be undone and you will lose all your data.</h5>
            <div class="nav-button">
              <el-button v-if="!yesDelete" @click="yesDelete = true">
                Delete My Account
              </el-button>
              <div v-else>
                <el-button @click="deleteUser">Confirm </el-button>
                <el-button @click="yesDelete = false">Cancel</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="signup-picture"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/Profile/NavBar.vue";
import backendQuery from '@/services/backendQuery';

export default {
  components: { NavBar },
  data: () => {
    return {
      deleteError: null,
      yesDelete: false
    }
  },

  async asyncData({ $auth, redirect }) {
    if (!$auth.loggedIn || !$auth.user || !$auth.strategy.token.status().valid()) {
      return redirect('/login');
    }

    const user = $auth.user
    return { user }
  },

  computed: {
    strategy() {
      return this.$auth.$state.strategy;
    }
  },

  methods: {
    async deleteUser() {
      try {
        this.verifyLoggedIn();
        let response = await this.$axios.post('/user/local/delete', {
          userId: this.user.user_id
        })
        if (response.status === 200) {
          await this.$auth.logout().then(() => {
            this.$toast.success('Your account is deleted successfully!', { duration: 3000, position: 'bottom-right' })
          })
          await backendQuery.revokeAccess(this.$config.query_api_url);
          this.$router.replace('/')
        }
      }
      catch (err) {
        this.deleteError = err.response ? err.response.data.message : err.message
      }
    },

    verifyLoggedIn() {
      if (!this.$auth.loggedIn || !this.$auth.user || !this.$auth.strategy.token.status().valid()) {
        this.$toast.error('Your session has expired. Please login again!', { duration: 3000, position: 'bottom-right' })
        this.$router.replace('/login')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fields {
  width: 100%;
  justify-content: center;
}

.flex-box {
  height: 30em;
}

.el-button+.el-button {
  margin-left: 0;
}
</style>