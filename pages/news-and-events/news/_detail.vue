<template>
    <div class="page-outer">
        <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle.toUpperCase()"/>
         <div class="detail-container">          
            <img :src="newsItem.image.url" class="news-image"></img>         
             <div class="news-title">
                <h1>{{newsItem.title}}</h1>
            </div>
            <div class="date-social">
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
        display:flex;
        flex-direction:column;
        margin:32px 310px;       
    }

    .news-image{
        width: 100%;
        height: 350px;
        object-fit:cover;
    }

    .news-title{
        margin-top:25px;
        margin-bottom:10px;
    }

    .date-social{
        display:flex;
        justify-content: space-between;
        align-items:flex-end;
        padding-bottom:6px;         
        &__published{
            span{
                font-size:14px;
                line-height:20px;
            }
        }
    }

    .news-detail{
        padding-top:32px;
        padding-bottom:25px;        //TBC
        border-top: 1px solid $lineColor1;
        border-bottom: 1px solid $lineColor1;
        margin-bottom:20px;     //TBC
    }

    .back-to-news{
        padding-top:16px;
        padding-bottom:8px;
        a{
            line-height:20px;
        }
    }
</style>