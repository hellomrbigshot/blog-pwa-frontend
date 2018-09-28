<template>
    <div>
        <div>
            <van-search placeholder="请输入搜索关键词" v-model="keywords" />
        </div>
        <van-tabs v-model="active">
            <van-tab title="最热">
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <div style="padding: 5px 15px;">
                        <Page v-for="(detail, index) in list" :key="index" :page="detail"></Page>
                    </div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="最新">最新</van-tab>
            <van-tab title="关注">关注</van-tab>
        </van-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPageList }  from '@/api/page.ts'
@Component({
    components: {
        'Page': () => import('./components/Page.vue')
    }
})
export default class pageList extends Vue {
    keywords: string = '';
    active: number = 0;
    page: number = 1;
    pageSize: number = 10;
    total: number = 0;
    isLoading: boolean = false;
    list = [];
    mounted () {
        this.isLoading = true;
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: '', content: '', secret: false }).then(res => {
            const { total, result } = res.data;
            this.list = result;
            this.total = total;
        })
    }
    onRefresh () {
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: '', content: '', secret: false }).then(res => {
            this.isLoading = false;
        })
    }
}
</script>

