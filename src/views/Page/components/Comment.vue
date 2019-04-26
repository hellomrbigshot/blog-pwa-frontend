<template>
    <div class="comment" :id="comment._id">
        <router-link :to="{ name: 'userInfo', params: { username: encodeURIComponent(comment.create_user) }}">
            <div class="comment-info">
                <img class="comment-avatar" :src='imgUrl' alt="" @error="imgError">
                <span class="comment-author">{{ comment.create_user }}</span>
            </div>
        </router-link>
        <div class="comment-reply" v-if="comment.reply_user">
          <router-link class="comment-author" :to="{ name: 'userInfo', params: { username: encodeURIComponent(comment.reply_user) }}">{{ comment.reply_user }}</router-link>：{{ comment.reply_content }}
        </div>
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-time">
          <span>{{ formatTime(comment.create_time, '3') }}</span>
          <van-icon v-if="isLogin" @click="setCommentToUser" style="float: right;" slot="content" name="chat" size="16px"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import mixin from '@/utils/mixin'
@Component({
    mixins: [mixin]
})
export default class PageComment extends Vue {
    @Prop(Object) comment!: any
    defaultImg: string = require('@/assets/img/avatar.jpg')
    imgUrl: string = `/api/file/avatar/user?username=${this.comment.create_user}`
    get isLogin (): boolean {
      return Boolean(this.Cookies.get('user'))
    }
    imgError() {
        this.imgUrl = this.defaultImg
    }
    setCommentToUser() {
        this.$bus.$emit('toComment', this.comment)
    }
 }
</script>
<style lang="scss" scoped>
.comment {
    padding: 0px 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    .comment-info {
        padding: 10px 0 0;
        overflow: auto;
        .comment-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            float: left;
        }
        .comment-author {
            line-height: 20px;
            font-size: 14px;
            float: left;
            margin-left: 5px;
            color: #07c160;
        }
    }
    .comment-reply {
      margin-left: 35px;
      padding: 5px 10px;
      background: #f8f8f8;
      margin-bottom: 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #555;
      .comment-author {
        color: #07c160;
      }
    }
    .comment-content {
        padding: 0 0 5px 35px;
        font-size: 14px;
        color: #555;
    }
    .comment-time {
        padding-left: 35px;
        font-size: 13px;
        color: #ddd;
    }
}
</style>


