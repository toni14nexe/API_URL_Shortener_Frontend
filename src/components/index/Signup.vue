<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
const userData = ref({
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});
const mainView = ref(true);
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function signup() {
  if (!btnDisabled.value)
    if (userData.value.password === userData.value.passwordConfirmation)
      if (emailRegex.test(userData.value.email))
        if (
          userData.value.username.length >= 5 &&
          userData.value.username.length <= 50
        )
          if (userData.value.password.length > 8)
            userStore.signup(userData.value).then((response) => {
              if (response) mainView.value = false;
            });
          else userData.value.password = '';
        else userData.value.username = '';
      else userData.value.email = '';
    else {
      userData.value.password = '';
      userData.value.passwordConfirmation = '';
    }
}

const btnDisabled = computed(() => {
  if (
    userData.value.password === userData.value.passwordConfirmation &&
    emailRegex.test(userData.value.email) &&
    userData.value.username.length >= 5 &&
    userData.value.username.length <= 50 &&
    userData.value.password.length >= 8
  )
    return false;
  return true;
});
</script>

<template>
  <el-space v-if="mainView" size="large" direction="vertical">
    <el-row class="color-primary"> Sign up </el-row>
    <el-row>
      <el-input
        v-model="userData.username"
        @keyup.enter="signup"
        placeholder="Username"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="userData.email"
        @keyup.enter="signup"
        placeholder="Email"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="userData.password"
        type="password"
        @keyup.enter="signup"
        placeholder="Password"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="userData.passwordConfirmation"
        type="password"
        @keyup.enter="signup"
        placeholder="Confirm Password"
      />
    </el-row>
    <el-row>
      <el-button type="primary" plain @click="signup" :disabled="btnDisabled"
        >Sign up</el-button
      >
    </el-row>
  </el-space>
  <el-space v-else>
    <el-row class="color-primary">
      Verification email send to {{ userData.email }}.
      <br />
      Please check your email and verificate account.
    </el-row>
  </el-space>
</template>

<style scoped></style>
