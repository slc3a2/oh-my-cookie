<template>
    <div class='setting'>
        <header>
            <i class="el-icon-arrow-left" @click.stop='back'></i>
        </header>
        <section>
            <div class='item'>
                <div>去商店评分</div>
                <div><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class='item' @click='issues'>
                <div>提出意见与bug</div>
                <div><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class='item' @click='seeCode'>
                <div>本项目源代码</div>
                <div><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class='item' @click='goLibrary'>
                <div>开源库based on vue@2</div>
                <div><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class='item'>
                <div>版本号 v{{version}}</div>
                <div><i class="el-icon-arrow-right"></i></div>
            </div>
            <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
        </section>
    </div>
</template>
<script>
export default {
  data: () => {  
    return{
       version:''
    }
  },
  created(){
      this.version = chrome.runtime.getManifest().version
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
      back(){
          this.$emit('hideSettingHandle');
      },
      handleChange(val) {
        console.log(val);
      },
      seeCode(){
          window.open('https://github.com/llqi/oh-my-cookie')
      },
      issues(){
          window.open('https://github.com/llqi/oh-my-cookie/issues')
      },
      goLibrary(){
          window.open('https://github.com/YuraDev/vue-chrome-extension-template')
      }
  }
}
</script>
<style lang='scss'>
.setting{
    
    header{
        padding-top:10px;
        padding-left:4px;
        .el-icon-arrow-left{
            font-size: 25px;
            cursor: pointer;
        }
    }   
    section{
        padding:10px 10px 10px;
        .item{
            width:100%;
            height:45px;
            // border-radius: 4px;
            border-bottom: 1px solid #EBEEF5;
            background-color: #FFF;
            display:flex;
            justify-content: space-between;
            line-height: 45px;
            font-size: 16px;
            cursor: pointer;
            color:#606266;
        }
    }
}
</style>
