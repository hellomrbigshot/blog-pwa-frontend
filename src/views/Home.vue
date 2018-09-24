<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item icon="records">标签</van-tabbar-item>
            <van-tabbar-item icon="chat">消息</van-tabbar-item>
            <van-tabbar-item icon="contact">我</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
    @Prop() private title!: string;
    active: number = 0;
}
</script>