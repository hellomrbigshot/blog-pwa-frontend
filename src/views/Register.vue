<template>
    <div class="login-main">
        <div class="login-header">
            <van-icon name="arrow-left" color="#fff" @click="$router.go(-1)"/>
        </div>
        <div class="login-content">
            <div>
                <img class="logo-img" :src="logoUrl" alt="">
            </div>
            <van-cell-group >
                <van-field v-model="username" placeholder="请输入用户名" />
                <van-field type="password" v-model="password" placeholder="密码" />
                <van-field type="password" v-model="repassword" placeholder="确认密码" />
            </van-cell-group>
            <van-button class="login-btn" style="margin-top: 10px;" plain size="large" @click="submit">注册</van-button>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import '@/assets/css/login.scss'
@Component
export default class Register extends Vue {
    title: string = '世说新语';
    username: string = '';
    password: string = '';
    repassword: string = '';
    logoUrl: string = require('@/assets/img/logo_blue_white.png');
    submit () {
        if (!this.username.trim()) {
            this.$toast('请填写用户名');
            return false;
        }
        if (!this.password.trim()) {
            this.$toast('请填写密码');
            return false;
        }
        if (!this.repassword.trim()) {
            this.$toast('请确认密码');
            return false;
        }
        if (this.repassword.trim() !== this.password.trim()) {
            this.$toast('两次密码输入不一致');
            return false;
        }
    }
}

</script>

