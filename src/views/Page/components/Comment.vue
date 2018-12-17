<template>
    <div class="comment">
        <router-link :to="{ name: 'userInfo', params: { username: encodeURIComponent(comment.create_user) }}">
            <div class="comment-info">
                <img class="comment-avatar" :src='imgUrl' alt="" @error="imgError">
                <span class="comment-author">{{ comment.create_user }}</span>
            </div>
        </router-link>
        
        <div class="comment-content">{{ comment.content }}</div>
        <div class="comment-time">{{ formatTime(comment.create_time, '3') }}</div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import mixin from '@/utils/mixin'
@Component({
    mixins: [mixin]
})
export default class Comments extends Vue {
    @Prop(Object) comment!: any
    defaultImg: string = require('@/assets/img/avatar.jpg')
    imgUrl: string = `/api/file/avatar/user?username=${this.comment.create_user}`
    imgError () {
        this.imgUrl = this.defaultImg;
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
            color: #28a946;
        }
    }
    .comment-content {
        padding: 0 0 5px 35px;
        font-size: 14px;
        color: #555;
    }
    .comment-time {
        padding-left: 35px;
        font-size: 12px;
        color: #ddd;
    }
}
</style>


