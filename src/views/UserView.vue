<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="selectData.role"
            class="m-2"
            placeholder="请选择"
            size="large"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="nickName" label="姓名" width="180" />
    <el-table-column prop="role" label="角色">
      <template #default="scope">
        <el-button
          v-for="item in scope.row.role"
          :key="item.role"
          link
          size="small"
          @click.prevent="deleteRow(scope)"
        >
          {{ item.roleName }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="role" label="操作">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="changeUser(scope.row)"
        >
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="isShow" title="Shipping address">
    <el-form :model="active">
      <el-form-item label=" 姓名" label-width="50px">
        <el-input v-model="active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="active.role" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUser">更改</el-button>
        <el-button type="primary" @click="isShow = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { getUserList, getRoleList } from "@/request/api";
import { InitData, type ListInt } from "../types/user";
import { onMounted, reactive, toRefs, watch } from "vue";
const data = reactive(new InitData());
const { selectData, list, roleList, isShow, active } = toRefs(data);
onMounted(() => {
  getUser();
  getRole();
});
const getUser = () => {
  getUserList().then((res) => {
    data.list = res.data;
  });
};
const getRole = () => {
  getRoleList().then((res) => {
    data.roleList = res.data;
  });
};
const deleteRow = (row: any) => {
  console.log(row);
};
const changeUser = (row: ListInt) => {
  data.active = {
    id: row.id,
    nickName: row.nickName,
    userName: row.userName,
    role: row.role.map((value: any) => value.role || value.roleId),
  };
  data.isShow = true;
};
const onSubmit = () => {
  let arr: ListInt[] = [];
  if (data.selectData.nickName || data.selectData.role) {
    if (data.selectData.nickName) {
      arr = data.list.filter((value) => {
        return value.nickName.indexOf(data.selectData.nickName) !== -1;
      });
    }
    if (data.selectData.role) {
      arr = (data.selectData.nickName ? arr : data.list).filter((value) => {
        return value.role.find((item) => item.role === data.selectData.role);
      });
    }
  } else {
    arr = data.list;
  }
  data.list = arr;
  watch([() => data.selectData.nickName, () => data.selectData.role], () => {
    if (data.selectData.nickName == "" && data.selectData.role === 0) {
      getUser();
      getRole();
    }
  });
};
const updateUser = () => {
  let obj: any = data.list.find((value) => value.id == data.active.id);
  obj.nickName = data.active.nickName;
  obj.role = data.roleList.filter(
    (value) => data.active.role.indexOf(value.roleId) !== -1
  );
  data.list.forEach((item, i) => {
    if (item.id == obj.id) {
      data.list[i] = obj;
    }
  });
  data.isShow = false;
  console.log(obj.role);
};
</script>

<style lang="less" scoped></style>
