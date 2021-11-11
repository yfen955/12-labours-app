<template>
    <div class="news-item-container">
        <div class="news-item">
            <div class="news-item__image">
                <img :src="newsItem.image.url"></img>
            </div>
            <div class=news-item__info>
                <div class="item-title">     
                    <nuxt-link :to="{ name: 'news-and-events-news-detail', params: { detail: newsItem.slug, item:newsItem}}">
                        <h4>{{newsItem.title}}</h4>
                    </nuxt-link>
                </div>
                <div class="item-date">
                    <span>
                        {{this.$formatDDMonthYear(newsItem.publishedDate)}}
                    </span>
                </div>
                <div class="item-detail">
                    <span> 
                        {{newsItem.blurb}}                    
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'NewsItem',

   props: {
    newsItem: {
      default: () => {}
    }
   }
}
</script>


<style scoped lang="scss">

    .news-item-container{
        height: 8.63rem;
        display:flex;  
    }

    .news-item{      
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
                padding-bottom:1.5rem;    
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
