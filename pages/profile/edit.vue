<template>
  <div class="page-outer">
    <div class="profile-container">
      <NavBar />
      <div class="profile container-default">
        <div class="top-heading">
          <h1>EDIT PROFILE</h1>
        </div>
        <div class="flex-box fields">
          <el-form label-position="top">
            <el-form-item> 
              <div class="error">{{error}}</div>
            </el-form-item>
            <contact-info 
              :show-bg=false 
              :phone-data={visible:false} 
              :email-data={visible:false}
              :confirm-email-data={visible:false}
              :title-data="{value: user.title}"
              :first-name-data="{value: user.first_name}"
              :last-name-data="{value: user.last_name}"
              @field-change="getField"
            />
            <el-form-item :required="profession.required" :label="profession.display" v-if="userType=='researcher' || userType=='clinician'" >
              <el-input 
                v-model="profession.value" 
                @input="fieldChange('profession')" 
                :placeholder="profession.placeholder"
                :maxlength="profession.maxLength">
              </el-input>
              <div class="error">
                {{profession.message}}
              </div>
            </el-form-item>  
            <el-form-item :required="institution.required" :label="institution.display" v-if="userType=='researcher'" >
              <el-select v-model="institution.value" :placeholder="institution.placeholder" @change="selectChange('institution')">
                <el-option v-for="item in institutions"
                  :key="item.value"
                  :label="item.display"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="error">
                {{institution.message}}
              </div>
            </el-form-item>   
            <el-form-item :required="hospital.required" :label="hospital.display" v-if="userType=='clinician'">
              <el-select v-model="hospital.value" :placeholder="hospital.placeholder" @change="selectChange('hospital')">
                <el-option v-for="item in hospitals"
                  :key="item.value"
                  :label="item.display"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="error">
                {{hospital.message}}
              </div>
            </el-form-item>   
            <el-form-item :required="dhb.required" :label="dhb.display" v-if="userType=='patient' || userType=='clinician'">
              <el-select v-model="dhb.value" :placeholder="dhb.placeholder" @change="selectChange('dhb')">
                <el-option-group v-for="group in dhbs" :key="group.label" :label="group.label">
                  <el-option v-for="item in group.options"
                    :key="item.value"
                    :label="item.display"
                    :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-button :disabled="submitDisabled" @click="handleConfirm">
              Confirm
            </el-button>  
          </el-form>
        </div>
      </div>
      <div class="signup-picture"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/Profile/NavBar.vue";

export default {
  components: { NavBar },
  data: () => {
    return {   
      error:'',
      userType:'',
      userTitle:'',
      submitDisabled:true, 
      contactInfoValues:{},   
      profession:
        {display:'Profession', value:null, message:'', required:true,maxLength:255,placeholder:'Enter your profession'},
      institution:
        {display:'Institution', value:null, message:'', required:true,placeholder:'Select your institution'},
      hospital:
        {display:'Healthcare center/Hospital', value:null, message:'', required:true,placeholder:'Select your hospital'},
      dhb:
        {display:'DHB', value:null,message:'', required:true,placeholder:'Select your DHB'},
      invalidFields:[],
      changeCount: 0,
    }
  },

  created(){
    this.userType = this.user.type_name.toLowerCase();
    this.userTitle = this.user.title;
    this.profession.value = this.user.profession ? this.user.profession : null;
    this.institution.value = this.user.institution_name ? this.findId(this.user.institution_name, this.institutions) : null;
    this.hospital.value = this.findId(this.user.hospital_name, this.hospitals);
    for (let i = 0; i < this.dhbs.length; i++) {
      this.dhb.value = this.findId(this.user.dhb_name, this.dhbs[i].options);
      if (this.dhb.value)
        break
    }
  },

  async asyncData({$auth,redirect,$axios,query}) {
    if(!$auth.loggedIn ||  !$auth.user || !$auth.strategy.token.status().valid()){     
      return redirect('/login');
    }
    const user=$auth.user
    const hospitals=await $axios.$get(`/hospitals`)
    const institutions=await $axios.$get(`/institutions`)
    const dhbs=await $axios.$get(`/dhbs`)
    const strategy=query.strategy || 'local'
    return{user, hospitals, institutions, dhbs, strategy}
  },
  
  watch:{
    changeCount: {
      handler: function() {
        this.submitDisabled=this.invalidFields.length>0
      }
    }
  },

  methods: {
    getField:function({fieldName, fieldValue,invalid}){
      this.contactInfoValues[fieldName]=fieldValue
      this.updateValidity(fieldName,invalid)
    },

    fieldChange: function(name) {
      let field=this[name]
      let fieldToMatch=this[field.match] 
      let result=this.$validateElement(field,fieldToMatch)
      field.message=result.strMessage
      this.updateValidity(name,Boolean(field.message)) 
      if(result.matchFlag){
        fieldToMatch.message=null
        this.updateValidity(field.match,false)
      }  
    },

    selectChange:function(fieldName){
      this.updateValidity(fieldName,false)
    },

    multiValueField:function(fieldName){
      let field=this[fieldName] 
      let [value1,value2,value3]=field.splitValues;
      field.value=value1 +value2 +value3
      let result=this.$validateElement(field,null)
      field.message=result.strMessage
      this.updateValidity(fieldName,Boolean(field.message)) 
    },

    updateValidity:function(fieldName,invalid){
      this.changeCount += 1;
      const fieldIndex=this.invalidFields.indexOf(fieldName)
      if(invalid){
        if(fieldIndex==-1)
          this.invalidFields.push(fieldName)
      }
      else{
        if(fieldIndex>-1)
          this.invalidFields.splice(fieldIndex, 1)
      }
    },

    async handleConfirm() {
      let userInfo = {
        userId: this.user.user_id,
        title:this.user.title,
        firstName:this.contactInfoValues['firstName'],
        lastName:this.contactInfoValues['lastName'],
        email:this.user.email,
        profession:this.profession.value,
        institutionId:this.institution.value,
        hospitalId:this.hospital.value,
        dhbId:this.dhb.value,
        googleId: (this.googleProfile && this.googleProfile.googleId) ? this.googleProfile.googleId : null
      };
      console.log(userInfo);
      try {
        const path = '/user/local/profile/update';
        let response = await this.$axios.post(path, {userInfo: userInfo});
        if(response.status===200){
          this.$toast.success('Your profile is changed successfully!',{duration:3000, position: 'bottom-right'});
          this.$auth.setUser(response.data.user);
        }
      } catch (err) {
        this.error = err.response ? err.response.data.message : err.message;
      }
    },

    findId(val, value_list) {
      if (val) {
        let id = value_list.filter((item, index) => {
          if (item.display === val) {
            return item.value;
          }
        })
        if (id.length > 0) 
          return id[0].value;
      }
      return null;
    }
  }
}
</script>

<style scoped lang="scss">
.fields{
  width:100%;
  justify-content:center;
}
.--sm {
  margin-bottom: 1em;
}
.short{
  .el-input__inner {text-transform:uppercase;}
  &.--3digits{
    width:4.5rem;
  }
  &.--2digits{
    width:4rem;
  }
  &.--1digit{
    width:3rem;
  }
}
</style>