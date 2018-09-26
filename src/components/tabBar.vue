<template>
    <van-tabbar v-model="active" @change="tabChange">
        <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item icon="records">标签</van-tabbar-item>
        <van-tabbar-item icon="chat">消息</van-tabbar-item>
        <van-tabbar-item icon="contact">我</van-tabbar-item>
    </van-tabbar>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class tabBar extends Vue {
    active: number = 0;
    tabChange (active: number) {
        
    }
}
</script>

