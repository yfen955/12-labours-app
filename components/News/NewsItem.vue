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
        height: 138px;
        display:flex;  
    }

    .news-item{      
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
                background-color: $cochlear;    
            }   
        }      
    }

</style>
