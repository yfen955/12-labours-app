<template>
    <div class="page-outer">
        <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()"/>
        <div class="detail-container vertical-flex">          
            <img :src="eventItem.image.url" class="event-image"></img>         
             <div class="event-title">
                <h1>{{eventItem.title}}</h1>
            </div>
            <div class="date-social flex-box --space-between --vertical-bottom">
                <div class="date-social__extras vertical-flex">
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
        margin:2rem 19.38rem;       
    }

    .event-image{
        width: 100%;
        height: 21.88rem;
        object-fit:cover;
    }

    .event-title{
        margin-top:1.56rem;
        margin-bottom:0.63rem;
    }

    .date-social{
        padding-bottom:0.38rem;        
        &__extras{
            span{
                font-size:0.88rem;
                line-height:1.25rem;
            }
        }
    }

    .event-detail{
        padding-top:2rem;
        padding-bottom:1.56rem;    
        border-top: 0.06rem solid $lineColor1;
        border-bottom: 0.06rem solid $lineColor1;
        margin-bottom:1.25rem;     
    }

    .back-to-event{
        padding-top:1rem;
        padding-bottom:0.5rem;
        a{
            line-height:1.25rem;
        }
    }
</style>