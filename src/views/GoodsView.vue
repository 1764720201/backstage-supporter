<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <el-table :data="dataList.comList" border style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="introduce" label="详情" />
  </el-table>
  <el-pagination
    @current-change="currentChange"
    @size-change="sizeChange"
    layout="prev, pager, next"
    :total="data.selectData.count * 2"
  />
</template>
<script setup lang="ts">
import { getGoodsList } from "@/request/api";
import { computed, onMounted, reactive, toRefs, watch } from "vue";
import { InitData, type ListInt } from "../types/goods";
const data = reactive(new InitData());
const { selectData, list } = toRefs(data);
const currentChange = (page: number) => {
  data.selectData.page = page;
};
const sizeChange = (pageSize: number) => {
  data.selectData.pageSize = pageSize;
};
const dataList = reactive({
  comList: computed(() => {
    return data.list.slice(
      (data.selectData.page - 1) * data.selectData.pageSize,
      data.selectData.page * data.selectData.pageSize
    );
  }),
});
onMounted(() => {
  getGoodsDetail();
});
const getGoodsDetail = () => {
  getGoodsList().then((res) => {
    data.list = res.data;
    data.selectData.count = res.data.length;
  });
};
const onSubmit = () => {
  let arr: ListInt[] = [];
  if (data.selectData.title || data.selectData.introduce) {
    if (data.selectData.title) {
      arr = data.list.filter((value) => {
        return value.title.indexOf(data.selectData.title) !== -1;
      });
    }
    if (data.selectData.introduce) {
      arr = data.list.filter((value) => {
        return value.introduce.indexOf(data.selectData.introduce) !== -1;
      });
    }
  } else {
    arr = data.list;
  }
  data.selectData.count = arr.length;
  data.list = arr;
  watch([() => data.selectData.title, () => data.selectData.introduce], () => {
    if (data.selectData.title == "" && data.selectData.introduce == "") {
      getGoodsDetail();
    }
  });
};
</script>

<style lang="less" scoped></style>
