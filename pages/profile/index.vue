<template>
  <div class="page-outer">
    <div class="profile-container">
      <NavBar />
      <div class="profile container-default">
        <div class="top-heading">
          <h1>PROFILE</h1> 
        </div>

        <div v-if="user" class="user-detail">
          <div>
            <h3>Title:</h3>
            <span>{{user.title}}</span>
          </div>
          <div>
            <h3>Email:</h3>
            <span>{{user.email}}</span>
          </div>
          <div>
            <h3>First Name:</h3>
            <span>{{user.first_name}}</span>
          </div>           
          <div>
            <h3>Last Name:</h3>
            <span>{{user.last_name}}</span>
          </div>
          <div>
            <h3>User Type:</h3>
            <span>{{user.type_name}}</span>
          </div>
          <div v-if="user.type_name=='Clinician' || user.type_name=='Researcher'">
            <h3>Profession:</h3>
            <span>{{user.profession}}</span>
          </div>
          <div v-if="user.type_name=='Patient'">
            <h3>NHI:</h3>
            <span>{{user.nhi}}</span>
          </div>
          <div v-if="user.type_name=='Clinician'">
            <h3>HPI:</h3>
            <span>{{user.hpi}}</span>
          </div> 
          <div v-if="user.dhb_name">
            <h3>DHB:</h3>
            <span>{{user.dhb_name}}</span>
          </div>
          <div v-if="user.hospital_name">
            <h3>Hospital:</h3>
            <span>{{user.hospital_name}}</span>
          </div>  
          <div v-if="user.institution_name">
            <h3>Institution:</h3>
            <span>{{user.institution_name}}</span>
          </div>
        </div>
      </div>
      <div class="signup-picture"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/Profile/NavBar.vue";

export default { 
  name: 'ProfilePage',
  //middleware: 'auth',
  components: { NavBar },
      
  async asyncData({$auth,redirect, $configGetter}) {
    $configGetter()
    if(!$auth.loggedIn ||  !$auth.user || !$auth.strategy.token.status().valid()){     
      return redirect('/login');
    }

    const user=$auth.user
    return{user}
  },
}

</script>

<style scoped lang="scss">
  .user-detail {
    div{
      margin:2rem;
      display:flex;
      h3 {
        justify-content: space-between;
        align-items: center;
        min-width: 7rem;
      }
      @media only screen and (max-width: $viewport-md) {
        flex-direction: column;
        span {
          margin-top: 1rem;
        }
      }
    }
  }
</style>