<template>
  <div class="root">
    <div v-if="showSetting" class="main">
      <header>
        <appHeader
          @showSettingHandle="showSettingHandle"
          @exportJson="exportJson"
          @createCookie="handleEdit"
          @createLocal="editLocal"
          @createSession="editSession"
          @removeAll="removeAll"
          :activeName="activeName"
        />
      </header>
      <div class="content">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          :stretch="stretch"
        >
          <el-tab-pane label="cookie" name="cookie">
            <cookie
              :data="tableData"
              @handleEdit="handleEdit"
              @handleDele="handleDele"
            />
          </el-tab-pane>
          <el-tab-pane label="localStorage" name="localStorage">
            <localstorage ref="localStorage" />
          </el-tab-pane>
          <el-tab-pane label="sessionStorage" name="sessionStorage">
            <sessionstorage ref="sessionStorage" />
          </el-tab-pane>
        </el-tabs>
        <input class="exportJson" ref="exportJson" v-model="JSONCookie" />
        <el-dialog title="" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="domain">
              <el-input v-model="form.domain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="value">
              <el-input
                type="textarea"
                :rows="2"
                v-model="form.value"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="expirationDate">
              <br />
              <el-date-picker
                v-model="form.expirationDate"
                value-format="timestamp"
                type="datetime"
                placeholder=""
              >
              </el-date-picker>
              <!-- <el-input v-model="form.expirationDate" autocomplete="off"></el-input> -->
            </el-form-item>
            <el-form-item label="path">
              <el-input v-model="form.path" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="sameSite">
              <el-input v-model="form.sameSite" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="httpOnly">
              <el-tooltip
                :content="'httpOnly value: ' + form.httpOnly"
                placement="top"
              >
                <el-switch v-model="form.httpOnly"> </el-switch>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="secure">
              <el-tooltip
                :content="'secure value: ' + form.secure"
                placement="top"
              >
                <el-switch v-model="form.secure"> </el-switch>
              </el-tooltip>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">{{
              $t("lang.cancel")
            }}</el-button>
            <el-button type="primary" @click="submit">{{
              $t("lang.save")
            }}</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div v-else class="setting">
      <setting @hideSettingHandle="hideSettingHandle" />
    </div>
  </div>
</template>
<script>
import "./style/base.scss";
import cookie from "./components/cookie";
import localstorage from "./components/localstorage";
import sessionstorage from "./components/sessionstorage";
import detail from "./table";
import appHeader from "./header";
import setting from "./setting";
export default {
  data: () => {
    return {
      activeName: localStorage.getItem("handleClick") || "cookie",
      stretch: true,
      tableData: [],
      scope: "",
      url: "",
      search: "",
      currentPage: "",
      dialogFormVisible: false,
      showSetting: true,
      form: {
        domain: "",
        name: "",
        value: "",
        expirationDate: "",
        path: "",
        sameSite: "",
        hostOnly: false,
        httpOnly: false,
        secure: true,
        session: false,
      },
    };
  },
  computed: {
    JSONCookie() {
      return JSON.stringify(this.tableData);
    },
  },
  created() {
    let self = this;
    chrome.tabs.query(
      { windowId: chrome.windows.WINDOW_ID_CURRENT, active: true },
      function(tab) {
        self.currentPage = tab[0].url;
        self.getCookies(tab[0].url);
      }
    );
  },
  methods: {
    editLocal() {
      this.$refs.localStorage.editItem();
    },
    editSession() {
      this.$refs.sessionStorage.editItem();
    },
    handleClick(tab, event) {
      localStorage.setItem("handleClick", tab.label);
    },
    getCookies(url) {
      this.loading = true;
      let self = this;
      chrome.cookies.getAll({ url: url }, function(res) {
        self.tableData = res.map((cookie) => {
          return {
            ...cookie,
            expirationDate: cookie.expirationDate
              ? String(parseInt(cookie.expirationDate)).length === 10
                ? cookie.expirationDate * 1000
                : cookie.expirationDate
              : null,
          };
        });

        setTimeout(() => {
          self.loading = false;
        }, 100);
      });
    },
    deleteCookie(idx) {
      this.tableData = this.tableData.filter((item, index) => {
        return idx != index;
      });
    },
    removeAll(activeName) {
      if (activeName === "cookie") {
        this.tableData = [];
      } else if (activeName === "localStorage") {
        this.$refs.localStorage.deleteAll();
      } else if (activeName === "sessionStorage") {
        this.$refs.sessionStorage.deleteAll();
      }
    },
    handleEdit(index, data) {
      this.form = { ...data };
      this.dialogFormVisible = true;
    },
    handleDele(index, data) {
      chrome.cookies.remove(
        { url: this.currentPage, name: data.name },
        (res) => {
          this.$message({
            message: `${res.name} was deleted`,
            type: "success",
            showClose: true,
          });
          this.tableData = this.tableData.filter((item) => {
            return item.name != res.name;
          });
        }
      );
    },
    submit() {
      let self = this;
      let temp = this.form;
      delete temp.hostOnly;
      delete temp.session;
      chrome.cookies.set(
        {
          url: self.currentPage,
          ...temp,
        },
        function(cookie) {
          self.dialogFormVisible = false;
          chrome.tabs.query(
            { windowId: chrome.windows.WINDOW_ID_CURRENT, active: true },
            function(tab) {
              self.currentPage = tab[0].url;
              self.getCookies(tab[0].url);
            }
          );
          self.$message({
            message: `success`,
            type: "success",
            showClose: true,
          });
        }
      );
    },
    // 暂时不用
    filterValue(v) {
      if (!v.length) {
        let self = this;
        chrome.tabs.query(
          {
            status: "complete",
            windowId: chrome.windows.WINDOW_ID_CURRENT,
            active: true,
          },
          function(tab) {
            self.getCookies(tab[0].url);
          }
        );
      } else {
        this.tableData = this.tableData.filter((i) => {
          return i.value.indexOf(v) !== -1;
        });
      }
    },
    exportJson() {
      const input = this.$refs.exportJson;
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$message({
          message: `success`,
          type: "success",
          showClose: true,
        });
      } else {
        console.log("当前浏览器不支持复制");
      }
    },
    showSettingHandle() {
      this.showSetting = false;
    },
    hideSettingHandle() {
      this.showSetting = true;
    },
  },
  components: {
    detail,
    appHeader,
    setting,
    cookie,
    localstorage,
    sessionstorage,
  },
};
</script>
<style lang="scss">
body::-webkit-scrollbar {
  width: 0 !important;
}
.root {
  width: 600px;
  height: 600px;
  position: relative;
  padding: 2px 5px 10px;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 2;
  }
  .el-tabs {
    .el-tabs__nav-wrap {
      width: 100%;
      position: fixed;
      top: 36px;
      left: 0;
      background-color: #fff;
      z-index: 2;
    }
  }
  .content {
    padding-top: 78px;
    .el-tabs__item {
      user-select: none;
    }
    .el-dialog__header {
      padding: 0;
    }
    .input {
      margin-bottom: 10px;
    }
    .exportJson {
      position: absolute;
      left: -1000px;
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
    }
    .el-form--inline .el-form-item {
      display: block;
      .el-form-item__content {
        width: 81%;
      }
    }
    .el-table__row {
      cursor: pointer;
      .el-textarea {
        width: 100%;
      }
    }
    .el-dialog {
      width: 90%;
      margin-top: 12vh !important;
      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
