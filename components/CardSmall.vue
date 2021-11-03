<template>
    <div class="card-container curved-box">
        <div class="card">   
            <div class="image-frame">
                <img id="img-user" :src="require(`~/static/img/${specs.imgFile}`)"/>
            </div>   
            <div class="other-specs">
                <h1>{{specs.title.toUpperCase()}}</h1>                 
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
        display:flex;       
        height: 215px;
    }
  
    .card{
        display:flex;
        align-items:center;       
        margin:24px 32px;
        width:100%;
    }
  
    .other-specs{
        padding-left:32px;
    }

    .image-frame{
        padding:2px;
    }
  
    #img-user{
        display: block;
        height:156px;
        width:125px;
    }
  
    .detail{
        padding:24px 0px;      
    }
  
    .nav-button{
        margin-top:auto;
    }
  
  </style>
  
  