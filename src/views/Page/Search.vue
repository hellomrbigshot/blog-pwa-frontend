<template>
    <div>
        <form action="/">
            <van-search placeholder="请输入搜索关键词" v-model="keywords" @search="seachPage()" />
        </form>
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
        'Page': () => import('./components/Page.vue')
    }
})
export default class Search extends Vue {
    keywords: string = '';
    pullLoading: boolean = false;
    list: object[] = [];
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
}
</script>

