<template>
  <div class="banner-container">
    <div :style="urlStyle" class="banner">
      <div class="banner__title-box">
        <span>{{bannerData.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Banner',

    props: {
        bannerData: {
            default: () => {},
            required: true
        },
        height:{
            type: String,
            default: '18.75rem',
            validator: propValue => {
                const listOfAvailableExt = ["px", "rem"];
                const isValidExt = listOfAvailableExt.some(ext =>
                propValue.endsWith(ext)
                );
                return isValidExt;
            }
        }
    },
    
    computed: {
        urlStyle () {
            return {
                '--banner-url': 'url('+this.bannerData.image.url+')',
                '--height':this.height
            }
        }
    }
}
</script>


<style scoped lang="scss">

.banner-container{
    width:100%;
}

.banner{
    display:flex;
    justify-content:flex-end; 
    padding-top:2.5rem;
    padding-right:3.75rem;

    background-image:var(--banner-url);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    height: var(--height);

    @media only screen and (max-width: $viewport-sm){    
        justify-content:center;  
        padding:2rem .5rem;
        height:fit-content;     
    }

    &__title-box{
        height:6.75rem;
        width:21.25rem;
        border-radius:1.25rem;
        background-color: $blue;
        display:flex;
        align-items:center;
        justify-content:center;
        span{
            font-weight:bold;
            font-size: 2.5rem;
            line-height: 2.75rem;
            color:$cochlear;
        }
    }
  }

</style>