<template>
  <div>
    <van-pull-refresh
      v-if="!showSkeleton"
      v-model="pullLoading"
      class="pull-wrapper"
      @refresh="onRefresh"
    >
      <van-list v-model="listLoading" :finished="listFinished" @load="onLoad" :immediate-check="false">
        <div v-if="list.length">
          <Comment v-for="(item, i) in list" :key="i" :comment="item" :type="query.type"/>
        </div>
        <div v-else class="empty-content">暂时没有内容=。=</div>
      </van-list>
    </van-pull-refresh>
    <template v-else>
      <CommentSkeleton v-for="item in 5" :key="item"/>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { getCommentList, updateCommentStatus, getUnReadCommentNum } from '@/api/comment.ts'
import mixin from '@/utils/mixin'
import { getActivityList } from '@/api/activity'
import { IComment } from './index'
interface IQuery {
  create_user: string,
  to_user: string,
  type: string
}
@Component({
  name: 'CommentList',
  mixins: [mixin],
  components: {
    Comment: () => import('./CommentListItem.vue'),
    CommentSkeleton: () => import('./CommentListItemSkeleton.vue')
  }
})
export default class commentList extends Vue {
  @Prop(Object) query!: IQuery
  page: number = 1
  pageSize: number = 5
  total: number = 0
  pullLoading: boolean = false
  listLoading: boolean = false
  listFinished: boolean = true
  showSkeleton: boolean = true
  list: IComment[] = []
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
  async onRefresh() {
    this.page = 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    const { data: { total, result } } = await getCommentList(queryObject)
    this.pullLoading = false
    this.list = result
    this.total = total
    if (this.total <= this.pageSize * this.page) {
      this.listFinished = true
    } else {
      this.listFinished = false
    }
    this.changeCommentStatus(result)
  }
  async onLoad() {
    this.page = this.page + 1
    let queryObject = Object.assign({ pageSize: this.pageSize, page: this.page }, this.query)
    const { data: { result } } = await getCommentList(queryObject)
    this.listLoading = false
    this.list.push(...result)
    if (this.page * this.pageSize >= this.total) this.listFinished = true
    this.changeCommentStatus(result)
  }
  async changeCommentStatus(list: IComment[]) { // 将获取到的评论标记为已读
    if (this.query.type !== 'to_user') return
    const ids = list.reduce((arr: string[], item: IComment) => {
      if (!item.is_read) {
        arr.push(item._id)
      }
      return arr
    }, [])
    if (ids.length) {
      await updateCommentStatus(ids) // 修改评论状态
      this.list.forEach((item: IComment) => {
        if (ids.includes(item._id)) {
          item.is_read = true
        }
      })
      const {data: { result } } = await getUnReadCommentNum() // 获取未读评论数量
      this.$store.commit('changeMsgNum', result)
    }
  }
}
</script>
<style lang="scss" scoped>
 .pull-wrapper {
   min-height: calc(100vh - 140px);
   box-sizing: border-box;
 }
</style>
