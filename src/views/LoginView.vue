<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登陆</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, ref } from "vue";
import type { LoginData } from "../types/login";
import type { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";

const data: LoginData = reactive({
  ruleForm: {
    username: "",
    password: "",
  },
});
const rules = {
  username: [
    {
      required: true,
      message: "请输入你的账号",
      trigger: "blur",
    },
    { min: 5, max: 10, message: "账号的长度在5-10之间", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "请输入你的密码",
      trigger: "blur",
    },
    { min: 6, max: 16, message: "密码的长度在8-16之间", trigger: "blur" },
  ],
};
const { ruleForm } = toRefs<LoginData>(data);
const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(data.ruleForm as unknown as LoginData).then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          console.log(res.data);
          router.push("/");
        } else {
          alert("账号或密码错误,请重新输入！");
          return;
        }
      });
    } else {
      alert("账号或密码长度有误");
      return false;
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") 100% 100%;
  padding: 1px;
  text-align: center;
  .demo-ruleForm {
    width: 40%;
    margin: 200px auto;
    padding: 40px;
    background-color: white;
    border-radius: 20px;
  }
}
</style>
