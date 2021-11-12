<template>
    <div class="news-item-container flex-box curved-box">
        <div class="news-item-card vertical-flex">
            <div class="news-item-card__image">
                <img :src="newsItem.image.url" />
            </div>
            <div class="news-item-card__title">
                <h3>{{newsItem.title}}</h3>
            </div>
            <div class="news-item-card__detail">
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
        max-width: 22rem;
        height: 33rem;
    }

    .news-item-card{
        align-items:center;   
        margin:1.5rem 2.24rem;
        width:100%;
        text-align:center;

        &__image{
            width:18.5rem;
            height:13.25rem;
            img{
                width:100%;
                height:100%;
            }
        }

        &__title{
            padding-left:1.8rem;
            padding-right:1.8rem;
            padding-top:1.38rem;
            padding-bottom:0.5rem;
            height:3.5rem;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis; 
        }
    
        &__detail{
            padding-left:0.19rem;
            padding-right:0.19rem;
            width:fit-content;
            height:7.25rem;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis; 
        }

        &__button{
            padding-top:1.38rem;
            padding-bottom:0.94rem;
        }
    }
</style>