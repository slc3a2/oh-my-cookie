<template>
  <div class="cookie-page">
     <el-table
      :data="data"
      :empty-text="$t('lang.empty')"
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
                :rows="1"
                type="textarea"
                placeholder="-"
                v-model="props.row.value">
              </el-input>
            </el-form-item>
            <el-form-item label="path">
              <span>{{ props.row.path }}</span>
            </el-form-item>
            <el-form-item label="expiration">
              <span>{{ (props.row.hasOwnProperty("expirationDate") && props.row.expirationDate) ? numberToTime(props.row.expirationDate) : "-" }}</span>
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
        align='center'
        show-overflow-tooltip
        prop="domain">
      </el-table-column>
      <el-table-column
        label="name"
        show-overflow-tooltip
        align='center'
        prop="name">
      </el-table-column>
      <el-table-column
        class='cookie-value'
        label="value"
        align='center'
        show-overflow-tooltip
        prop="value">
      </el-table-column>
      <el-table-column
        class='cookie-value'
        label="action"
        align='center'
        width='130'
        >
        <template slot-scope='scope'>
          <el-button
              size="mini"
              @click.stop="editItem(scope.$index, scope.row)">
              <i class="el-icon-edit"></i></el-button>
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
      
    }
  },
  props: {
    data: {
      default: function() {
        return [{}]
      }
    },
    handleEdit:{
        default: function() {
            return ()=>{}
        }
    }
  },
  methods:{
    editItem(index, row){
        this.$emit('handleEdit', index, row)
    },
    deleteItem(index, row){
        this.$emit('handleDele', index, row)
    },
    clickTable(row,index,e){
        this.$refs.refTable.toggleRowExpansion(row)
    },
    numberToTime(timenumber) {
        let t = String(parseInt(timenumber)).length === 10 ? timenumber * 1000 : timenumber
        const date = new Date(t)
        const Y = date.getFullYear() + '-'
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + ' ' + h + m + s
    }
  }
}
</script>
<style lang="scss">
.cookie-page{
  .el-form-item__label{
    padding-left: 10px;
  }
}
</style>


