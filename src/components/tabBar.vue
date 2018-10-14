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
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
@Component
export default class tabBar extends Vue {
    active: number = 0;
    tab_obj: any = ['pageList', 'tags', 'comments', 'mine'];
    mounted () {
        // console.log(this.$route)
    }
    
    tabChange (active: number) {
        this.$router.push({ name: this.tab_obj[active] })
    }
    beforeRouteEnter () {
        console.log('beforeRouterEnter')
    }
    beforeRouteLeave () {
        console.log('aa')
    }
}
</script>

