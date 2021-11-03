<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
            <div class="feedback-description container-default">
                <div class="top-heading">
                    <h1>
                        SITE FEEDBACK
                    </h1>
                </div> 
                <div class="feedback-text  container-default">                 
                    Use the form below to submit your feedback.<br/><br/>                    
                    Site feedback includes: Reporting bug, missing information, incorrect information or feature requests.<br/><br/>
                    For all other queries about the 12 Labours Portal please use the <nuxt-link to="/contact-us">Contact us</nuxt-link> form.
                </div>           
            </div>
            <div class="feedback-form">
                 <div class="top-heading">
                    <h1>
                        SITE FEEDBACK FORM
                    </h1>
                </div>
                <div class="form-container">
                    <span>
                        Reason:
                    </span>
                    <div class="box">
                        <div class="box__shaded">
                            <div class="form-item">
                                <span>
                                    Let us know why you are submitting feedback? <span class="smaller --error">*</span><br/>
                                </span>
                                <el-select v-model="reason" placeholder="Please select reason">
                                    <el-option
                                        v-for="item in reasonOptions"
                                        :key="item.name"
                                        :label="item.display"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <span>
                        Contact Information: 
                    </span>
                    <div class="box">
                        <div class="box__shaded">
                            <div class="form-item">
                                <span>
                                    Title <span class="smaller --error">*</span>
                                </span><br/>
                                 <el-select v-model="title" placeholder="Select">
                                    <el-option
                                        v-for="item in titleOptions"                                       
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <span class="smaller --error" v-if="errorMessage.title!='unchecked'">{{errorMessage.title}}</span>
                            </div>
                            <div class="form-item">
                                <span>First name <span class="smaller --error">*</span></span>
                                <el-input
                                    v-model="firstName" 
                                    maxlength=50
                                    placeholder="Enter your first name">
                                </el-input>
                                <span class="smaller --error" v-if="errorMessage.firstName!='unchecked'">{{errorMessage.firstName}}</span>
                            </div>
                            <div class="form-item">
                                <span>Last name <span class="smaller --error">*</span></span>
                                <el-input
                                    v-model="lastName"
                                    maxlength=50 
                                    placeholder="Enter your last name">
                                </el-input>
                                <span class="smaller --error" v-if="errorMessage.lastName!='unchecked'">{{errorMessage.lastName}}</span>
                            </div>
                            <div class="form-item">
                                <span>Phone </span>
                                <el-input
                                    v-model="phone" 
                                    maxlength=25
                                    placeholder="Enter your phone number">
                                </el-input>
                            </div>
                            <div class="form-item">
                                <span>Email address <span class="smaller --error">*</span></span>
                                <el-input
                                    v-model="email" 
                                    maxlength=100
                                    placeholder="Enter your email address">
                                </el-input>
                                <span class="smaller --error" v-if="errorMessage.email!='unchecked'">{{errorMessage.email}}</span>
                            </div>
                            <div class="form-item">
                                <span>Confirm Email address <span class="smaller --error">*</span></span>
                                <el-input
                                    v-model="confirmEmail" 
                                    maxlength=100
                                    placeholder="Enter your confirm email address">
                                </el-input>
                                <span class="smaller --error" v-if="errorMessage.confirmEmail!='unchecked'">{{errorMessage.confirmEmail}}</span>
                                <span class="smaller --error" v-if="errorMessage.emailMatch!='unchecked'">{{errorMessage.emailMatch}}</span>
                            </div>
                        </div>
                    </div>
                    <span>
                        Details:
                    </span>
                   <div class="box">
                        <div class="box__shaded">
                            <span class="smaller"  v-if="!reason">
                                <i>{{errorMessage.reason}}</i>
                            </span>
                            <div class="feedback-detail" v-if="reason">
                                <span>
                                    What are you submitting feedback on? <span class="smaller --error">*</span>
                                 </span>
                                <div class="feedback-on-radio">
                                    <el-radio-group v-model="feedbackOn">
                                        <el-radio label="lastPage">
                                            <span class="smaller">
                                                Last page visited - 
                                                <nuxt-link target="_blank" :to="lastVisitedPage" :event="triggerEvent">
                                                    {{linkLabel}}
                                                </nuxt-link>           
                                            </span>
                                        </el-radio><br/>
                                        <el-radio label="general">
                                            <span class="smaller">General feedback</span>
                                        </el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="form-item">
                                    <span>
                                        Please provide your feedback detail.
                                    </span>
                                    <el-input
                                        v-model="detail" 
                                        type="textarea"
                                        :maxlength="maxLength"
                                        :rows="5"
                                        placeholder="Enter details">
                                    </el-input>
                                    <div>
                                        <span class="smaller"><i>Max length: {{maxLength}} - Used: {{detail.length}} - Remaining: {{maxLength-(detail.length)}}</i></span>
                                    </div>
                                    <span class="smaller --error" v-if="errorMessage.detail!='unchecked'">{{errorMessage.detail}}</span>
                                </div>
                            </div>      
                        </div>
                    </div>
                    <div class="submit">
                        <el-button native-type="submit" :disabled="submitDisabled">
                            SUBMIT FEEDBACK
                        </el-button>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>


<script>
import graphcmsQuery from '@/services/graphcmsQuery'

export default { 
    name: 'SiteFeedbackPage',

    async asyncData({$graphcms}) {
        const feedbackReason= await graphcmsQuery.feedbackReason($graphcms)
        return {feedbackReason}
    },

    data: () => {
        return {      
            pageTitle: 'SITE FEEDBACK',
            breadcrumb: [
                {
                    to: { name: 'index'},
                    label: 'HOME'
                }
            ],
            reasonOptions: [,],  
            titleOptions: [
                {label: 'Dr',value: 'Dr'},
                {label: 'Mr', value: 'Mr'},
                {label: 'Miss',value: 'Miss'},
                {label: 'Mrs',value: 'Mrs'},
                {label: 'Ms',value: 'Ms' }
                ],     
            submitDisabled:true,
            feedbackOn: 'lastPage',
            maxLength:2500,
            errorMessage:{
                reason: 'Please select your reason for submitting feedback, so we can capture all of the important information.',
                title:'unchecked',
                firstName: 'unchecked',
                lastName: 'unchecked',
                email: 'unchecked',
                confirmEmail: 'unchecked',
                emailMatch:'unchecked',
                detail:'unchecked'
            },

            //FORM ENTERIES
            reason:'',  
            title:'',      
            firstName:'',                     
            lastName:'',
            phone:'',
            email:'',
            confirmEmail:'',   
            detail:''
        }
    },

    created(){
        this.reasonOptions= this.feedbackReason.__type.enumValues
        this.reasonOptions.map(e => e.display = e.name.replace(/_/g,' '))
        
        const lastRoute=this.$nuxt.context.from
        if(lastRoute)
        {
            this.lastVisitedPage=lastRoute.fullPath
            this.linkLabel=this.lastVisitedPage
            this.triggerEvent="click"
        }
        else{
            this.linkLabel="Not found"
            this.lastVisitedPage="/"
            this.triggerEvent=""
        }       
    },
    
    watch: {
        title:function(){
            this.errorMessage.title=this.title? null:  'Select title'
            this.checkFlag();
        },
        reason: function(){
            this.errorMessage.reason=null
            this.checkFlag();
        },
        firstName: function () {  
            this.errorMessage.firstName=this.firstName? null:  'First name is mandatory'
            this.checkFlag();
        },
        lastName: function () {  
            this.errorMessage.lastName=this.lastName? null:  'Last name is mandatory'
            this.checkFlag();
        },
        email: function(){
            if(this.email)
                this.errorMessage.email=this.isValidEmail(this.email)? null:  'Invalid Email Format'
            else
                this.errorMessage.email= 'Email is mandatory'

            this.checkEmailsMatch();          
            this.checkFlag();
        },
        confirmEmail: function(){
             if(this.confirmEmail)
                this.errorMessage.confirmEmail=this.isValidEmail(this.confirmEmail)? null:  'Invalid Confirm Email Format'
            else
                this.errorMessage.confirmEmail= 'Confirm Email is mandatory'
            
            this.checkEmailsMatch();          
            this.checkFlag();
        },
        detail: function(){
            this.errorMessage.detail=this.detail? null:  'Feedback detail is mandatory'
            this.checkFlag();
        }
    },

    methods:{
        checkFlag(){
            this.submitDisabled=Object.values(this.errorMessage).some(x => (x !== null && x !== ''))
        },
        isValidEmail(email){
            const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            return emailRegex.test(email)
        },
        checkEmailsMatch(){
            if(this.errorMessage.email || this.errorMessage.confirmEmail) 
               this.errorMessage.emailMatch=null 
            else
                this.errorMessage.emailMatch= this.email===this.confirmEmail? null: 'Both emails should match'
        }
    }
}

</script>


<style scoped lang="scss">

    .feedback-description{
        background-color:$background; 
        background-image: url("~static/img/researcher-doctor.png");
        background-repeat: no-repeat;
        background-position:right 124px top 50px;
        background-size: 224px 330px;

        .feedback-text{
            padding-left:32px;
            padding-right:114px;
            padding-bottom:170px;       //180 in wireframes

            a{
                font-size:18px;     //Must change it in DSC
            }
        }
    }

    .feedback-form{
        .form-container{
            padding-left:32px;
            padding-right:16px;
            span{
                font-weight:700;
            }

            .box{
                padding-top:16px;
                padding-left:16px;
                padding-bottom:24px;

                &__shaded{
                    background-color:$background;  
                    padding-top:24px;
                    padding-left:24px;
                    display:flex;
                    flex-direction:column;

                    .form-item{
                        padding-bottom:24px;
                    }

                    span{
                        font-weight:600;
                        &.smaller{
                            font-weight:400;
                            font-size:16px;
                            line-height:20px;
                            &.--error{
                                color:$red;
                            }
                        }
                    }

                    .feedback-on-radio{
                        padding-top:8px;
                        padding-bottom:24px;              
                    }

                    .el-textarea {
                        margin-top:8px;
                    }
                }
            }

            .submit{
                padding-top:10px;
                padding-left:40px;
                padding-bottom:40px;      
            }
        }
    }

    ::v-deep .el-input__inner {
        width: 320px;   
    }

    ::v-deep .el-textarea{
        &__inner {
            width: 700px;
        }
    }

</style>