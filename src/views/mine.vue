<template>
    <div>
        <div class="user-header" @click="$router.push({ name: 'login' })">
            <div class="avatar-icon" >
                <van-icon name="contact" size="25px" color="#fff" style="line-height: 40px;"></van-icon>
            </div>
            <div class="user-info">
                登录/注册
            </div>
            <van-icon name="arrow" style="line-height: 40px; float: right;"></van-icon>
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
export default class Mine extends Vue {
    
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
    }
    .user-info {
        font-size: 17px;
        // font-weight: 500;
        margin-left: 10px;
        float: left;
    }
}

</style>


