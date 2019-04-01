<template>
    <div>
        <van-nav-bar
            left-arrow
            :title="title"
            :fixed="true"
            @click-left="clickLeft"
            v-if="$route.meta && !$route.meta.hideHeader"
        >
            <div v-if="title==='世说新语'" slot="title" @click="$router.push({ name: 'pageListPage' })" style="padding: 5px 0;">
                <img :src="logoUrl" height="36px;"/>
            </div>
            <van-icon name="search" slot="left" v-if="showSearchIcon"/>
        </van-nav-bar>
        <div :style="{ minHeight: '100vh', overflow: 'auto', boxSizing: 'border-box', paddingTop: $route.meta && !$route.meta.hideHeader && '46px' || '0', background: '#f5f6fa', paddingBottom: $route.meta && typeof $route.meta.tabActive !== 'undefined' && '50px' || '0' }">
            <keep-alive >
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
    mounted () {
        this.checkRoute(this.$route)
        // window.addEventListener('scroll', this.debounce(this.handleScroll, 50), true)
    }
    @Watch('$route')
    routeChange (newVal: object, oldVal: object) {
        this.checkRoute(newVal)
    }
    checkRoute (route: any) {
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
    clickLeft () {
        if (!this.showSearchIcon) {
            this.$router.go(-1)
            return false
        }
        this.$router.push({ name: 'pageSearch' })
    }
    // handleScroll () {
    //   console.log(document.documentElement.scrollTop)
    // }
}
</script>