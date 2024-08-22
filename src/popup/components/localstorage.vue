<template>
  <div class="localstorage-page">
    <el-table
      :data="data"
      :empty-text="$t('lang.empty')"
      @row-click="clickTable"
      stripe
      border
      ref="refTable"
      style="width: 100%"
    >
      <el-table-column label="" type="expand">
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
                placeholder=""
                v-model="props.row.value"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="Name"
        align="center"
        show-overflow-tooltip
        prop="name"
      >
      </el-table-column>
      <el-table-column
        label="Value"
        align="center"
        show-overflow-tooltip
        width="320"
        prop="value"
      >
      </el-table-column>
      <el-table-column label="Action" align="center" width="130">
        <template slot-scope="scope">
          <div class="action-button-wrap">
            <el-button size="mini" @click="editItem(scope.$index, scope.row)">
              <i class="el-icon-edit"></i
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="Copy value"
              placement="top"
            >
              <el-button
                size="mini"
                @click.stop="copyItem(scope.$index, scope.row)"
              >
                <i class="el-icon-document-copy"></i
              ></el-button>
            </el-tooltip>

            <el-button
              size="mini"
              type="danger"
              @click.stop="deleteItem(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="dialogFormVisible">
      <el-form label-position="left" class="demo-table-expand">
        <el-form-item label="name">
          <!-- <span>{{ edit.name }}</span> -->
          <el-input
            type="textarea"
            :rows="2"
            placeholder=""
            v-model="edit.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="value">
          <el-input
            type="textarea"
            :rows="2"
            placeholder=""
            v-model="edit.value"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          $t("lang.cancel")
        }}</el-button>
        <el-button type="primary" @click.stop="submit">{{
          $t("lang.save")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      data: [],
      edit: {
        name: "",
        value: "",
      },
      dialogFormVisible: false,
    };
  },
  props: {},
  created() {
    this.getLocalStorage();
  },
  methods: {
    getLocalStorage() {
      let self = this;
      self.data = [];
      chrome.tabs.query(
        {
          status: "complete",
          windowId: chrome.windows.WINDOW_ID_CURRENT,
          active: true,
        },
        function(tab) {
          let tabId = tab[0].id;
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              func: () => {
                let localStorageData = {};
                for (let key in localStorage) {
                  if (localStorage.hasOwnProperty(key)) {
                    localStorageData[key] = localStorage.getItem(key);
                  }
                }
                return localStorageData;
              },
            },
            (results) => {
              if (results && results[0] && results[0].result) {
                var data = results[0].result;
                for (var name in data) {
                  let item = {};
                  item.name = name;
                  item.value = data[name];
                  self.data.push(item);
                }
              }
            }
          );
        }
      );
    },
    clickTable(row, index, e) {
      this.$refs.refTable.toggleRowExpansion(row);
    },
    copyItem(index, row) {
      const inputEl = document.createElement("input");
      inputEl.value = row.value;
      inputEl.style.opacity = "0";
      inputEl.style.position = "fixed";
      inputEl.style.top = "0px";
      inputEl.style.left = "0px";
      document.body.appendChild(inputEl);
      inputEl.select();
      const result = document.execCommand("copy");
      if (result) {
        this.$message({
          message: `Copied`,
          type: "success",
          showClose: true,
        });
      }
    },
    deleteItem(index, row) {
      let self = this;
      chrome.tabs.query(
        {
          status: "complete",
          windowId: chrome.windows.WINDOW_ID_CURRENT,
          active: true,
        },
        function(tab) {
          let tabId = tab[0].id;
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              func: (name) => {
                localStorage.removeItem(name);
              },
              args: [row.name],
            },
            (results) => {
              // 处理脚本执行完成后的回调
              self.$message({
                message: `${row.name} deleted`,
                type: "success",
                showClose: true,
              });
              self.data = self.data.filter((item) => {
                return item.name !== row.name;
              });
            }
          );
        }
      );
    },
    editItem(index, row) {
      this.edit = { ...row };
      this.dialogFormVisible = true;
    },
    submit() {
      let self = this;
      chrome.tabs.query(
        {
          status: "complete",
          windowId: chrome.windows.WINDOW_ID_CURRENT,
          active: true,
        },
        function(tab) {
          let tabId = tab[0].id;
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              func: (name, value) => {
                localStorage.setItem(name, value);
              },
              args: [self.edit.name, self.edit.value],
            },
            (results) => {
              // 在脚本执行完成后显示消息和更新状态
              self.$message({
                message: `Success`,
                type: "success",
                showClose: true,
              });
              self.getLocalStorage(); // 更新本地存储或其他相关操作
              self.dialogFormVisible = false; // 关闭对话框
            }
          );
        }
      );
    },
    deleteAll() {
      let self = this;
      chrome.tabs.query(
        {
          status: "complete",
          windowId: chrome.windows.WINDOW_ID_CURRENT,
          active: true,
        },
        function(tab) {
          let tabId = tab[0].id;
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              func: () => {
                localStorage.clear();
              },
            },
            (results) => {
              // 在脚本执行完成后显示消息和更新状态
              self.$message({
                message: `Success`,
                type: "success",
                showClose: true,
              });
              self.data = []; // 清空本地数据
            }
          );
        }
      );
    },
  },
};
</script>
<style lang="scss">
.localstorage-page {
  .el-form-item__label {
    padding-left: 10px;
  }
  .action-button-wrap {
    display: flex;
    flex: 1;
    justify-content: space-around;
    button {
      padding: 7px 9px;
    }
  }
}
</style>
