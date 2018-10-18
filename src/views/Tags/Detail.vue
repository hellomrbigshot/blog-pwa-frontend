<template>
    <div>
        <div class="tag-info-box">
            <div class="tag-info">
                <div>
                    <div class="tag-title">{{ name }}</div>
                    <div class="tag-meta">{{ total }} 篇文章</div>
                </div>
            </div>
        </div>
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="min-height: 90vh;">
            <van-list
                v-model="listLoading"
                :finished="listFinished"
                @load="onLoad"
                :offset="60"
                >
                <div style="padding: 5px 15px;">
                    <Page v-for="(detail, index) in list" :key="index" :page="detail"></Page>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getTagDetail } from '@/api/tag'
import { getPageList, searchPage }  from '@/api/page'
@Component({
    components: {
        'Page': () => import('@/views/Page/components/Page.vue')
    }
})
export default class tagDetail extends Vue {
    name: string = '';
    tagDetail: object = {};
    page: number = 1;
    pageSize: number = 5;
    total: number = 0;
    list: object[] = [];
    listFinished: boolean = false;
    listLoading: boolean = false;
    pullLoading: boolean = false;
    mounted () {
        this.name = this.$route.params.name;
        getTagDetail(this.name).then(res => {
            let { data } = res;
            this.tagDetail = data;
        })
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: 'tag', content: this.name, secret: false }).then(res => {
            const { total, result } = res.data;
            this.list = result;
            this.total = total;
            if (this.total <= this.pageSize) this.listFinished = true;
        })
    };
    onRefresh () {
        this.page = 1;
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: '', content: '', secret: false }).then(res => {
            const { total, result } = res.data;
            this.pullLoading = false;
            this.listFinished = false;
            this.list = result;
            this.total = total;
        })
    };
    onLoad () {
        this.page = this.page + 1;
        this.listLoading = true;
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: 'tag', content: this.name, secret: false }).then(res => {
            const { result } = res.data;
            this.listLoading = false;
            this.list.push(...result);
            if (this.page * this.pageSize > this.total) this.listFinished =true;
        })
    };
}
</script>
<style lang="scss" scoped>
.tag-info-box {
    height: 150px;
    position: relative;
    width: 100%;
    background: #f8f9fa;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
    color: #666;
    .tag-info {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        // padding: 4em 0;
        text-align: center;
        .tag-title {
            font-size: 25px;
            line-height: 30px;
            font-weight: 700;
            margin-bottom: 2px;
        }
        .tag-meta, .tag-desciption {
            font-size: 12px;
            margin-bottom: 2px;
        }
    }
}
</style>

