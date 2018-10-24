<template>
    <div>
        <form action="/">
            <van-search placeholder="请输入搜索关键词" v-model="keywords" @search="seachPage()" style="background: default;"/>
        </form>
        <div class="hot-search-items">
            <span>热门：</span>
            <span class="hot-item" v-for="item in hotItems" @click="searchItem(item)">{{ item }}</span>
        </div>
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="min-height: 90vh;">
            <van-list>
                <div style="padding: 5px 15px;">
                    <Page v-for="(detail, index) in list" :key="index" :page="detail"></Page>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { searchPage }  from '@/api/page.ts'
@Component({
    components: {
        'Page': () => import('@/components/Page/Page.vue')
    }
})
export default class Search extends Vue {
    keywords: string = '';
    pullLoading: boolean = false;
    list: object[] = [];
    hotItems: string[] = ['Javascript', 'Vue.js', 'get it', '碎碎念']
    seachPage () {
        searchPage(this.keywords).then(res => {
            const { result } = res.data;
            this.list = result;
            this.pullLoading = false;
        })
    }
    onRefresh () {
        this.seachPage();
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
    }
}
</style>


