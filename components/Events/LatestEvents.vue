<template>
    <div class="container-default vertical-flex">
        <div class="top-heading">
            <h1>
                LATEST EVENTS
            </h1>
        </div>
        <div class="latest-events default-inner">
            <div class= "latest-events__item">
                <div class="main-box vertical-flex curved-box">
                    <div class="main-box__image-box">
                        <img :src="specialEvent.image===null?'':specialEvent.image.url"></img>
                    </div>
                    <div class="main-box__title  display-ellipsis --2">
                        <nuxt-link :to="{ name: 'news-and-events-events-detail', params: {detail: specialEvent.slug, item:specialEvent}}">
                            <h4>{{specialEvent.title}}</h4>
                        </nuxt-link>                     
                    </div>
                    <div class="main-box__dates">
                        <span>
                            {{this.$formatMonDDYear(specialEvent.startDate)}} - {{this.$formatMonDDYear(specialEvent.endDate)}}
                        </span>
                    </div>
                    <div class="main-box__blurb display-ellipsis --3">
                        <span>
                            {{specialEvent.blurb}}
                        </span>
                    </div>
                </div>
            </div>
            <div class= "latest-events__item">
                <div class="upcoming-box vertical-flex">
                    <h2>UPCOMING EVENTS</h2>
                    <div class="upcoming-box__grid" v-for="(eventsItem, index) in eventsList" :key="eventsItem.index">
                        <div :style="index === 0? itemStyle : '' " class="grid-item">
                            <span>{{formatMonth(eventsItem.startDate).toUpperCase()}}</span>
                            <span class="day">{{formatDay(eventsItem.startDate)}}</span>
                        </div>   
                        <div :style="index === 0? itemStyle : ''" class="grid-item">                       
                            <nuxt-link :to="{ name: 'news-and-events-events-detail', params: {detail: eventsItem.slug, item:eventsItem}}">
                                <span class="display-ellipsis --2">{{eventsItem.title}}</span>
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
        &__item{
            width:50%;
        }
        
        @media only screen and (max-width: $viewport-md){    
            flex-direction:column;
            row-gap:2rem;
            &__item{
                width:100%;
            }
        }
    }

    .main-box{   
        padding: 1.5rem 2.25rem;  
        margin-right:2rem;

        @media only screen and (max-width: $viewport-sm){    
            padding: 1rem;
            margin: 0rem;
        }

        &__image-box{   
            display:flex;   
            justify-content:center; 
            margin-bottom:0.5rem;            
            img{
                width:18rem;
                height:11rem; 
                display:block;
                @media only screen and (max-width: $viewport-sm){    
                    width: 90%;
                    height:auto;
                }
            }
        }

        &__title{
            a{
                text-decoration:none !important;
            }    
            @media only screen and (max-width: $viewport-md){   
                h4{
                    font-weight:600;
                    font-size: 1.3rem;
                }
            }
        }

        &__dates{   
            //height:1.25rem;        
            margin-top:0.5rem;
            margin-bottom:0.5rem;              
            span{
                font-weight:700;
                line-height: 1.63rem;   
                @media only screen and (max-width: $viewport-md){    
                    font-size:1rem;
                    line-height: 1rem; 
                }                
            }
        }

        &__blurb{
            //height:4.25rem;
        }
    }

    .upcoming-box{
        margin: 1rem 1rem 0rem 2rem;

        @media only screen and (max-width: $viewport-sm){    
            margin: 0rem;
        }

        &__grid{
            display: grid;
            grid-template-columns: 20% 80% ;
            grid-gap: 0rem;
            .grid-item {
                padding: 0.75rem;                            
                border-top: 1px solid $lineColor2;
                border-left: 1px solid $lineColor2;
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
