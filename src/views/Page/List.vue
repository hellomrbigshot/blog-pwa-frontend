<template>
    <div>
        <div>
            <van-search placeholder="请输入搜索关键词" v-model="keywords" />
        </div>
        <van-tabs v-model="active" style="padding-bottom: 50px;" swipeable :sticky="true">
            <van-tab title="最热">
                <van-pull-refresh v-model="pullLoading" @refresh="onRefresh">
                    <van-list
                        v-model="listLoading"
                        :finished="listFinished"
                        @load="onLoad"
                        >
                        <div style="padding: 5px 15px;">
                            <Page v-for="(detail, index) in list" :key="index" :page="detail"></Page>
                        </div>
                    </van-list>
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
// import { setTimeout } from 'timers';
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
    pullLoading: boolean = false;
    listLoading: boolean = false;
    listFinished: boolean = false;
    list: any = [];
    mounted () {
        this.pullLoading = true;
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: '', content: '', secret: false }).then(res => {
            const { total, result } = res.data;
            this.list = result;
            this.total = total;
            if (this.total <= this.pageSize) this.listFinished = true;
        })
    }
    onRefresh () {
        this.page = 1;
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: '', content: '', secret: false }).then(res => {
            const { total, result } = res.data;
            this.pullLoading = false;
            this.listFinished = false;
            this.list = result;
            this.total = total;
        })
    }
    onLoad () {
        this.page = this.page + 1;
        this.listLoading = true;
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: '', content: '', secret: false }).then(res => {
            const { result } = res.data;
            this.listLoading = false;
            this.list.push(...result);
            if (this.page * this.pageSize > this.total) this.listFinished =true;

        })
    }
}
</script>

