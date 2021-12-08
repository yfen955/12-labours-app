<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle"/>
    <div class="detail-container">
      <div class="vertical-flex"> 
        <div class="image-frame">         
          <img :src="eventItem.image.url" class="event-image"></img>  
        </div>       
        <div class="event-title">
          <h1>{{eventItem.title}}</h1>
        </div>
        <div class="date-social flex-box --space-between --vertical-bottom">
          <div class="date-social__extras vertical-flex">
            <div class="flex-box --wrap">
              <span>
                EVENT DATE(s): 
              </span> 
              <span>
                {{this.$formatDDMonthYear(eventItem.startDate)}}
                {{eventItem.endDate? " - " + this.$formatDDMonthYear(eventItem.endDate) : ""}}
              </span>
            </div>
            <div class="flex-box --wrap">
              <span>
                LOCATION:
              </span> 
              <span>
                {{eventItem.location}}
              </span>
            </div>
            <div class="flex-box --wrap">
              <span>
                EXTERNAL LINK:
              </span>
              <span>
                <a :href="eventItem.externalLink" target="_blank">{{eventItem.externalLink}}</a>
              </span>
            </div>
          </div>               
          <social-box class="check-display"/>                  
        </div>            
        <div class="event-detail">
          <span v-html="eventItem.detail.html">                      
          </span>
        </div>         
        <social-box/>    
        <div class="back-to-event">
          <nuxt-link to="/news-and-events/events/">&lt; Back to Events</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import graphcmsQuery from '@/services/graphcmsQuery'
export default {
  name: 'eventItemDetail',

  async asyncData({$graphcms, route }) {
    const slug = route.params.detail   
    const event=await graphcmsQuery.event($graphcms,slug)
    return{eventItem:event.eventItem[0]}     
  },

  data: () => {
    return {         
      breadcrumb: [
        {
        to: { name: 'index'},
        label: 'Home'
        },
        {
        to: {name: 'news-and-events'},
        label: 'News & Events'
        },
        {
        to: {name: 'news-and-events-events'},
        label: 'Events'
        }
      ] 
    }
  },

  created() {
    this.pageTitle= this.eventItem.title
  }
}

</script>


<style scoped lang="scss">

  .detail-container{
    padding:2rem 20%;    
    @media only screen and (max-width: $viewport-sm){   
      padding:2rem 4%;     
    } 
    @media only screen and (min-width: $viewport-lg){   
      padding:2rem 19.38rem;   
    }            
  }

  .image-frame{           
    display:flex;       
    justify-content:center;
  }

  .event-image{
    width: 100%;
    height:auto;
    max-width:51rem;
    max-height: 21.88rem;
    object-fit:cover;
    display:block;
  }

  .event-title{
    margin-top:1.56rem;
    margin-bottom:0.63rem;
  }

  .date-social{
    padding-bottom:0.38rem;        
    &__extras{
      span{
        font-size:0.88rem;
        line-height:1.25rem;
      }
    }
  }

  .event-detail{
    padding-top:2rem;
    padding-bottom:1.56rem;    
    border-top: 1px solid $lineColor1;
    border-bottom: 1px solid $lineColor1;
    margin-bottom:1.25rem;   
  }

  .back-to-event{
    padding-top:1rem;
    padding-bottom:0.5rem;
    a{
      line-height:1.25rem;
    }
  }

  .check-display{
    @media only screen and (max-width: $viewport-sm){   
      display:none;  
    } 
  }
</style>