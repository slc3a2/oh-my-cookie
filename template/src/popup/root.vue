<template>
    <div class='root'>
      <el-input v-model="url" placeholder="Write the url" clearable @keyup.enter.native='getCookies(input)'></el-input>
      <p>{{cookies}}</p>
      <el-collapse v-loading='loading' v-model="activeNames" @change="handleChange">
        <el-collapse-item :name="idx" v-for='(item,idx) in cookies' :key='idx'>
           <template slot="title">
          {{`【name:】${item.name} 【domain:】${item.domain} `}}<i class="el-icon-delete"></i>
          </template>
          <div>name：{{item.name}}</div>
          <div>value：{{item.value}}</div>
          <div>hostOnly: {{item.hostOnly}}</div>
          <div>httpOnly: {{item.httpOnly}}</div>
          <div>path: {{item.path}}</div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>
<script>
import table from './table';
  export default {
    data: () => {  
      return{
         activeName: 'second',
         url:'',
         loading: true,
         cookies:[]
      }
    },
    computed: { },
    created () {
       let self = this;
       chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
          self.getCookies(tab[0].url);
       })
    },
    mounted () { },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getCookies(url){
        this.loading = true;
        let self = this;
        chrome.cookies.getAll({"url":url},function (res){
          self.cookies = res
          setTimeout(()=>{
            self.loading = false
          },300)
          
        })
      }
    },
    components:{
      table
    }
  }
</script>
<style lang="scss">
  .root {
    width:600px;
    height:400px;
    color: blue
  }
</style>