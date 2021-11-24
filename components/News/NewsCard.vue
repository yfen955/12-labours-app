<template>
    <div class="news-item-container flex-box curved-box">
        <div class="news-item-card vertical-flex">
            <div class="news-item-card__image">
                <img :src="newsItem.image.url" />
            </div>
            <div class="news-item-card__title display-ellipsis --2">
                <h3>{{newsItem.title}}</h3>
            </div>
            <div class="news-item-card__detail display-ellipsis --5">
                <span>
                    {{newsItem.blurb}}
                </span>
            </div>
            <div class="news-item-card__button">
                <nuxt-link :to="{ name: 'news-and-events-news-detail', params: { detail: newsItem.slug, item:newsItem}}">
                    <el-button>
                        READ MORE
                    </el-button>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'NewsCard',

   props: {
    newsItem: {
      default: () => {}
    }
   }
}
</script>


<style scoped lang="scss">

    .news-item-container{
        max-width: 20rem;
        height: 32rem;
        @media only screen and (min-width:$md-start) and (max-width: $md-end) {
            max-width: 14rem;
            height: 26rem;
        }
        @media only screen and (min-width: $viewport-lg) {
            max-width: 22rem;
            height: 33rem;
        }
    }

    .news-item-card{
        align-items:center;
        padding:1.25rem 1.13rem 1.88rem 1.13rem;
        @media only screen and (min-width:$md-start) and (max-width:$md-end) {
            padding:1rem;
        }

        &__image{
            display:block;     
            img{  
                width:18rem;
                height:13rem;          
                @media only screen and (min-width:$md-start) and (max-width:$md-end) {
                    width:12rem;
                    height:10rem;
                }
            }
        }

        &__title{
            text-align:center;
            padding:0.5rem 1.8rem;
            height:2.8rem;
            margin-bottom:0.5rem;
            @media only screen and (min-width:$md-start) and (max-width:$md-end) {
                font-size:1.2rem;
            }
        }
    
        &__detail{
            text-align:center;
            padding: 0rem 0.19rem;
            max-width:18.88rem;
            height:7.5rem;

            @media only screen and (min-width:$md-start) and (max-width:$md-end) {
                font-size:1rem;
                line-height:1.25rem;
                max-width:11.5rem;
                height:6.2rem;
            }
        }

        &__button{
            margin-top:auto;
        }
    }
</style>