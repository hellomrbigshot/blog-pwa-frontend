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
            </van-cell-group>
            <van-button class="login-btn" style="margin-top: 10px;" size="large" @click="submit">登录</van-button>
            <div style="overflow: auto; margin-top: 10px;"><router-link :to="{ name: 'register', query: { redirect: this.redirect } }" style="font-size: 13px; float: right; color: #fff;">注册账号</router-link></div>
            <div class="div-line">
                <div class="line-content">其他账号登录</div>
            </div>
            <div>
                <div style="margin: 40px auto; width: 120px;">  
                    <a href="/api/oauth/github">
                        <van-icon name="github-fill" size="40px" color="#fff"/>
                    </a>
                    <a href="/api/oauth/weibo">
                        <van-icon name="weibo" size="40px" style="margin-left: 40px;" color="#fff"/>
                    </a>
                </div>
            </div>
        </div>  
        

    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { loginApi, getUserInfo } from '@/api/login'
import '@/assets/css/login.scss'
@Component
export default class Login extends Vue {
    title: string = '世说新语';
    username: string = '';
    password: string = '';
    logoUrl: string = require('@/assets/img/logo_white_transparent.png');
    get redirect () {
        return this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect) || '';
    }
    submit () {
        if (!this.username.trim()) {
            this.$toast('请填写用户名');
            return false;
        }
        if (!this.password.trim()) {
            this.$toast('请填写密码');
            return false;
        }
        loginApi({ username: this.username, password: this.password }).then((res: any) => {
            this.$toast.success('登录成功');
            this.Cookies.set('user', this.username);
            getUserInfo(this.username).then((res: any) => {
                const { data } = res;
                localStorage.setItem('user', JSON.stringify(data));
                const url = this.redirect && this.redirect || '/pages';
                this.$router.push(url);
            })
        })

    }
}
</script>


