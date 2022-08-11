<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="id" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button link size="small" @click="changeRole(scope.row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { getRoleList } from "@/request/api";
import { onMounted, reactive, toRefs } from "vue";
import { InitData } from "@/types/role";
import type { ListInt } from "@/types/role";
import { useRoute, useRouter } from "vue-router";
import { find } from "lodash";
const router = useRouter();
const route = useRoute();
onMounted(() => {
  getRoleList().then((res) => {
    data.list = res.data;
  });
});
const addRole = () => {
  ElMessageBox.prompt("请输入角色名称", "添加", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(({ value }) => {
      if (value) {
        data.list.push({
          roleId: data.list.length + 1,
          roleName: value,
          authority: [],
        });
      }
      ElMessage({
        type: "success",
        message: `${value}角色添加成功`,
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消操作",
      });
    });
};

const changeRole = (row: ListInt) => {
  router.push({
    name: "authority",
    params: {
      id: row.roleId,
    },
  });
};

const data = reactive(new InitData());
const { list } = toRefs(data);
</script>

<style lang="less" scoped></style>
