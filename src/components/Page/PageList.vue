<template>
  <div>
    <van-pull-refresh
      v-if="!showSkeleton"
      v-model="pullLoading"
      style="min-height: calc(100vh - 140px); box-sizing: border-box;"
      @refresh="onLoad(1)"
    >
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        :immediate-check="false"
        @load="onLoad(page + 1)"
      >
        <div v-if="list.length">
          <PageListItem
            v-for="detail in list"
            :key="detail._id"
            :page="detail"
          />
        </div>
        <div v-else class="empty-content">暂时没有内容=。=</div>
      </van-list>
    </van-pull-refresh>
    <template v-else>
      <PageListItemSkeleton v-for="i in 3" :key="i" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { getPageList } from '@/api/page.ts'
import mixin from '@/utils/mixin'
import { IPage } from '@/types/index'
import PageListItem from './PageListItem.vue' // 异步引入会出现一段白屏
interface IQuery {
  status: string,
  type: string,
  content: string,
  secret: boolean,
  sort?: string,
  keywords?: string
}
@Component({
  name: 'PageListComponent',
  mixins: [mixin],
  components: {
    PageListItem,
    PageListItemSkeleton: () => import('./PageListItemSkeleton.vue')
  }
})
export default class pageListComponent extends Vue {
  @Prop(Object) query!: IQuery
  @Prop({ default: '/api/page/pagelist' }) api!: string
  page: number = 1
  pageSize: number = 5
  total: number = 0
  skeletonNum: number = 3
  pullLoading: boolean = false
  listLoading: boolean = false
  listFinished: boolean = true
  showSkeleton: boolean = true
  list: IPage[] = []
  async mounted() {
    this.pullLoading = true
    const queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    const { data: { total, result } } = await getPageList(queryObject, this.api)
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
  getPageList (page = 1) {
    this.page = page
  }
  onRefresh () {
    this.page = 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getPageList(queryObject, this.api).then(res => {
      const { total, result } = res.data
      this.pullLoading = false
      this.list = result
      this.total = total - 0
      if (this.total <= this.pageSize * this.page) {
        this.listFinished = true
      } else {
        this.listFinished = false
      }
    })
  }
  async onLoad (page) {
    this.page = page
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    const { data: { total, result } } = await getPageList(queryObject, this.api)
    this.total = total - 0
    if (this.page === 1) {
      this.pullLoading = false
      this.list = result
    } else {
      this.list = this.list.concat(result)
    }
    if (this.total <= this.pageSize * this.page) {
      this.listFinished = true
    } else {
      this.listFinished = false
    }
  }
}
</script>
 