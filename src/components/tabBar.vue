<template>
    <van-tabbar v-model="active" @change="tabChange" active-color="#07c160">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="notes-o">标签</van-tabbar-item>
        <van-tabbar-item icon="chat-o">消息</van-tabbar-item>
        <van-tabbar-item icon="user-o">我</van-tabbar-item>
    </van-tabbar>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import io from 'socket.io-client'
interface Route {
  path: string
  fullPath: string
  name: string
  meta: object
}
@Component
export default class tabBar extends Vue {
    active: number = 0
    tabObj: string[] = ['pages', 'tags', 'comments', 'mine']
    socket: any = io(`${process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'https://hellomrbigbigshot.xyz'}`)
    unreadMsgNum: number = 0
    @Watch('$route', { immediate: true, deep: true })
    onRouteChanged (val: Route, oldVal: Route) {
        this.active = this.tabObj.findIndex((item: string) => val.fullPath.indexOf(item) > -1)
    }
    mounted () {
        this.socket.on('connect', () => {
          // console.log('connect')
        })
        this.socket.on("unread-comment", (msg: number) => {
          console.log(msg)
          if (msg > 0 && msg !== this.unreadMsgNum) {
            this.unreadMsgNum = msg
          }
        })
    }
    tabChange (active: number) {
        this.$router.push({ name: this.tabObj[active] })
    }
}
</script>

