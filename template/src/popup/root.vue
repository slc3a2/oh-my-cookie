<template>
    <div class='root'>
      <header>
          <appHeader/>
      </header>
      <button @click='exportJson'>导出JSON格式cookie</button>
      <el-input v-model="url" placeholder="Write the url" clearable @keyup.enter.native='getCookies(input)'></el-input>
      <p ref='exportJson'>{{tableData}}</p>
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
        <el-table-column
          class='cookie-value'
          label="more"
          align='center'
          show-overflow-tooltip
          >
          <template slot-scope='scope'>
             <!-- <i class="el-icon-edit" @click.stop="handleEdit(scope.$index, scope.row)"></i>
             <i class="el-icon-delete" @click.stop='handleDele(scope.$index, scope.row)'></i> -->
             <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit" @click.stop="handleEdit(scope.$index, scope.row)"></i></el-button>
              <el-button
                size="mini"
                type="danger"
                @click.stop='handleDele(scope.$index, scope.row)'
                ><i class="el-icon-delete"></i></el-button>
          </template>
          <!-- <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              @change='filterValue(search)'
              width='30'
              clearable
              placeholder="值搜索"/>
          </template> -->
        </el-table-column>
      </el-table>
      <!-- 对话窗 -->
      <el-dialog title="oh my cookie" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="domain" >
          <el-input v-model="form.domain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="value" >
          <el-input type="textarea" :rows="2" v-model="form.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="expirationDate" >
          <el-input v-model="form.expirationDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="path" >
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sameSite" >
          <el-input v-model="form.sameSite" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="httpOnly" >
          <el-tooltip :content="'httpOnly value: ' + form.httpOnly" placement="top">
            <el-switch v-model="form.httpOnly">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="secure" >
          <el-tooltip :content="'secure value: ' + form.secure" placement="top">
            <el-switch
              v-model="form.secure" >
            </el-switch>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import detail from './table';
import appHeader from './header'
  export default {
    data: () => {  
      return{
         tableData:[],
         scope:'',
         url:'',
         search:'',
         currentPage:'',
         dialogFormVisible:false,
         form:{
           domain:'',
           name:'',
           value:'',
           path: '',
           sameSite:'',
           hostOnly:false,
           httpOnly:false,
           secure:true,
           session:false
         }
      }
    },
    computed: { 
    },
    created () {
       let self = this;
       chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
          self.currentPage = tab[0].url;
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
          let t = timenumber*1000;
          const date = new Date(t)
          const Y = date.getFullYear() + '-'
          const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
          let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
          let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
          let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
          return Y + M + D + ' ' + h + m + s
      },
      handleEdit(index,data){
        this.form = {...data}
        this.dialogFormVisible = true;
      },
      handleDele(index,data){
        chrome.cookies.remove({url:this.currentPage, name: data.name},
        (res)=>{
          this.$message({
            message: `${res.name} is deleted`,
            type: 'success'
          });
          this.tableData = this.tableData.filter((item)=>{return item.name != res.name})
        });
      },
      submit(){
        let self = this
        let temp = this.form
        delete temp.hostOnly
        delete temp.session
        chrome.cookies.set({
            "url": self.currentPage,
            ...temp
        }, function (cookie) {
            //reload
            self.getCookies(self.currentPage);
            self.dialogFormVisible = false
            self.$message({
              message: `Updated successful`,
              type: 'success'
            });
        });
      },
      // 暂时不用
      filterValue(v){
        if(!v.length){
          let self = this
          chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
              self.getCookies(tab[0].url);
          })
        }else{
          this.tableData = this.tableData.filter((i)=>{return i.value.indexOf(v) !== -1})
        }
      },
      exportJson(){
        // const input = this.$refs.exportJson
        // console.log(input)
        // input.select();
        // if (document.execCommand('copy')) {
        //   document.execCommand('copy');
        //   console.log('复制成功');
        // }
      }
    },
    components:{
      detail,
      appHeader
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
    .el-textarea{
      width:100%;
    }
  }
  .el-icon-edit,.el-icon-delete{
    // font-size: 20P
  }
  .el-dialog{
    width:90%;
    .el-form-item{
      margin-bottom:0px;
    }
  }
</style>