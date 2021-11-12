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
        height: 8.63rem;
        display:flex;  
    }

    .event-item{      
        display:flex;   

        &__image{
            img{
                width: 15.38rem;
                height: 8.63rem;
                border-radius:0.75rem;
            }
        }

        &__info{
            padding-left:1.5rem;
            .item-title{  
                text-overflow: ellipsis; 
                overflow: hidden;
                a{
                    text-decoration:none !important;
                }
            }

            .item-date{
                padding-top:0.38rem;
                padding-bottom:0.75rem;    
                span{
                    font-size:0.88rem;
                    line-height:1.25rem;
                }
            }
            
            .item-detail{
                height:4.88rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical; 
                text-overflow: ellipsis;             
                overflow: hidden;   
                background-color: $cochlear;    
            }   
        }      
    }

</style>
