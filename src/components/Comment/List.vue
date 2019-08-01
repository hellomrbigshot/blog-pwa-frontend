<template>
  <div>
    <van-skeleton title avatar :row="4" :loading="showSkeleton">
      <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="min-height: calc(100vh - 140px); box-sizing: border-box;">
        <van-list v-model="listLoading" :finished="listFinished" @load="onLoad" :immediate-check="false">
          <div v-if="list.length">
            <Comment v-for="(item, i) in list" :comment="item" :key="i" :type="query.type"></Comment>
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
import { getCommentList, updateCommentStatus, getUnReadCommentNum } from '@/api/comment.ts'
import mixin from '@/utils/mixin'
import { getActivityList } from '@/api/activity'
@Component({
  mixins: [mixin],
  components: {
    Comment: () => import('./Comment.vue')
  }
})
export default class commentList extends Vue {
  @Prop(Object) query!: any
  page: number = 1
  pageSize: number = 5
  total: number = 0
  pullLoading: boolean = false
  listLoading: boolean = false
  listFinished: boolean = true
  showSkeleton: boolean = true
  list: object[] = []
  mounted() {
    this.pullLoading = true
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getCommentList(queryObject).then(res => {
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
      this.changeCommentStatus(result)
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
  onRefresh() {
    this.page = 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getCommentList(queryObject).then(res => {
      const { total, result } = res.data
      this.pullLoading = false
      this.list = result
      this.total = total
      if (this.total <= this.pageSize * this.page) {
        this.listFinished = true
      } else {
        this.listFinished = false
      }
      this.changeCommentStatus(result)
    })
  }
  onLoad() {
    this.page = this.page + 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    getCommentList(queryObject).then(res => {
      const { result } = res.data
      this.listLoading = false
      this.list.push(...result)
      if (this.page * this.pageSize >= this.total) this.listFinished = true
      this.changeCommentStatus(result)
    })
  }
  async changeCommentStatus(list: any[]) { // 将获取到的评论标记为已读
    if (this.query.type !== 'to_user') return
    const ids = list.reduce((arr: any[], item: any) => {
      if (!item.is_read) {
        arr.push(item._id)
      }
      return arr
    }, [])
    if (ids.length) {
      await updateCommentStatus(ids).then(res => { // 修改评论状态
        this.list.forEach((item: any) => {
          if (ids.includes(item._id)) {
            item.is_read = true
          }
        })
      })
      await getUnReadCommentNum().then(res => { // 获取未读评论数量
        const { result } = res.data
        this.$store.commit('changeMsgNum', result)
      })
    }
  }
}
</script>
