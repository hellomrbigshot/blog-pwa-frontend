<template>
  <div>
    <van-skeleton title avatar :row="4" :loading="showSkeleton">
      <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="min-height: 50vh">
        <van-list v-model="listLoading" :finished="listFinished" @load="onLoad">
          <div v-if="list.length">
            <Activity v-for="(item, i) in list" :activity="item" :key="i"></Activity>
          </div>
          <div v-else class="empty-content">暂时没有内容=。=</div>
        </van-list>
      </van-pull-refresh>
    </van-skeleton>
    <van-skeleton style="margin-top: 12px;" title avatar :row="4" :loading="showSkeleton" />
    <van-skeleton style="margin-top: 12px;" title avatar :row="4" :loading="showSkeleton" />
    <van-skeleton style="margin-top: 12px;" title avatar :row="4" :loading="showSkeleton" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { getActivityList, getActivityNum } from '@/api/activity.ts'
import mixin from '@/utils/mixin'
// import Activity from './ActivityListItem.vue' // 异步加载组件会出现白屏


@Component({
  mixins: [mixin],
  components: {
    Activity: () => import('./ActivityListItem.vue')
    // Activity
  }
})
export default class activityList extends Vue {
  @Prop(Object) query!: any
  page: number = 1
  pageSize: number = 5
  total: number = 0
  pullLoading: boolean = false
  listLoading: boolean = false
  listFinished: boolean = true
  showSkeleton: boolean = true
  active: boolean = false
  list: object[] = []
  mounted() {
    this.pullLoading = true
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getActivityList(queryObject).then(res => {
      const { total, result } = res.data
      this.list = result
      this.total = total
      this.pullLoading = false
      if (this.total <= this.pageSize * this.page) {
        this.listFinished = true
      } else {
        this.listFinished = false
      }
      this.showSkeleton = false
    })
  }
  @Watch('list', { deep: true })
  pageChange(val: object[], oldVal: object[]) {
    this.change(val)
  }
  @Emit()
  change(val: object[]) {
    return val
  }
  @Watch('query.create_user')
  onQueryChange() {
    this.onRefresh()
  }
  onRefresh() {
    this.page = 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getActivityList(queryObject).then(res => {
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
    getActivityList(queryObject).then(res => {
      const { result } = res.data
      this.listLoading = false
      this.list.push(...result)
      if (this.page * this.pageSize >= this.total) this.listFinished = true
    })
  }
}
</script>

