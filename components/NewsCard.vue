<template>
    <div class="news-item-container">
        <div class="news-item-card">
            <div class="news-item-card__image">
                <img :src="newsItem.image.url"></img>
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
                <el-button>READ MORE</el-button>
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
        width: 367px;
        height: 530px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 2px 5px #0000001A;
        border: 1px solid #D1D1D1;
        border-radius: 20px;
        display:flex;

        h3{
        margin:0px;
        }
    }

    .news-item-card{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;      
        margin:24px 35px;
        width:100%;
        text-align:center;
    }
    
    .news-item-card__image{
        width:296px;
        height:212px;
        img{
            width:100%;
            height:100%;
        }
    }

    .news-item-card__title{
        padding-left:29px;
        padding-right:29px;
        padding-top:22px;
        padding-bottom:8px;
        height:56px;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis; 
    }
    
    .news-item-card__detail{
        padding-left:3px;
        padding-right:3px;
        width:fit-content;
        height:116px;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis; 
    }

    .news-item-card__button{
        padding-top:22px;
        padding-bottom:15px;
    }
</style>