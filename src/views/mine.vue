<template>
    <div>
        <div class="user-header" @click="!Cookies.get('user')&&$router.push({ name: 'login' })">
            <template v-if="!Cookies.get('user')">
                <div class="avatar-icon" >
                    <van-icon name="contact" size="25px" color="#fff" style="line-height: 40px;"></van-icon>
                </div>
                <div class="user-info">
                    登录/注册
                </div>
                <van-icon name="arrow" style="line-height: 40px; float: right;"></van-icon>
            </template>
            <template v-else>
                <div class="avatar-icon" >
                    <img :src="imgUrl" alt="" class="avatar-img" @error="imgError">
                </div>
                <div class="user-info">
                    <h4>{{ Cookies.get('user') }}</h4>
                </div>
            </template>
            
        </div>
        <van-cell-group style="margin-top: 10px;">
            <van-cell title="消息中心" @click="$router.push({ name: 'comments' })">
                <van-icon slot="icon" name="chat" color="#2db7f5" class="van-cell__left-icon"/>
            </van-cell>
            <van-cell title="文章列表" @click="$router.push({ name: 'myList' })">
                <van-icon slot="icon" name="wap-nav" color="#19b16b" class="van-cell__left-icon"/>
            </van-cell>
            <van-cell title="草稿箱" @click="$router.push({ name: 'draft' })">
                <van-icon slot="icon" name="tosend" color="#ff972a" class="van-cell__left-icon"/>
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 10px;">
            <van-cell title="设置" icon="setting" />
        </van-cell-group>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Mine extends Vue {
    imgUrl: string = require('../assets/img/avatar.jpg')
    defaultImg: string = require('../assets/img/avatar.jpg')
    mounted() {
        if (this.Cookies.get('user')) {
            this.imgUrl = `/api/file/avatar/user?username=${this.Cookies.user}`;
        }
    }
    imgError () {
        this.imgUrl = this.defaultImg;
    }
}
</script>
<style lang="scss" scoped>
.user-header {
    padding: 10px 15px;
    background: #fff;
    overflow: auto;
    margin: 10px 0;
    .avatar-icon {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        background: #eee;
        float: left;
        .avatar-img {
            border-radius: 50%;
        }
    }

    .user-info {
        font-size: 17px;
        // font-weight: 500;
        margin-left: 10px;
        float: left;
    }
}

</style>


