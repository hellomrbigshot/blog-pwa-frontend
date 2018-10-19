<template>
    <div class="login-main">
        <van-nav-bar
            :title="title"
            left-arrow
            @click-left="$router.go(-1)"
        >
            <div slot="title" @click="$router.push({ name: 'pageList' })">{{ title }}</div>
        </van-nav-bar>
        <div class="login-content">
            <van-cell-group >
                <van-field v-model="username" placeholder="请输入用户名" />
                <van-field type="password" v-model="password" placeholder="密码" />
                <van-field type="password" v-model="repassword" placeholder="确认密码" />
            </van-cell-group>
            <van-button style="margin-top: 10px;" size="large" @click="submit">注册</van-button>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Register extends Vue {
    title: string = '世说新语';
    username: string = '';
    password: string = '';
    repassword: string = '';
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

