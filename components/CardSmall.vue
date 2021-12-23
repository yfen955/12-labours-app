<template>
    <div class="card-container curved-box">
        <div class="card flex-box">   
            <div class="image-frame">
                <img id="img-user" :src="require(`~/static/img/${specs.imgFile}`)"/>
            </div>   
            <div class="other-specs vertical-flex">
                <h1>{{specs.title.toUpperCase()}}</h1>                 
                <div class="detail">
                    <span>
                        {{specs.detail}}
                    </span>
                </div>
                <div class="nav-button">
                    <a v-if="specs.btnLink.external" :href="specs.btnLink.to" target="_blank">
                        <el-button>
                            <span class="display-ellipsis --1">
                                {{specs.btnLink.caption.toUpperCase()}}
                            </span>
                        </el-button>
                    </a>
                    <nuxt-link v-else :to="specs.btnLink.to">
                        <el-button>
                            <span class="display-ellipsis --1">
                                {{specs.btnLink.caption.toUpperCase()}}
                            </span>
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
        width:100%;
        @media only screen and (max-width: $viewport-sm){
            max-width:20rem;
        }    
    }
  
    .card{     
        padding:1.5rem 2rem;
        column-gap:2rem;
        height:100%;
        box-sizing: border-box;
        @media only screen and (max-width: $viewport-md){
            padding:1rem 1.5rem;
            flex-direction:column;
            row-gap:1rem;
            align-items:center;
        }
    }
  
    .other-specs{ 
        height:100%;
        box-sizing: border-box;
        @media only screen and (max-width: $viewport-md){
            align-items:center;
            h1{
                text-align:center;
            }
        }
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
        max-width:100%;
        padding:1.5rem 0rem;      
    }
  
    .nav-button{
        margin-top:auto;       
        .el-button{    
            padding:0.375rem 1.25rem; 

            //May use code below to wrap text instead of sholwing ellipses
            /*@media only screen and (max-width: $viewport-md){
                display: inline-block;
                white-space: normal;
                height:auto;
            }*/    
        }
    }
  
  </style>
  
  