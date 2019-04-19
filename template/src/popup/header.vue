<template>
    <div class='header'>
        <div>
            <a href="https://github.com/llqi/oh-my-cookie" target="_blank">
                <img class='logo' src="./img/logo.png" alt="">
            </a>
        </div>
        <div class='name'>
          <!-- oh my cookie -->
          <el-tooltip class="item" effect="dark" :content="$t('lang.export')" placement="top-start">
            <i class="lang" @click="changeType">{{type}}</i>
          </el-tooltip>
        </div>
        <div>
          <el-tooltip class="item" effect="dark" :content="$t('lang.remove')" placement="top-start">
            <i class="el-icon-delete" @click.stop='deleteAllData'></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('lang.export')" placement="top-start">
            <i @click.stop='$emit("exportJson")' class="el-icon-upload2"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('lang.setting')" placement="top-start">
            <i class='el-icon-setting'  @click.stop='showSetting'></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('lang.lang')" placement="top-start">
            <i class='lang' @click='changeLang'>{{lang}}</i>
          </el-tooltip>
        </div>
    </div>
</template>
<script>
export default {
  data: () => {  
    return{
      lang:'Zh',
      type: 'Cookie'
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
    changeType() {
      console.log('change type', this.type)
      if (this.type == "Cookie") {
        this.type = "LocalStorage";
      } else if (this.type == "LocalStorage") {
        this.type = "SessionStorage";
      } else {
        this.type = "Cookie";
      }
      localStorage.setItem("type", this.type);
      this.$emit("changeType")
    },
    deleteAllData() {
      let self = this;
      chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        var currentTab = tab[0]
        if(self.type == "Cookie") {
          self.deleteAllCookie(currentTab.url);
        } else if(self.type == "LocalStorage") {
          self.deleteAllLocalStorage(currentTab.id);
        } else if(self.type == "SessionStorage") {
          self.deleteAllSessionStorage(currentTab.id)
        }
        self.$emit("removeAll");
      });
    },
    deleteAllLocalStorage(tabId) {
        chrome.tabs.executeScript(tabId, {code:`localStorage.clear()`},console.log)
    },
    deleteAllSessionStorage(tabId) {
        chrome.tabs.executeScript(tabId, {code:`sessionStorage.clear()`},console.log)
    },
    deleteAllCookie(url){
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
            message: `successfully remove`,
            type: 'success'
          });
          
      })
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
        // border-bottom: 1px solid #eee;
        box-sizing: border-box;
        padding:5px 10px;
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


