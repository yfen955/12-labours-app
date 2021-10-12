<template>
    <div class="events-container">
        <div class="top-heading">
            <h1>
                LATEST EVENTS
            </h1>
        </div>
        <div class="latest-events">
          <div class= "latest-events__main">
            <div class="main-box-container">
                <div class="main-box">
                    <div class="main-box__image-box">
<<<<<<< HEAD:components/Events/LatestEvents.vue
                        <img :src="specialEvent.image===null?'':specialEvent.image.url"></img>
=======
                        <img :src="eventsList[0].image===null?'':eventsList[0].image.url" />
>>>>>>> b5d705d6bb2240b6b5c97be8fcc86d862ea5a08e:components/LatestEvents.vue
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
        </div>
        <div class= "latest-events__upcoming">
            <div class="upcoming-box">
                <h2>UPCOMING EVENTS</h2>
                <div class="upcoming-box__grid" v-for="(eventsItem, index) in eventsList" :key="eventsItem.index">
                    <div :style="index === 0? itemStyle : '' " class="grid-item">
                        <span>{{formatMonth(eventsItem.startDate).toUpperCase()}}</span>
                        <span class="day">{{formatDay(eventsItem.startDate)}}</span>
                    </div>   
                    <div :style="index === 0? itemStyle : '' " class="grid-item">
                        <span>
                            {{eventsItem.title}}
                        </span>
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

    .events-container{
        display:flex;
        flex-direction:column;
        padding-left:60px;
        padding-right:60px;

        h1,h2,h4{
        margin:0px;
        line-height:34px
        }
    }

    .top-heading{   
        width:100%;
        padding-top:40px;
        padding-bottom:32px;
        text-align: center; 
    }

    .latest-events{
        display:flex;
        justify-content:flex-start;       
        padding-left:32px;
        padding-right:32px;
        margin-bottom:32px;
    }

    .latest-events__main{
        width: 50%;
    }

    .main-box{     
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 2px 5px #0000001A;
            border: 1px solid $lineColor1;
            display:flex;    
            flex-direction:column;
            justify-content:flex-start;
            border-radius: 20px; 

            padding-top:24px;            
            padding-left:36px;    
            padding-right:36px;    

            //margin-left:32px;       //TBC - As per wireframes, should be 60px;
            margin-right:32px;
 
            &__image-box{   
                display:flex;    
                justify-content:center; 
                margin-bottom:16px;  //TBC

                img{
                    width:292px;
                    height:170px;    //TDC, given is 262 
                }
            }

            &__title{
                height:59px;
                overflow: hidden;
                text-overflow: ellipsis; 
                a{
                    text-decoration:none !important;
                }
            }

            &__dates{   
                height:19px;        
                margin-top:12px;
                margin-bottom:12px;              
                span{
                     font-weight:700;
                     line-height: 26px;                   
                }
            }

            &__blurb{
                height:68px;
                overflow: hidden;
                text-overflow: ellipsis; 
                margin-bottom:32px; 
            }
        }


    .latest-events__upcoming{
        width:50%;
        display:flex;
        justify-content: flex-start;
    }

    .upcoming-box{           
        display:flex;  
        width:100%;  
        flex-direction:column;
        justify-content:flex-start;    
        margin-top:16px;

        margin-left:32px;  //TBC
        margin-right:16px; //TBC
       
        &__grid{
            display: grid;
            grid-template-columns: 20% 80% ;
            grid-gap: 0px;
            .grid-item {
                padding: 12px;                            
                border-top: 1px solid #dfdfdf;
                border-left: 1px solid #dfdfdf;
                font-size:16px;
                line-height:18px;
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
                        font-size:24px;
                        margin-top:4px;                                    
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
