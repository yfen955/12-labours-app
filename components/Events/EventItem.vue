<template>
    <div class="event-item-container">
        <div class="event-item">
            <div class="event-item__image">
                <img :src="eventItem.image.url"></img>
            </div>
            <div class=event-item__info>
                <div class="item-title">     
                    <nuxt-link :to="{ name: 'news-and-events-events-detail', params: { detail: eventItem.slug, item:eventItem}}">
                        <h4>{{eventItem.title}}</h4>
                    </nuxt-link>
                </div>
                <div class="item-date">
                    <span>
                        {{this.$formatDDMonthYear(eventItem.startDate)}}
                        {{eventItem.endDate? " - " + this.$formatDDMonthYear(eventItem.endDate) : ""}}
                    </span> 
                </div>
                <div class="item-detail">
                    <span> 
                        {{eventItem.blurb}}                    
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'EventItem',

   props: {
    eventItem: {
      default: () => {}
    }
   }
}
</script>


<style scoped lang="scss">

    .event-item-container{
        height: 138px;
        display:flex;  
    }

    .event-item{      
        display:flex;   

        &__image{
            img{
                width: 246px;
                height: 138px;
                border-radius:12px;
            }
        }

        &__info{
            padding-left:24px;
            .item-title{  
                text-overflow: ellipsis; 
                overflow: hidden;
                a{
                    text-decoration:none !important;
                }

                h4{
                    margin:0px;
                }
            }

            .item-date{
                padding-top:6px;
                padding-bottom:12px;    
                span{
                    font-size:14px;
                    line-height:20px;
                }
            }
            
            .item-detail{
                height:78px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical; 
                text-overflow: ellipsis;             
                overflow: hidden;   
                background-color: white;    
            }   
        }      
    }

</style>
