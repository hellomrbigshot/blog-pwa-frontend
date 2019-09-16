<template>
  <div>
    <van-skeleton title :row="5" :loading="showSkeleton">
      <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="min-height: calc(100vh - 140px); box-sizing: border-box;">
        <van-list v-model="listLoading" :finished="listFinished" @load="onLoad" :immediate-check="false">
          <div v-if="list.length">
            <page-list-item v-for="(detail, index) in list" :key="index" :page="detail"/>
          </div>
          <div v-else class="empty-content">暂时没有内容=。=</div>
        </van-list>
      </van-pull-refresh>
    </van-skeleton>
    <van-skeleton style="margin-top: 12px;" title :row="5" :loading="showSkeleton" />
    <van-skeleton style="margin-top: 12px;" title :row="5" :loading="showSkeleton" />
    <van-skeleton style="margin-top: 12px;" title :row="5" :loading="showSkeleton" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { getPageList } from '@/api/page.ts'
import mixin from '@/utils/mixin'
import PageListItem from './PageListItem.vue' // 异步引入会出现一段白屏

@Component({
  mixins: [mixin],
  components: {
    // Page: () => import('./Page.vue')
    PageListItem
  }
})
export default class pageListComponent extends Vue {
  @Prop(Object) query!: any
  @Prop({ default: '/api/page/pagelist' }) api!: string
  page: number = 1
  pageSize: number = 5
  total: number = 0
  pullLoading: boolean = false
  listLoading: boolean = false
  listFinished: boolean = true
  showSkeleton: boolean = true
  list: object[] = []
  async mounted() {
    this.pullLoading = true
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    let res = await getPageList(queryObject, this.api)
    const { total, result } = res.data
    this.list = result
    this.total = total
    this.change(total)
    this.pullLoading = false
    if (this.total <= this.pageSize * this.page) {
      this.listFinished = true
    } else {
      this.listFinished = false
    }
    this.showSkeleton = false
  }
  @Emit()
  change(total: number) {
    return total
  }
  onRefresh() {
    this.page = 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getPageList(queryObject, this.api).then(res => {
      const { total, result } = res.data
      this.pullLoading = false
      this.list = result
      this.total = total
      if (this.total <= this.pageSize * this.page) {
        this.listFinished = true
      } else {
        this.listFinished = false
      }
    })
  }
  onLoad() {
    this.page = this.page + 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getPageList(queryObject, this.api).then(res => {
      const { result } = res.data
      this.listLoading = false
      this.list.push(...result)
      if (this.page * this.pageSize >= this.total) this.listFinished = true
    })
  }
}
</script>
 