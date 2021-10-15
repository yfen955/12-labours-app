<template>
  <div class="contactDetail">
    <el-form
      label-position="top"
      :model="detailForm"
      :hide-required-asterisk="false"
    >
      <el-form-item>
        <label slot="label">What area would you like to know more information about&nbsp;<span style="color:#D11241">*</span></label>
        <el-select
          v-model="detailForm.value"
          placeholder="Please select an option"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="title in detailForm.titles"
            :key="title.value"
            :label="title.label"
            :value="title.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <label slot="label">Tell us details on how we can help provide this information&nbsp;<span style="color:#D11241">*</span></label>
        <el-input 
          v-model="detailForm.textArea" 
          type="textarea"
          resize="none"
          :maxlength="detailForm.maxLength"
          :rows="3"
        />
  
        <div class="field-info label mr-32">
          Max length: {{detailForm.maxLength}} - Used: {{detailForm.textArea.length}} - Remaining: {{detailForm.maxLength-(detailForm.textArea.length)}}
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        detailForm: {
          textArea: '',
          maxLength:250,
          value: '',
          titles: [
          {
            label: 'Modelling',
            value: 'modelling'
          },
          {
            label: 'aaa',
            value: 'aaa'
          },
          {
            label: 'bbb',
            value: 'bbb'
          },
          {
            label: 'ccc',
            value: 'ccc'
          },
          {
            label: 'ddd',
            value: 'ddd'
          }
        ],
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.contactDetail{
  margin-top: 16px;
  margin-left: 16px;
  width: 1256px;
  height: 327px;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  opacity: 1;
}

.el-form--label-top .el-form-item__label{
  text-align: left;
  font: normal normal 600 18px/24px Arimo;
  letter-spacing: 0px;
  opacity: 1;
  padding-bottom: 8px;
  margin-top: 24px;
  margin-left:24px;
  color: #262626;
}

.el-textarea__inner{
  width: 700px;
  height: 131px;
  margin-left: 24px;
  
}
.el-form-item{
  margin: 0px;
}
.field-info{
  padding-top: 0;
  margin-top: 12px;
  margin-left: 24px;
}
</style>