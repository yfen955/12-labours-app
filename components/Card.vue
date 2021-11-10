<template>
    <div class="card-container curved-box">
        <div class="card vertical-flex">          
            <h2>{{specs.title.toUpperCase()}}</h2>
            <div class="image-frame">
                <img id="img-user" :src="require(`~/static/img/${specs.imgFile}`)"/>
            </div>           
            <div class="detail">
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
        max-width: 21.6rem;
        height: 33rem;
    }

    .card{
        align-items:center;      
        padding-top:1.25rem;
        padding-bottom:1.88rem;
        padding-left: 1.13rem;
        padding-right:1.13rem;
        max-width: 21.6rem;
    }

    .image-frame{
        padding-top:1.38rem;
        padding-left:3.75rem;
        padding-right:3.75rem;
    }

    #img-user{
        width:12rem;
        height:15rem;
        display: block;
    }

    .detail{
        padding-top:0.75rem;
        padding-bottom: 1.25rem;
        //width:fit-content;
        max-width:18.88rem;
        height:7.25rem;
        overflow: hidden;
        text-overflow: ellipsis; 
    }

    .nav-button{
        margin:auto;
        .el-button{    
            padding:0.375rem 0.625rem;        /* Overwrite existing padding to accomodate bigger text */
        }
    }

</style>

