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
        max-width: 367px;
        height: 530px;
    }

    .news-item-card{
        align-items:center;   
        margin:24px 35px;
        width:100%;
        text-align:center;

        &__image{
            width:296px;
            height:212px;
            img{
                width:100%;
                height:100%;
            }
        }

        &__title{
            padding-left:29px;
            padding-right:29px;
            padding-top:22px;
            padding-bottom:8px;
            height:56px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis; 
        }
    
        &__detail{
            padding-left:3px;
            padding-right:3px;
            width:fit-content;
            height:116px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis; 
        }

        &__button{
            padding-top:22px;
            padding-bottom:15px;
        }
    }
</style>