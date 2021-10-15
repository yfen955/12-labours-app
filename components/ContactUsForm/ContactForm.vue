<template>
  <div class="contactForm">
    <el-form
      label-position="top"
      :model="form"
      :hide-required-asterisk="false"
      :rules="formRules"
    >
      <el-form-item
        prop="title"
      >
        <label slot="label">Title <span style="color:#D11241">*</span></label>

        <el-select
          v-model="form.title"   
          placeholder="Select title"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="title in titles"
            :key="title.value"
            :label="title.label"
            :value="title.value"
          />
        </el-select>
      </el-form-item>
     
      <el-form-item
        prop="firstName"
      >
        <label slot="label">First name <span style="color:#D11241">*</span></label>
        <el-input
          v-model="form.firstName"
          placeholder="Enter your first name"
        />
      </el-form-item>

      <el-form-item
        prop="lastName"
      >
        <label slot="label">Last name <span style="color:#D11241">*</span></label>
        <el-input
          v-model="form.lastName"
          placeholder="Enter your last name"
        />
      </el-form-item>

       <el-form-item
        prop="phone"
        label="Phone"
    >
        <el-input
          v-model="form.phone"
          placeholder="Enter your phone number"
          

        />
      </el-form-item>

      <el-form-item
        prop="email"
      >
        <label slot="label">Email address <span style="color:#D11241">*</span></label>
          <el-input
            v-model="form.email"
            placeholder="Enter your email address"
          />
      </el-form-item>

      <el-form-item
        prop="confirmEmail"
      >
        <label slot="label">Confirm email address <span style="color:#D11241">*</span></label>
          <el-input
            v-model="form.confirmEmail"
            placeholder="Please confirm your email address"
          />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name:'ContactForm',
    // props:['formValue'],
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please double check your email address'));
        } else if (value !== this.form.email) {
          callback(new Error('Confirmed email address should be the same with the email above'));
        } else {
          callback();
        }
      };
      var phoneValidateCheck = (rule, value, callback) => {
        if (/^(\+?64|0)2\d{7,9}$/.test(value) == false) {
          callback(new Error("Please enter a valid phone number"));
        } else {
          callback();
        }
      };
      return {

        form: {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          confirmEmail: '',
          title:'',   
        },
         titles: [
          {
            label: 'Dr',
            value: 'Dr'
          },
          {
            label: 'Mr',
            value: 'Mr'
          },
          {
            label: 'Miss',
            value: 'Miss'
          },
          {
            label: 'Mrs',
            value: 'Mrs'  
          },
          {
            label: 'Ms',
            value: 'Ms'  
          }
        ],
        formRules: {
          title: [
            {
              required: true,
              message: 'Please select one',
              trigger: 'change'
            }
          ],

           firstName: [
            {
              required: true,
              message: 'Please enter your first name',
              trigger: 'blur'
            }
          ],

          lastName: [
            {
              required: true,
              message: 'Please enter your last name',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: false,
              validator: phoneValidateCheck,
              trigger: "blur"
            },
          ],

          email: [
            {
              required: true,
              message: 'Please enter your email',
              type: 'email',
              trigger: 'blur'
            }
          ],

          confirmEmail: [
            {
              required: true,
              validator:validatePass,
              trigger: "blur"           
            },                                      
          ]
        }
      }
    },
    watch:{
    		   
            form:{
              deep:true,
              handler:function(val){
                // console.log(newVal + '---' + oldVal)
                // if (val.firstName !== ''&& val.lastName !== '' && val.title !=='' && val.email !=='' && val.confirmEmail !==''){
                  this.$emit("update:getValue",val);
                // } 
              }
            }
              
            
    		},

    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
.contactForm{
  margin: 0;
  width: 1256px;
  height: 600px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
}

::v-deep .el-form--label-top .el-form-item__label{
  text-align: left;
  font: normal normal 600 18px/24px Arimo;
  letter-spacing: 0px;
  opacity: 1;
  padding-bottom: 8px;
  margin-top: 24px;
  margin-left:24px;
  color: #262626;
}

::v-deep .el-input--suffix .el-input__inner {
    width: 160px !important;

}
.el-input{
  width: 320px;
  margin-left: 24px;
}
::v-deep .el-input__inner{
  margin: 0px;
  padding: 0 20px;
}
::v-deep .el-select{
  margin-left: 24px;
  
}
.el-form-item{
  margin: 0px;
}
::v-deep .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: "";
   
}
</style>'