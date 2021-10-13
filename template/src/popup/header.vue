<template>
    <div class='header'>
        <div>
            <a href="https://github.com/codedance98/oh-my-cookie" target="_blank">
              <img class='logo' src="./img/logo.png" alt="">
            </a>
        </div>
        <div class="name">
            <!-- oh my cookie -->
        </div>
        <div class="others">
          <el-tooltip class="item" effect="dark" :content="$t('lang.remove')" placement="top-start">
            <i class="el-icon-delete" @click.stop='deleteAll'></i>
          </el-tooltip>
          <el-tooltip v-show='activeName === "cookie"' class="item" effect="dark" :content="$t('lang.export')" placement="top-start">
            <i @click.stop='$emit("exportJson")' class="el-icon-upload2"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('lang.setting')" placement="top-start">
            <i class='el-icon-setting'  @click.stop='showSetting'></i>
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" :content="$t('lang.lang')" placement="top-start">
            <i class='lang' @click='changeLang'>{{lang}}</i>
          </el-tooltip> -->
        </div>
    </div>
</template>
<script>
export default {
  data: () => {  
    return{
      lang:'En'
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
    },
    activeName:{
      default:()=>{return 'cookie'}
    }
  },
  methods:{
    showSetting(){
      this.$emit('showSettingHandle');
    },
    changeLang(){
      if ( this.$i18n.locale === 'zh-CN' ) {
        this.$i18n.locale = 'en-US';
        localStorage.setItem('lang','en-US')
      }else {
        this.$i18n.locale = 'zh-CN';
        localStorage.setItem('lang','zh-CN')
      }
      if(this.lang === 'En'){
        this.lang = 'Zh'
      }else{
        this.lang = 'En'
      }
    },
    deleteAll(){
      if(this.activeName === 'cookie'){
        let self = this;
        chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        let url = tab[0].url
        chrome.cookies.getAll({
              'url': url
          }, function (cookies) {
              for (var i = 0; i < cookies.length; i++) {
                  chrome.cookies.remove({
                      url: url+'' + cookies[i].path,
                      name: cookies[i].name
                  })
              }
            self.$message({
              message: `success`,
              type: 'success'
            });
            self.$emit("removeAll",'cookie');
          })
        })
        }else{
          this.$emit("removeAll",this.activeName);
        }
      }
  }
}
</script>
<style lang='scss'>
    .header{
        width:100%;
        height:45px;
        display:flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding:5px 10px;
        .others, .logo{
          user-select: none;
        }
        i.el-icon-setting,i.el-icon-upload2,i.el-icon-delete{
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
        .lang{
          cursor: pointer;
        }
        i{
          margin-right:5px;
        }
    }
</style>


