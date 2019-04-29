<template>
  <div>
    <van-nav-bar 
      left-arrow
      :title="title"
      :fixed="true"
      @click-left="clickLeft"
      v-if="$route.meta && !$route.meta.hideHeader">
      <div 
        v-if="title === '世说新语'"
        slot="title"
        @click="$router.push({ name: 'pageListPage' })"
        style="padding: 5px 0;">
        <img :src="logoUrl" height="36px;" />
      </div>
      <van-icon name="search" slot="left" v-if="showSearchIcon" />
    </van-nav-bar>
    <div 
      :style="{
        minHeight: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
        paddingTop: $route.meta && !$route.meta.hideHeader && '46px' || '0',
        background: '#f5f6fa', paddingBottom: $route.meta && typeof $route.meta.tabActive !== 'undefined' && '60px' || '0' 
      }">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
    </div>
    <tab-bar v-if="$route.meta && typeof $route.meta.tabActive !== 'undefined'"></tab-bar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import mixin from '@/utils/mixin'
import io from 'socket.io-client'
@Component({
  components: {
    tabBar: () => import('@/components/tabBar.vue')
  },
  mixins: [mixin]
})
export default class Home extends Vue {
  title: string = '世说新语'
  active: number = 0
  aliveArray: [string] = ['pageList']
  showSearchIcon: boolean = true
  logoUrl: string = require('@/assets/img/logo_black_transparent.png')
  socket: any = io(`${process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'https://hellomrbigbigshot.xyz'}`)
  mounted() {
    this.checkRoute(this.$route)
    this.socket.on('unread-comment', (msg: number) => {
      const unreadMsgNum = this.$store.state.unreadMsgNum
      if (msg !== unreadMsgNum) {
        this.$store.commit('changeMsgNum', msg)
      }
    })
  }
  @Watch('$route')
  routeChange(newVal: object, oldVal: object) {
    this.checkRoute(newVal)
  }
  checkRoute(route: any) {
    if (route.meta && route.meta.search) {
      this.showSearchIcon = true
    } else {
      this.showSearchIcon = false
    }
    if (route.meta && route.meta.rewriteNavbar) {
      this.title = route.meta.title
    } else {
      this.title = '世说新语'
    }
  }
  clickLeft() {
    if (!this.showSearchIcon) {
      this.$router.go(-1)
      return false
    }
    this.$router.push({ name: 'pageSearch' })
  }
}
</script>