<template>
  <div ref="pageDetail" @scroll="detailScroll">
    <van-skeleton title :row="20" :loading="showSkeleton">
      <main
        v-if="detail.content"
        ref="scrollBody"
        class="container main-container"
        style="margin: 10px 0 10px; background: #fff;"
      >
        <div class="page-detail">
          <div>
            <h1>{{ detail.title }}</h1>
          </div>
          <router-link :to="{ name: 'userInfo', params: { username: encodeURIComponent(detail.create_user) }}">
            <div class="auto-info">
              <a class="auto-avatar inline-block">
                <img :src="imgUrl" alt="头像" class="inline-block" ref="img" @error="imgError">
              </a>
              <div class="auto-info-text">
                <div class="auto-name">{{ detail.create_user }}</div>
                <div class="auto-create-time">{{ formatTime(detail.create_time, '3') }}发布</div>
              </div>
            </div>
          </router-link>
          <div class="page-content m-editor-preview" v-html="marked(detail.content)"></div>
        </div>
        <div style="margin: 30px 0 10px;">
          <van-tag size="large" plain v-for="(tag, i) in detail.tags" :key="i" @click.native="$router.push({ name: 'tagDetail', params: { name: tag }})" style="margin-right: 5px;">{{ tag }}</van-tag>
        </div>
      </main>
      <div style="margin-bottom: 40px;" class="comment-wrapper" id="comments">
        <div class="comment-header">评论({{ comments.length }})</div>
        <div class="comment-list" v-if="comments.length">
          <comment-list-item v-for="(comment, index) in comments" :comment="comment" :key="index"></comment-list-item>
        </div>
        <div class="comment-empty" v-else>暂时还没有评论(#^.^#)</div>
      </div>
      <comment-setter :detail="detail" :comments="comments" @update="getCommentList"></comment-setter>
    </van-skeleton>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getPageDetail, getCommentListByPageId } from '@/api/page'
import mixin from '@/utils/mixin.ts'
import { setTimeout } from 'timers'
@Component({
  mixins: [mixin],
  components: {
    CommentSetter: () => import('./components/CommentSetter.vue'),
    CommentListItem: () => import('./components/CommentListItem.vue')
  }
})
export default class pageDetail extends Vue {
  detail: any = {}
  title: string = '世说新语'
  box: any = {}
  comments: object[] = []
  imgUrl: string = require('../../assets/img/avatar.jpg')
  defaultImg: string = require('../../assets/img/avatar.jpg')
  showContent: boolean = false
  showSkeleton: boolean = true
  get id(): string {
    return this.$route.params.id
  }
  async mounted() {
    await this.getPageDetail()
    this.showSkeleton = false
    setTimeout(() => {
      let hash = this.$route.params.hash
      if (hash) {
        const hashDom = document.getElementById(hash) as Element
        if (hashDom) {
          hashDom.scrollIntoView()
        }
      }
    }, 500)
  }
  activated() {
    if (this.id !== this.detail._id && this.detail._id) { // 更新详情内容
      this.getPageDetail()
    }
  }
  imgError() {
    this.imgUrl = this.defaultImg
  }
  getCommentList() {
    getCommentListByPageId(this.id).then(res => {
      this.comments = res.data
    })
  }
  getPageDetail() {
    return Promise.all([getPageDetail(this.id).then(res => {
      this.detail = res.data
      this.imgUrl = `/api/file/avatar/user?username=${this.detail.create_user}`
    }),
    this.getCommentList()])
  }
  detailScroll(e: any) {
    const detailPage = this.$refs['detailPage'] as HTMLElement
  }
}
</script>
<style lang="scss" scoped>
.auto-info {
  margin-top: 10px;
  display: flex;
  .auto-avatar {
    padding-right: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .auto-info-text {
    .auto-name {
      font-size: 15px;
      font-weight: 700;
      color: #07c160;
    }
    .auto-create-time {
      font-size: 13px;
      color: #909090;
      margin-top: 2px;
    }
  }
}
.page-content {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  min-height: calc(100vh - 500px);
}
.comment-wrapper {
  background: #fff;
  .comment-header {
    color: #555;
    font-size: 14px;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
  }
  .comment-empty {
    font-size: 14px;
    color: #ddd;
    padding: 40px 100px;
    text-align: center;
  }
}
</style>

