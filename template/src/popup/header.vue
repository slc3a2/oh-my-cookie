<template>
    <div class='header'>
        <div>
            <a href="https://github.com/llqi/oh-my-cookie" target="_blank">
                <img class='logo' src="./img/logo.png" alt="">
            </a>
        </div>
        <div class='name'>
            <!-- oh my cookie -->
        </div>
        <div>
          <el-tooltip class="item" effect="dark" content="复制JSON" placement="top-start">
            <i @click.stop='$emit("exportJson")' class="el-icon-upload2"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置" placement="top-start">
            <i class='el-icon-setting'  @click.stop='showSetting'></i>
          </el-tooltip>
        </div>
    </div>
</template>
<script>
export default {
  data: () => {  
    return{
      
    }
  },
  props: {
    data: { 
      default: function() {
        return ''
      }
    },
    showSettingHandle:{
      default:()=>{}
    }
  },
  methods:{
    showSetting(){
      this.$emit('showSettingHandle');
    }
  }
}
</script>
<style lang='scss'>
    .header{
        height:40px;
        display:flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        padding:5px;
        i.el-icon-setting,i.el-icon-upload2{
            font-size: 25px;
            cursor: pointer;
            line-height: 40px;
        }
        a{
            display:block;
            .logo{
                width:25px;
                height:25px;
                margin-top:5px;
            }
        }
        .name{
          font-size: 25px;
          font-style:italic;
        }
    }
</style>


