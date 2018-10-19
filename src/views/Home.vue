<template>
    <div>
        <van-nav-bar
            left-arrow
            :title="title"
            :fixed="true"
            @click-left="clickLeft"
        >
            <div slot="title" @click="$router.push({ name: 'pageList' })">{{ title }}</div>
            <van-icon name="search" slot="left" v-if="showSearchIcon"/>
        </van-nav-bar>
        <div :style="{ minHeight: '100vh', boxSizing: 'border-box', paddingTop: '46px', paddingBottom: $route.meta && typeof $route.meta.tab_active !== 'undefined' && '50px' || '0' }">
            <!-- <keep-alive> -->
                <router-view />
            <!-- </keep-alive> -->
        </div>
        <tab-bar v-if="$route.meta && typeof $route.meta.tab_active !== 'undefined'"></tab-bar>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    components: {
        tabBar: () => import('@/components/tabBar.vue')
    }
})
export default class Home extends Vue {
    title: string = '世说新语';
    active: number = 0;
    aliveArray: [string] = ['pageList'];
    showSearchIcon: boolean = true;
    mounted () {
        this.checkRoute(this.$route);
    }
    @Watch('$route')
    routeChange (newVal: object, oldVal: object) {
        this.checkRoute(newVal)
    }
    checkRoute (route: any) {
        if (route.meta && route.meta.search) {
            this.showSearchIcon = true;
        } else {
            this.showSearchIcon = false;
        }
    }
    clickLeft () {
        if (!this.showSearchIcon) {
            this.$router.go(-1);
            return false;
        }
        this.$router.push({ name: 'pageSeach' })

    }
}
</script>