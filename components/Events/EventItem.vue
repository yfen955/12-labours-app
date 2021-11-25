<template>
    <div class="event-item-container">
        <div class="event-item">
            <div class="event-item__image">
                <img :src="eventItem.image.url"></img>
            </div>
            <div class=event-item__info>
                <div class="item-title display-ellipsis --2">     
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
        display:flex;  
    }

    .event-item{      
        display:flex;   
        column-gap:1.5rem;

        @media only screen and (max-width:  $viewport-sm){
            flex-direction:column;
            row-gap:1.5rem;       
        }

        &__image{                       
            img{
                border-radius:0.75rem;
                display:block;
                width: 15.5rem;
                height: 8.63rem; 
                object-fit:cover;

                @media only screen and (max-width:  $viewport-sm){   
                    width:70%; 
                    height: auto;     
                } 
            }
        }

        &__info{
            .item-title{  
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
                text-align:justify;             
                background-color: $cochlear;     
            }   
        }      
    }

</style>
