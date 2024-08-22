<template>
  <el-table :data="data" stripe style="width: 100%">
    <el-table-column prop="domain" label="域" width="180"> </el-table-column>
    <el-table-column prop="name" label="name" width="180"> </el-table-column>
    <el-table-column prop="value" label="value" width="180"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  data: () => {
    return {}
  },
  props: {
    data: {
      default: function () {
        return [{}]
      }
    }
  }
}
</script>
<style></style>
