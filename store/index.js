export const state = () => ({
  googleProfile:{}
});

export const getters = {
  getGoogleProfile: state => state.googleProfile
}


export const mutations = {
  setGoogleProfile(state,newProfile){
    state.googleProfile=newProfile
  }
};
