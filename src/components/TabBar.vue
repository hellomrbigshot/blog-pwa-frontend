<template>
  <van-tabbar v-model="active" active-color="#07c160" @change="tabChange">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="notes-o">标签</van-tabbar-item>
    <van-tabbar-item v-if="unreadMsgNum" icon="chat-o" :info="unreadMsgNum">消息</van-tabbar-item>
    <van-tabbar-item icon="chat-o" v-else>消息</van-tabbar-item>
    <van-tabbar-item icon="user-o">我</van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
// import io from 'socket.io-client'
import { getUnReadCommentNum } from '@/api/comment'
interface Route {
  path: string
  fullPath: string
  name: string
  meta: object
}
@Component
export default class tabBar extends Vue {
  active: number = 0
  tabObj: string[] = ['page', 'tag', 'comment', 'user']
  @Watch('$route', { immediate: true, deep: true })
  onRouteChanged (val: Route, oldVal: Route) {
    this.active = this.tabObj.findIndex((item: string) => val.name.indexOf(item) > -1 || val.fullPath.indexOf(item) > -1)
  }
  get unreadMsgNum() {
    return this.$store.state.unreadMsgNum
  }
  // async mounted() {
    // await getUnReadCommentNum().then(res => { // 获取未读评论数量
    //   const { result } = res.data
    //   this.$store.commit('changeMsgNum', result)
    // })
  // }
  tabChange(active: number) {
    this.$router.push({ name: this.tabObj[active] })
  }
}
</script>

