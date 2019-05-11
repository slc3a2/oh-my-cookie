<template>
 <div>
    <el-table
      :data="data"
      :empty-text="$t('lang.empty')"
      @row-click="clickTable"
      stripe
      border
      ref="refTable"
      style="width: 100%">
      <el-table-column
        label=""
        type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
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
          </el-form> 
        </template>
      </el-table-column>
      <el-table-column
        label="name"
        align='center'
        show-overflow-tooltip

        prop="name">
      </el-table-column>
      <el-table-column
        label="value"
        align='center'
        show-overflow-tooltip
        width='320'
        prop="value">
      </el-table-column>
      <el-table-column
        class='cookie-value'
        label="more"
        align='center'
        width='130'
        >
        <template slot-scope='scope'>
          <el-button
              size="mini"
              @click="editItem(scope.$index, scope.row)">
              <i class="el-icon-edit"></i></el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop='deleteItem(scope.$index, scope.row)'
              ><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="dialogFormVisible">
      <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="name">
              <span>{{ edit.name }}</span>
            </el-form-item>
            <el-form-item label="value">
              <el-input
                type="textarea"
                :rows="2" 
                placeholder="请输入内容"
                v-model="edit.value">
              </el-input>
            </el-form-item>
          </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('lang.cancel')}}</el-button>
      <el-button type="primary" @click.stop="submit">{{$t('lang.save')}}</el-button>
    </div>
  </el-dialog>
 </div>
</template>
<script>
export default {
  data: () => {  
    return{
      data:[],
      edit:{
        name:'',
        value:'',
      },
      dialogFormVisible:false
    }
  },
  props: {
    
  },
  created(){
    this.getLocalStorage()
  },
  methods:{
    getLocalStorage(){
      let self = this;
      self.data = [];
      chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        let tabId = tab[0].id;
        chrome.tabs.executeScript(
            tabId,
            { code: `JSON.stringify(localStorage)` },
            function(d) {
              var data = JSON.parse(d);
              for (var name in data) {
                let item = {};
                var data = JSON.parse(d);
                item.name = name;
                item.value = data[name];
                self.data.push(item);
              }
            }
          )
        })
    },
    clickTable(row,index,e){
        this.$refs.refTable.toggleRowExpansion(row)
    },
    deleteItem(index,row){
      let self= this;
      chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        let tabId = tab[0].id;
        chrome.tabs.executeScript(
            tabId,
            { code: `localStorage.removeItem('${row.name}')` },
            function(d) {
              console.log(d);
              self.$message({
                message: `${row.name} is deleted`,
                type: 'success'
              });
              self.data = self.data.filter((item)=>{return item.name != row.name})
            }
          )
        })
    },
    editItem(index,row){
      this.edit = {...row}
      this.dialogFormVisible = true;
    },
    submit(){
      let self= this;
      chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        let tabId = tab[0].id;
        chrome.tabs.executeScript(
            tabId,
            { code: `localStorage.setItem('${self.edit.name}','${self.edit.value}')`},
            function(d) {
              self.$message({
                message: `update successful`,
                type: 'success'
              });
              self.getLocalStorage();
              self.dialogFormVisible = false;
            }
          )
        })
    },
    deleteAll(){
      let self = this;
      chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        let tabId = tab[0].id;
        chrome.tabs.executeScript(
            tabId,
            { code: `localStorage.clear()` },
            function(d) {
              console.log(d);
              self.$message({
                message: `successfully remove`,
                type: 'success'
              });
              self.data = [];
            }
          )
      })
    }
  }
}
</script>
<style>

</style>


