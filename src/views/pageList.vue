<template>
    <div>
        <div>
            <van-search placeholder="请输入搜索关键词" v-model="keywords" />
        </div>
        <van-tabs v-model="active">
            <van-tab title="最热">

            </van-tab>
            <van-tab title="最新">最新</van-tab>
            <van-tab title="关注">关注</van-tab>
        </van-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class pageList extends Vue {
    keywords: string = '';
    active: number = 0;
}
</script>

