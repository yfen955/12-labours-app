<template>
  <div class="news-item-container">
    <div class="news-item">
      <div class="news-item__image">
        <img :src="newsItem.image.url"></img>
      </div>
      <div class="news-item__info vertical-flex">
        <div class="item-title display-ellipsis --2">     
          <nuxt-link :to="{ name: 'news-and-events-news-detail', params: { detail: newsItem.slug}}">
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
    display:flex; 
  }

  .news-item{      
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
