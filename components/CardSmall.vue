<template>
    <div class="card-container curved-box">
        <div class="card flex-box">   
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
      name: 'CardSmall',
  
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
        max-width:36.8rem;
        height: 13rem;
    }
  
    .card{
        align-items:center;       
        margin:1.5rem 2rem;
        width:100%;
    }
  
    .other-specs{
        padding-left:2rem;
    }

    .image-frame{
        padding:0.125rem;
    }
  
    #img-user{
        display: block;
        height:9.75rem;
        width:7.8rem;
    }
  
    .detail{
        padding:1.5rem 0rem;      
    }
  
    .nav-button{
        margin-top:auto;
        .el-button{    
            padding:0.375rem 1.25rem;        
        }
    }
  
  </style>
  
  