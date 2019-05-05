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
        label="name"
        align='center'
        show-overflow-tooltip
        prop="name">
      </el-table-column>
      <el-table-column
        label="value"
        align='center'
        show-overflow-tooltip
        width='120'
        prop="value">
      </el-table-column>
      <el-table-column
        class='cookie-value'
        label="more"
        align='center'
        show-overflow-tooltip
        >
        <template slot-scope='scope'>
          <el-button
              size="mini"
              @click="editItem(scope.$index, scope.row)"><i class="el-icon-edit" @click.stop="editItem(scope.$index, scope.row)"></i></el-button>
            <el-button
              size="mini"
              type="danger"
              @click.stop='deleteItem(scope.$index, scope.row)'
              ><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
 </div>
</template>
<script>
export default {
  data: () => {  
    return{
      data:[]
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
      chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        let tabId = tab[0].id;
        chrome.tabs.executeScript(
            tabId,
            { code: `JSON.stringify(localStorage)` },
            function(d) {
              var data = JSON.parse(d);
              console.log(data)
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
    }
  }
}
</script>
<style>

</style>


