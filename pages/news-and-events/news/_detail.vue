<template>
    <div class="page-outer">
        <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()"/>
         <div class="detail-container vertical-flex">          
            <img :src="newsItem.image.url" class="news-image"></img>         
             <div class="news-title">
                <h1>{{newsItem.title}}</h1>
            </div>
            <div class="date-social flex-box --space-between --vertical-bottom">
                <div class="date-social__published">
                    <span>Published {{this.$formatDDMonthYear(newsItem.publishedDate)}}</span>
                </div>               
                <social-box/>                  
            </div>            
            <div class="news-detail">
                <span v-html="newsItem.detail.html">                      
                </span>
            </div>         
            <social-box/>    
            <div class="back-to-news">
                <nuxt-link to="/news-and-events/news/">&lt; Back to News</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NewsItemDetail',

    /** TBD: Fetch newsItem from db, instead of getting it from params **/
    /*
    async asyncData({$graphcms, route }) {
        const slug = route.params.detail   
        //Fetch newsItem from CMS      
        return {newsItem}
    },*/

    data: () => {
        return {         
            breadcrumb: [
                {
                to: { name: 'index'},
                label: 'HOME'
                },
                {
                to: {name: 'news-and-events'},
                label: 'NEWS & EVENTS'
                },
                {
                to: {name: 'news-and-events-news'},
                label: 'NEWS'
                }
            ] 
        }
    },

    created() {
        this.newsItem=this.$route.params.item,
        this.pageTitle= this.newsItem.title
    }
}

</script>


<style scoped lang="scss">

    .detail-container{
        margin:2rem 19.38rem;        
    }

    .news-image{
        width: 100%;
        height: 21.88rem;
        object-fit:cover;
    }

    .news-title{
        margin-top:1.56rem;
        margin-bottom:0.63rem;
    }

    .date-social{
        padding-bottom:0.38rem;             
        &__published{
            span{
                font-size:0.88rem;
                line-height:1.25rem;
            }
        }
    }

    .news-detail{
        padding-top:2rem;
        padding-bottom:1.56rem;        
        border-top:0.06rem solid $lineColor1;
        border-bottom: 0.06rem solid $lineColor1;
        margin-bottom:1.25rem;     
    }

    .back-to-news{
        padding-top:1rem;
        padding-bottom:0.5rem;
        a{
            line-height:1.25rem;
        }
    }
</style>