<template>
    <div class="container-default vertical-flex">
        <div class="top-heading">
            <h1>
                LATEST EVENTS
            </h1>
        </div>
        <div class="latest-events default-inner">
            <div class= "latest-events__main">
                <div class="main-box vertical-flex curved-box">
                    <div class="main-box__image-box">
                        <img :src="specialEvent.image===null?'':specialEvent.image.url"></img>
                    </div>
                    <div class="main-box__title">
                        <nuxt-link :to="{ name: 'news-and-events-events-detail', params: {detail: specialEvent.slug, item:specialEvent}}">
                            <h4>{{specialEvent.title}}</h4>
                        </nuxt-link>                     
                    </div>
                    <div class="main-box__dates">
                        <span>
                            {{this.$formatMonDDYear(specialEvent.startDate)}} - {{this.$formatMonDDYear(specialEvent.endDate)}}
                        </span>
                    </div>
                    <div class="main-box__blurb">
                        <span>
                            {{specialEvent.blurb}}
                        </span>
                    </div>
                </div>
            </div>
            <div class= "latest-events__upcoming">
                <div class="upcoming-box vertical-flex">
                    <h2>UPCOMING EVENTS</h2>
                    <div class="upcoming-box__grid" v-for="(eventsItem, index) in eventsList" :key="eventsItem.index">
                        <div :style="index === 0? itemStyle : '' " class="grid-item">
                            <span>{{formatMonth(eventsItem.startDate).toUpperCase()}}</span>
                            <span class="day">{{formatDay(eventsItem.startDate)}}</span>
                        </div>   
                        <div :style="index === 0? itemStyle : '' " class="grid-item">                       
                            <nuxt-link :to="{ name: 'news-and-events-events-detail', params: {detail: eventsItem.slug, item:eventsItem}}">
                                {{eventsItem.title}}
                            </nuxt-link>         
                        </div>               
                    </div>
                    <div class="view-all">
                        <nuxt-link to="/news-and-events/events/">VIEW ALL EVENTS</nuxt-link>
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<script>
export default {
    name: 'LatestEvents',

    props: {
        eventsList: {
        type: Array,
        default: () => []
        },
        linkComponent: {
        type: String,
        default: 'nuxt-link'
        }
    },

    methods: {
        formatMonth: function(strDate) {
            var dt=new Date(strDate)
            return dt.toLocaleString('default', { month: 'short' })
        },
        formatDay: function(strDate) {
            var dt=new Date(strDate)
            return dt.getDate()
        }
    },
    
    computed: {
        itemStyle () { 
            return {              
                'border-top': 'none'
            }
        }
    },

    created(){
        //TBD: Event with latest event date may not be the special event, need to check this
        this.specialEvent=this.eventsList[0]
    }
}

</script>


<style scoped lang="scss">

    .latest-events{
        display:flex;
        &__main{
            width: 50%;
        }
        &__upcoming{
            width:50%;
        }
    }

    .main-box{     
            padding-top:1.5rem;            
            padding-left:2.25rem;    
            padding-right:2.25rem;    
            margin-right:2rem;
 
            &__image-box{   
                display:flex;    
                justify-content:center; 
                margin-bottom:1rem;  

                img{
                    width:18.25rem;
                    height:10.63rem;   
                }
            }

            &__title{
                height:3.75rem;
                overflow: hidden;
                text-overflow: ellipsis; 
                a{
                    text-decoration:none !important;
                }
            }

            &__dates{   
                height:1.25rem;        
                margin-top:0.75rem;
                margin-bottom:0.75rem;              
                span{
                    font-weight:700;
                    line-height: 1.63rem;                   
                }
            }

            &__blurb{
                height:4.25rem;
                overflow: hidden;
                text-overflow: ellipsis; 
                margin-bottom:2rem; 
            }
        }

    .upcoming-box{           
        margin-top:1rem;
        margin-left:2rem;  
        margin-right:1rem; 
       
        &__grid{
            display: grid;
            grid-template-columns: 20% 80% ;
            grid-gap: 0rem;
            .grid-item {
                padding: 0.75rem;                            
                border-top: 1px solid #DFDFDF;
                border-left: 1px solid #DFDFDF;
                font-size:1rem;
                line-height:1.13rem;
                display:flex;
                align-items:center;
     
                &:nth-child(odd) {
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    border-left: none;
                    color:#1B2224;  
                    span.day{
                        font-weight:700;
                        font-size:1.5rem;
                        margin-top:0.25rem;                                    
                    }                            
                }  
                &:nth-child(even)
                {
                    color: $blue;
                    font-weight:600;
                    span{
                        overflow: hidden;
                        text-overflow: ellipsis; 
                    }  
                }  
                a{
                    text-decoration:none !important;
                    font-size:1rem;
                    color: $blue !important;
                    line-height:1.13rem;
                }            
            }
        }
    }

    .view-all{
        text-align: right; 
        a{
            font-weight:600;
        }
    }

</style>
