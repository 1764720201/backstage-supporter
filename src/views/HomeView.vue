<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"
            ><img src="../assets/logo.jpg" class="logo"
          /></el-col>
          <el-col :span="16"><h2>后台Demo</h2></el-col>
          <el-col :span="4" class="col-btn">
            <el-button @click="delToken">退出登录 </el-button></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px"
          ><el-menu
            active-text-color="#ffd04b"
            background-color="#c7c4fa"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item
              :index="item.path"
              v-for="item in list"
              :key="item.path"
            >
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter, type Router } from "vue-router";
const router: Router = useRouter();
const route = useRoute();
const list = router.getRoutes().filter((v) => v.meta.isShow);
const active = route.path;
const delToken = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<style lang="less" scoped>
.el-header {
  height: 80px;
  background-color: #c1bef9;
  .logo {
    height: 80px;
  }
  h2,
  .quit-login {
    text-align: center;
    height: 80px;
    line-height: 80px;
  }
  .col-btn {
    height: 80px;
    line-height: 80px;
  }
}

.el-aside {
  .el-menu {
    border-top: solid rgb(211, 210, 210) 1px;
    height: 99000px;
  }
}
</style>
