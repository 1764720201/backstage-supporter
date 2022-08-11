<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="authority"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button @click="changeAuthority">确认修改</el-button>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { InitData } from "@/types/authority";
import { onMounted, reactive, toRefs } from "vue";
import { getAuthorityList } from "@/request/api";
onMounted(() => {
  getAuthorityList().then((res) => {
    console.log(res);
    data.list = res.data;
  });
});
const route = useRoute();
const params: any = route.params;
const data = reactive(new InitData(params.id, params.authority));
const { id, authority, list, treeRef } = toRefs(data);
const changeAuthority = () => {
  console.log(
    data.treeRef.getCheckedKeys().sort(function (a: number, b: number) {
      return a - b;
    })
  );
};
</script>
<style lang="less" scoped></style>
