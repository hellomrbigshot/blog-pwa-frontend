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
import { registerApi, getUserInfo } from '@/api/login'
import '@/assets/css/login.scss'
@Component
export default class Register extends Vue {
    title: string = '世说新语';
    username: string = '';
    password: string = '';
    repassword: string = '';
    logoUrl: string = require('@/assets/img/logo_white_transparent.png');
    get redirect () {
        return this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect) || '';
    }
    submit () {
        try {
            if (!this.username.trim()) {
                throw new Error('请填写用户名');
            }
            if (!this.password.trim()) {
                throw new Error('请填写密码');
            }
            if (!this.repassword.trim()) {
                throw new Error('请确认密码');
            }
            if (this.repassword.trim() !== this.password.trim()) {
                throw new Error('两次密码输入不一致');
            }
            registerApi({ username: this.username.trim(), password: this.password.trim(), repassword: this.repassword.trim() }).then(res => {
                this.$toast.success('注册成功');
                this.Cookies.set('user', this.username);
                getUserInfo(this.username).then((res: any) => {
                    const { data } = res;
                    localStorage.setItem('user', JSON.stringify(data));
                    const url = this.redirect && this.redirect || '/pages';
                    this.$router.push(url);
                })
            }) 
        } catch (e) {
            this.$toast.fail(e.message);
        }
        
        

    }
}

</script>

