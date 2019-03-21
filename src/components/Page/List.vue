<template>
<div>
    <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="min-height: 90vh;">
        <van-list
            v-model="listLoading"
            :finished="listFinished"
            @load="onLoad"
            >
            <div v-if="list.length">
                <Page v-for="(detail, index) in list" :key="index" :page="detail"></Page>
            </div>
            <div v-else class="empty-content">暂时没有内容=。=</div>
        </van-list>
    </van-pull-refresh>
</div>  
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { getPageList } from '@/api/page.ts'
import mixin from '@/utils/mixin'
@Component({
    mixins: [mixin],
    components: {
        Page: () => import('./Page.vue')
    }
})
export default class pageListComponent extends Vue {
    @Prop(Object) query!: any;
    @Prop({ default: '/api/page/pagelist' }) api!: string;
    page: number = 1;
    pageSize: number = 5;
    total: number = 0;
    pullLoading: boolean = false;
    listLoading: boolean = false;
    listFinished: boolean = true;
    list: object[] = [];
    mounted () {
        this.pullLoading = true;
        let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query);
        getPageList(queryObject, this.api).then(res => {
            const { total, result } = res.data;
            this.list = result;
            this.total = total;
            this.pullLoading = false;
            if (this.total <= this.pageSize * this.page) {
                this.listFinished = true;
            } else {
                this.listFinished = false;
            }
        })
    }
    @Watch('list', { deep: true })
    pageChange (val: object[], oldVal: object[]) {
        this.change(val);
    }
    @Emit()
    change (val: object[]) {
        return val;
    }
    onRefresh () {
        this.page = 1;
        let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query);
        getPageList(queryObject, this.api).then(res => {
            const { total, result } = res.data;
            this.pullLoading = false;
            this.list = result;
            this.total = total;
            if (this.total <= this.pageSize * this.page) {
                this.listFinished = true;
            } else {
                this.listFinished = false;
            }
        })
    }
    onLoad () {
        this.page = this.page + 1;
        let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query);
        getPageList(queryObject, this.api).then(res => {
            const { result } = res.data;
            this.listLoading = false;
            this.list.push(...result);
            if (this.page * this.pageSize >= this.total) this.listFinished =true;
        })
    }
}
</script>
 