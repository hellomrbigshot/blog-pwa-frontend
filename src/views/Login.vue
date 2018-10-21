<template>
    <div class="login-main">
        <van-nav-bar
            title="世说新语"
            left-arrow
            @click-left="$router.go(-1)"
        >
            <div slot="title" @click="$router.push({ name: 'pageList' })">{{ title }}</div>
        </van-nav-bar>
        <div class="login-content">
            <van-cell-group >
                <van-field v-model="username" placeholder="请输入用户名" />
                <van-field type="password" v-model="password" placeholder="密码" />
            </van-cell-group>
            <van-button style="margin-top: 10px;" size="large" @click="submit">登录</van-button>
            <div style="overflow: auto; margin-top: 5px;"><router-link :to="{ name: 'register' }" style="font-size: 13px; float: right; color: #000;">注册账号</router-link></div>
            <div class="div-line">
                <div class="line-content">其他账号登录</div>
            </div>
            <div>
                <div style="margin: 40px auto; width: 120px;">  
                    <van-icon name="github-fill" size="40px"/>
                    <van-icon name="weibo" size="40px" style="margin-left: 40px;"/>
                </div>
                
                
                <!-- <i class="iconfont icon-google"></i> -->
            </div>
        </div>  
        

    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { loginApi, getUserInfo } from '@/api/login'
@Component
export default class Login extends Vue {
    title: string = '世说新语';
    username: string = '';
    password: string = '';
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
            this.$toast('登录成功');
            this.Cookies.set('user', this.username);
            getUserInfo(this.username).then((res: any) => {
                const { data } = res;
                localStorage.setItem('user', JSON.stringify(data));
                const url = this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect) || '/pages';
                this.$router.push(url);
            })
        })

    }
}
</script>
<style lang="scss" scoped>
.login-main {
    height: 100vh;
    background: #eee;
    .login-content {
        padding: 0 10px;
        margin-top: 15vh;
    }
    .div-line {
        position: relative;
        width: 100%;
        height: 1px;
        background: #ddd;
        margin-top: 5vh;
        .line-content {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 5px 10px;
            font-size: 13px;
        }
    }
}
</style>


