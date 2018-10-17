<template>
    <van-tabbar v-model="active" @change="tabChange">
        <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item icon="records">标签</van-tabbar-item>
        <van-tabbar-item icon="chat">消息</van-tabbar-item>
        <van-tabbar-item icon="contact">我</van-tabbar-item>
    </van-tabbar>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
interface Route {
  path: string;
  fullPath: string;
  name: string;
  meta: object;
}
@Component
export default class tabBar extends Vue {
    active: number = 0;
    tab_obj: any = ['pages', 'tags', 'comments', 'mine'];
    @Watch('$route', { immediate: true, deep: true })
    onRouteChanged (val: Route, oldVal: Route) {
        this.active = this.tab_obj.findIndex((item: string) => val.fullPath.indexOf(item) > -1);
    }
    mounted () {
        // console.log(this.$route)
    }
    
    tabChange (active: number) {
        this.$router.push({ name: this.tab_obj[active] })
    }
}
</script>

