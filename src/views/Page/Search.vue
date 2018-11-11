<template>
    <div>
        <form action="/">
            <van-search placeholder="请输入搜索关键词" v-model="keywords" @search="seachPage()" style="background: default;"/>
        </form>
        <div class="hot-search-items">
            <span>热门：</span>
            <a href="#" class="hot-item" v-for="item in hotItems" @click="searchItem(item)">{{ item }}</a>
        </div>
        <pageList :query="{ keywords: keywords }" :api="api" ref="pageList"></pageList>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { searchPage }  from '@/api/page.ts'
import { setTimeout } from 'timers';
@Component({
    components: {
        pageList: () => import('@/components/Page/List.vue')
    }
})
export default class Search extends Vue {
    keywords: string = '';
    pullLoading: boolean = false;
    list: object[] = [];
    hotItems: string[] = ['Javascript', 'Vue.js', 'get it', '碎碎念'];
    api: string = '/api/page/searchpage';
    seachPage () {
        setTimeout(() => {
            (this.$refs['pageList'] as any).onRefresh();
        }, 0)
        
    }
    searchItem (name: string) {
        this.keywords = name;
        this.seachPage();
    }
}
</script>
<style lang="scss" scoped>
.hot-search-items {
    font-size: 12px;
    padding: 5px 15px;
    .hot-item {
        padding: 3px 5px;
        background: #0080ff;
        margin-left: 10px;
        color: #fff;
        border-radius: 5px;
    }
}
</style>


