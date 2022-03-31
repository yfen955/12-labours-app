<template>
  <div></div>
</template>

<script>

export default { 
  
  validate({ query}) {
    return query.code && query.state 
  },

  async asyncData({$axios,$auth,redirect,query}) {
    try{
      const googleCode=query.code
      let response = await $axios.post(`/user/google/login`, {code:googleCode})
      .then((response)=>{     
        if(response.status===200){
          if(response.data.createAccount){
            const payload=response.data.googleProfile
            if(!payload){throw new Error('Google profile not found') }
            $auth.$storage.setCookie('googleProfile', payload, true)
            redirect('/signup?strategy=google')    
          }
          else{         
            $auth.strategy.token.set(response.data.access_token)
            redirect('/?login=true')
          }
        }
      })
    }
    catch(error){
      const msg=error.response? error.response.data.message : error
      //console.log("Err : " + msg)   
      redirect('/login?err=true')
    }
  },
}


</script>