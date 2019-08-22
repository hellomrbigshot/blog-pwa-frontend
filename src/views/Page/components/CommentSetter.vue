<template>
  <div>
    <div class="fix-bottom set-comment" style="line-height: 30px;" v-show="!showCommentInput">
      <van-row>
        <van-col span="20" @click.native="toggleCommentInput(true)">
          <div class="overflow: auto;">
            <van-icon name="edit" size="18px" class="van-icon" />
            <span style="margin-left: 6px;">写回复</span>
          </div>
        </van-col>
        <van-col span="2">&nbsp;</van-col>
        <van-col span="2">
          <a @click="scrollToComment" style="color: #909090;">
            <Badge :info="comments.length">
              <van-icon slot="content" name="chat" size="18px" />
            </Badge>
          </a>
        </van-col>
      </van-row>
    </div>
    <div class="fix-shadow" v-show="showCommentInput" @click.prevent="showCommentInput=false;">
      <div class="fix-bottom set-comment create-comment" @click.stop="">
        <div style="overflow: auto;">
          <span style="float: left; margin-left: 15px; line-height: 30px; color: #000;">回复</span>
          <van-icon name="passed" size="18px" :class="['comment-icon', comment.trim().length?'active-icon':'']" style="float: right;" @click="setComment"></van-icon>
        </div>
        <div class="comment-input">
          <van-field ref="commentInput" v-model="comment" type="textarea" :autosize="{ maxHeight: 100, minHeight: 100 }" :placeholder="`回复${toComment.create_user || detail.create_user}`" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { sendComment, getCommentListByPageId } from '@/api/page'
import { setTimeout } from 'timers'
@Component({
  components: {
    Badge: () => import('@/components/Badge.vue')
  }
})
export default class setComment extends Vue {
  @Prop(Object) detail!: any
  @Prop(Array) comments!: object[]
  showCommentInput: boolean = false
  comment: string = ''
  toComment: any = {}
  mounted() {
    this.$bus.$on('toComment', (comment: object) => {
      this.toComment = comment
      this.toggleCommentInput(false)
    })
  }
  toggleCommentInput(clearToComment: boolean) {
    if (clearToComment) {
      this.toComment = {}
    }
    this.showCommentInput = true
    setTimeout(() => {
      let commentInput = this.$refs['commentInput'] as HTMLElement
      commentInput.focus()
    }, 0)
  }
  scrollToComment() {
    const comment = document.getElementById('comments') as HTMLElement
    comment.scrollIntoView()
  }
  setComment() {
    if (!this.Cookies.get('user')) {
      this.$router.replace({
        name: 'login',
        query: {
          redirect: this.$route.fullPath
        }
      })
      return false
    }
    if (!this.comment.trim()) {
      this.$toast('请输入评论')
      return false
    }
    const commentObject = {
      create_user: this.Cookies.get('user'),
      to_user: this.detail.create_user,
      page_id: this.detail._id,
      page_title: this.detail.title,
      content: this.comment,
      reply_user: this.toComment.create_user || '',
      reply_content: this.toComment.content || ''
    }
    sendComment(commentObject).then((res: object) => {
      this.$toast('评论发送成功')
      this.$emit('update')
      this.comment = ''
      this.showCommentInput = false
    })
  }
}
</script>
<style lang="scss" scoped>
.set-comment {
  box-shadow: 0 5px 5px 7px #ddd;
  background: #fff;
  font-size: 14px;
  padding: 5px 10px;
  color: #909090;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.fix-shadow {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(244, 244, 244, 0.5);
}

.comment-input /deep/ .van-cell {
  font-size: 13px;
}

.van-icon {
  padding: 6px;
}
.active-icon {
  color: #07c160;
}
</style>


