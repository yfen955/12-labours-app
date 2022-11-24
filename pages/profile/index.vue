<template>
  <div class="page-outer">
    <div class="flex-box">
      <NavBar />
      <div class="profile container-default">
        <div class="top-heading">
          <h1>PROFILE</h1> 
        </div>
        <div v-if="user" class="user-detail">
          <div>
            <div><h3>Title:</h3></div>
            <div><span>{{user.title}}</span></div>
          </div>
          <div>
            <div><h3>Email:</h3></div>
            <div><span>{{user.email}}</span></div>
          </div>
          <div>
            <div><h3>First Name:</h3></div>
            <div><span>{{user.first_name}}</span></div>
          </div>           
          <div>
            <div><h3>Last Name:</h3></div>
            <div><span>{{user.last_name}}</span></div>
          </div>
          <div>
            <div><h3>User Type:</h3></div>
            <div><span>{{user.type_name}}</span></div>
          </div>
          <div v-if="user.type_name=='Clinician' || user.type_name=='Researcher'">
            <div><h3>Profession:</h3></div>
            <div><span>{{user.profession}}</span></div>
          </div>
          <div v-if="user.type_name=='Patient'">
            <div><h3>NHI:</h3></div>
            <div><span>{{user.nhi}}</span></div>
          </div>
          <div v-if="user.type_name=='Clinician'">
            <div><h3>HPI:</h3></div>
            <div><span>{{user.hpi}}</span></div>
          </div> 
          <div v-if="user.dhb_name">
            <div><h3>DHB:</h3></div>
            <div><span>{{user.dhb_name}}</span></div>
          </div>
          <div v-if="user.hospital_name">
            <div><h3>Hospital:</h3></div>
            <div><span>{{user.hospital_name}}</span></div>
          </div>  
          <div v-if="user.institution_name">
            <div><h3>Institution:</h3></div>
            <div><span>{{user.institution_name}}</span></div>
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
      
  async asyncData({$auth,redirect}) {
    if(!$auth.loggedIn ||  !$auth.user || !$auth.strategy.token.status().valid()){     
      return redirect('/login');
    }

    const user=$auth.user
    return{user}
  },
}

</script>

<style scoped lang="scss">
  .box{
    padding:0.5rem 0rem 2rem 0rem;
    @media only screen and (max-width:  $viewport-sm) {
      padding:0.5rem 0rem 0.5rem 0;
    }
  }

  .profile{
    width:50%;
    @media only screen and (max-width:  $viewport-sm) {
      width:100%;
    }
    box-sizing:border-box;
  }

  .user-detail{
    div{
      margin:0.5rem;
      display:flex;
      column-gap:0.5rem;
      > div:first-child {
        display:flex;
        justify-content: flex-end;
        width:30%;
      }
      > div:nth-of-type(2) {
        width:70%;
      }
      @media only screen and (max-width:  $viewport-sm) {
        display-direction:vertical;
        row-gap:0.2rem;
      }
    }
  }
  
  .flex-box {
    height: 30em;
  }
</style>