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
                    <span>{{formattedPublishedDate}}</span>
                </div>
                <div class="item-detail">
                    <span v-html="newsItem.detail.html">                      
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
   },

   computed: { 
        formattedPublishedDate: function() { 
            var dt=new Date(this.newsItem.publishedDate)
            var fotmatted=dt.getDate() + " " + dt.toLocaleString('default', { month: 'long' }) + " " + dt.getFullYear()
            this.newsItem.publishedDate=fotmatted     //Update, so not needed to format again in detail
            return fotmatted
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
                //padding-top:5px;      //5 px- as per wireframes
                padding-bottom:4px;     //12 px- as per wireframes
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
