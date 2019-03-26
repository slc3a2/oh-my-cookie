<template>
    <div class='root'>
      <el-input v-model="url" placeholder="Write the url" clearable @keyup.enter.native='getCookies(input)'></el-input>
      <p>{{tableData}}</p>
      <!-- <el-collapse v-loading='loading' v-model="activeNames" @change="handleChange">
          <el-collapse-item :name="idx" v-for='(item,idx) in cookies' :key='idx'>
            <template slot="title">
            {{`${item.name} | ${item.domain} `}}<i @click.stop='deleteCookie(idx)' class="el-icon-delete"></i>
            </template>
            <div>domain : {{item.domain}}</div>
            <div>name : {{item.name}}</div>
            <div>value : {{item.value}}</div>
            <div>expirationDate : {{item.expirationDate}}</div>
            <div>hostOnly : {{item.hostOnly}}</div>
            <div>httpOnly : {{item.httpOnly}}</div>
            <div>path : {{item.path}}</div>
            <detail :data='item'/>

          </el-collapse-item>
      </el-collapse> -->
      <el-table
        :data="tableData"
        stripe
        border
        @row-click="clickTable"
        ref="refTable"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="domain">
                <span>{{ props.row.domain }}</span>
              </el-form-item>
              <el-form-item label="name">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="value">
                <el-input
                  readonly
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="props.row.value">
                </el-input>
              </el-form-item>
              <el-form-item label="path">
                <span>{{ props.row.path }}</span>
              </el-form-item>
              <el-form-item label="expiration">
                <span>{{ numberToTime(props.row.expirationDate) }}</span>
              </el-form-item>
              <el-form-item label="hostOnly">
                <span>{{ props.row.hostOnly }}</span>
              </el-form-item>
              <el-form-item label="sameSite">
                <span>{{ props.row.sameSite }}</span>
              </el-form-item>
              <el-form-item label="secure">
                <span>{{ props.row.secure }}</span>
              </el-form-item>
              <el-form-item label="session">
                <span>{{ props.row.session }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="domain"
          show-overflow-tooltip
          prop="domain">
        </el-table-column>
        <el-table-column
          label="name"
          show-overflow-tooltip
          prop="name">
        </el-table-column>
        <el-table-column
          class='cookie-value'
          label="value"
          show-overflow-tooltip
          prop="value">
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import detail from './table';
  export default {
    data: () => {  
      return{
         tableData:[],
         scope:''
      }
    },
    computed: { 
    },
    created () {
       let self = this;
       chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
          self.getCookies(tab[0].url);
       })
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getCookies(url){
        this.loading = true;
        let self = this;
        chrome.cookies.getAll({"url":url},function (res){
          self.tableData = res
          setTimeout(()=>{
            self.loading = false
          },300)
        })
      },
      deleteCookie(idx){
        this.tableData = this.tableData.filter((item,index)=>{return idx != index})
      },
      clickTable(row,index,e){
           this.$refs.refTable.toggleRowExpansion(row)
      },
      numberToTime(timenumber) {
          let t = timenumber*1000
          const date = new Date(t)
          const Y = date.getFullYear() + '-'
          const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
          // let h = date.getHours() + ':'
          // let m = date.getMinutes() + ':'
          // let s = date.getSeconds() < 10 ?
          return Y + M + D
      }
    },
    components:{
      detail
    }
  }
</script>
<style lang="scss">
  .root {
    width:600px;
    height:400px;
    color: blue
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    // width: 50%;
  }
  .el-form--inline .el-form-item{
    display:block;
    .el-form-item__content{
      width:81%;
    }
  }
  .el-table__row{
    cursor: pointer;
    .el-table_1_column_4{
      .cell{
        // max-height:90px;
        // height:90px;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
        // overflow: hidden;
      }
    }
    .el-textarea{
      width:100%;
    }
  }
</style>