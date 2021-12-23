<template>
    <div class="card-container curved-box">
        <div class="card vertical-flex">          
            <h2 class="heading">{{specs.title.toUpperCase()}}</h2>
            <div class="image-frame">
                <img id="img-user" :src="require(`~/static/img/${specs.imgFile}`)"/>
            </div>           
            <div class="detail display-ellipsis --7">
                <span>
                    {{specs.detail}}
                </span>
            </div>
            <div class="nav-button">
                <a v-if="specs.btnLink.external" :href="specs.btnLink.to" target="_blank">
                    <el-button>
                        {{specs.btnLink.caption.toUpperCase()}}
                    </el-button>
                </a>
                <nuxt-link v-else :to="specs.btnLink.to">
                    <el-button>
                        {{specs.btnLink.caption.toUpperCase()}}
                    </el-button>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Card',

    props: {
        specs: {
            default: () => {},
            required: true
        }
   }
}
</script>

<style scoped lang="scss">
    .card-container{
        max-width: 20rem;
        width:100%;
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

    .card{
        height:100%;
        box-sizing: border-box;
        align-items:center;
        padding:1.25rem 1.13rem 1.88rem 1.13rem;
        @media only screen and (min-width:$md-start) and (max-width:$md-end) {
          padding:1rem;
        }
    }

    .heading{
        text-align:center;
    }

    .image-frame{
        padding:1.38rem 3.75rem 0rem 3.75rem;
        //width:18rem;
    }

    #img-user{
        display: block;
        width:11.5rem;
        height:14.5rem;
        @media only screen and (min-width:$md-start) and (max-width:$md-end) {
            width:6rem;
            height:8rem;
        }
    }

    .detail{      
        padding-top:0.75rem;
        max-width:100%;
        //height:7.25rem;
        margin-bottom:1.5rem;

        @media only screen and (min-width:$md-start) and (max-width:$md-end) {
            font-size:1rem;
            line-height:1.25rem;
            //height:8.8rem;
        }
    }

    .nav-button{
        margin-top:auto;
             
        .el-button{    
            max-width:100%;
            @media only screen and (max-width: $viewport-md){
                padding:0.375rem 0.625rem;
            }       
        }
    }

</style>

