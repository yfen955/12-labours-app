<template>
    <div class="card-container flex-box curved-box">
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
        width: 346px;
        height: 524px;
    }

    .card{
        align-items:center;      
        padding-top:20px;
        padding-bottom:30px;
        padding-left: 18px;
        padding-right:18px;
    }

    .image-frame{
        padding-top:22px;
        padding-left: 60px;
        padding-right: 60px;
    }

    #img-user{
        width:190px;
        height:240px;
        display: block;
    }

    .detail{
        padding-top:12px;
        padding-bottom: 20px;
    }

    .nav-button{
        margin-top:auto;
    }

</style>

