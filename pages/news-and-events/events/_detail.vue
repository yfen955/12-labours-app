<template>
    <div class="page-outer">
        <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()"/>
         <div class="detail-container">          
            <img :src="eventItem.image.url" class="event-image"></img>         
             <div class="event-title">
                <h1>{{eventItem.title}}</h1>
            </div>
            <div class="date-social">
                <div class="date-social__extras">
                    <span>
                        EVENT DATE(s): 
                        {{this.$formatDDMonthYear(eventItem.startDate)}}
                        {{eventItem.endDate? " - " + this.$formatDDMonthYear(eventItem.endDate) : ""}}
                    </span>
                    <span>
                        LOCATION:
                        {{eventItem.location}}
                    </span>
                    <span>
                        EXTERNAL LINK:
                        <a :href="eventItem.externalLink" target="_blank">{{eventItem.externalLink}}</a>
                    </span>
                </div>               
                <social-box/>                  
            </div>            
            <div class="event-detail">
                <span v-html="eventItem.detail.html">                      
                </span>
            </div>         
            <social-box/>    
            <div class="back-to-event">
                <nuxt-link to="/news-and-events/events/">&lt; Back to Events</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'eventItemDetail',

    /** TBD: Fetch eventItem from db, instead of getting it from params **/
    /*
    async asyncData({$graphcms, route }) {
        const slug = route.params.detail   
        //Fetch eventItem from CMS      
        return {eventItem}
    },*/

    data: () => {
        return {         
            breadcrumb: [
                {
                to: { name: 'index'},
                label: 'HOME'
                },
                {
                to: {name: 'news-and-events'},
                label: 'NEWS & EVENTS'
                },
                {
                to: {name: 'news-and-events-events'},
                label: 'EVENTS'
                }
            ] 
        }
    },

    created() {
        this.eventItem=this.$route.params.item,
        this.pageTitle= this.eventItem.title
    }
}

</script>


<style scoped lang="scss">

    .detail-container{
        display:flex;
        flex-direction:column;
        margin:32px 310px;       
    }

    .event-image{
        width: 100%;
        height: 350px;
        object-fit:cover;
    }

    .event-title{
        margin-top:25px;
        margin-bottom:10px;
    }

    .date-social{
        display:flex;
        justify-content: space-between;
        align-items:flex-end;
        padding-bottom:6px;        
        &__extras{
            display:flex;
            flex-direction:column;
            span{
                font-size:14px;
                line-height:20px;
            }
        }
    }

    .event-detail{
        padding-top:32px;
        padding-bottom:25px;    
        border-top: 1px solid $lineColor1;
        border-bottom: 1px solid $lineColor1;
        margin-bottom:20px;     
    }

    .back-to-event{
        padding-top:16px;
        padding-bottom:8px;
        a{
            line-height:20px;
        }
    }
</style>