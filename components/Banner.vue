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
            default: '300px',
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
    background-image:var(--banner-url);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    height: var(--height);

    &__title-box{
        height:108px;
        width:340px;
        margin-top:40px;
        margin-right:60px;
        border-radius:20px;
        background-color: $blue;
        display:flex;
        align-items:center;
        justify-content:center;
        span{
            font-weight:bold;
            font-size: 40px;
            line-height: 44px;
            color:$cochlear;
        }
    }
  }

</style>