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
import { getPageList } from '@/api/page'
import mixin from '@/utils/mixin'
import { IPage } from '@/types/index'
import PageListItem from './PageListItem.vue'

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
export default class PageListComponent extends Vue {
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
  
  // 使用计算属性优化查询对象生成
  get queryObject() {
    return { pageSize: this.pageSize, page: this.page, ...this.query }
  }
  
  async mounted() {
    try {
      this.pullLoading = true
      const { data: { total, result } } = await getPageList(this.queryObject, this.api)
      this.list = result || []
      this.total = total || 0
      this.change(total)
      this.updateListStatus()
    } catch (error) {
      console.error('Failed to load page list:', error)
      this.list = []
      this.total = 0
    } finally {
      this.pullLoading = false
      this.showSkeleton = false
    }
  }
  
  @Emit()
  change(total: number) {
    return total
  }
  
  /**
   * 更新列表加载状态
   */
  private updateListStatus() {
    this.listFinished = this.total <= this.pageSize * this.page
  }
  
  onRefresh() {
    this.page = 1
    this.pullLoading = true
    getPageList(this.queryObject, this.api)
      .then(res => {
        const { total, result } = res.data
        this.list = result || []
        this.total = total || 0
        this.updateListStatus()
      })
      .catch(error => {
        console.error('Failed to refresh:', error)
        this.list = []
        this.total = 0
      })
      .finally(() => {
        this.pullLoading = false
      })
  }
  
  async onLoad(page: number) {
    try {
      this.page = page
      const { data: { total, result } } = await getPageList(this.queryObject, this.api)
      this.total = total || 0
      
      if (this.page === 1) {
        this.list = result || []
        this.pullLoading = false
      } else {
        this.list = this.list.concat(result || [])
      }
      
      this.updateListStatus()
    } catch (error) {
      console.error('Failed to load more:', error)
      // 加载失败时保持原列表，允许重试
    }
  }
}
</script>
 