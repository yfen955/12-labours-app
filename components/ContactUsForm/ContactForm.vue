<template>
  <div class="contactForm">
    <el-form
      label-position="top"
      :model="form"
      :hide-required-asterisk="false"
    >
      <el-form-item>
        <label slot="label">Title <span style="color:#D11241">*</span></label>

        <el-select
          v-model="form.value"
          placeholder="Select title"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="title in form.titles"
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
        prop="c-email"
      >
        <label slot="label">Confirm email address <span style="color:#D11241">*</span></label>
          <el-input
            v-model="form.cemail"
            placeholder="Please confirm your email address"
          />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ContactDetail from "@/components/ContactUsForm/ContactDetail.vue";
  export default {
    name:'ContactForm',
  // components: {
  //   ContactDetail
  // },
    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          cemail: '',
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
            value: 'Mrs'
          }

        ],
        }
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>
.contactForm{
  position: absolute;
  margin-top: 317px;
  margin-left: 108px;
  width: 1256px;
  height: 576px;
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
</style>'