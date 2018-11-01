<template>
    <div class="comment-main">
        <div class="comment-header">
            <div class="avatar inline-block">
                <img :src="imgUrl" class="inline-block" alt="" @error="imgError">
            </div>
            <div class="comment-user-info">
                <div class="comment-user-name">{{ comment.create_user }}</div>
                <div class="comment-user-action">
                    <span v-if="type==='create_user'">发表了评论</span>
                    <span v-else-if="type==='to_user'">评论了我</span>
                    <span style="margin-left: 10px;">{{ formatTime(comment.create_time, '3') }}</span>
                </div>
            </div>
        </div>
        <div class="comment">
            <router-link :to="`/pages/detail/${comment.page_id}#${comment._id}`">
                <div class="comment-header">{{ comment.content }}</div>
                <div class="comment-content">{{ comment.page_title }}</div>
            </router-link>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import mixin from '@/utils/mixin'
@Component({
    mixins: [mixin]
})
export default class Comment extends Vue {
    @Prop() comment: any
    @Prop() type: string
    imgUrl: string = require('../../assets/img/avatar.jpg')
    defaultImg: string = require('../../assets/img/avatar.jpg')
    mounted () {
        this.imgUrl = `/api/file/avatar/user?username=${this.comment.create_user}`;
    }
    imgError () {
        this.imgUrl = this.defaultImg;
    }
}
</script>
<style lang="scss" scoped>
.comment-main {
    padding: 10px 10px;
    margin-top: 15px;
    background: #fff;
    .comment-header {
        overflow: hidden;
        .avatar {
            width: 40px;
            height: 40px;
            float: left;
            img {
                border-radius: 50%;
            }
        }
        .comment-user-info {
            float: left;
            margin-left: 10px;
            .comment-user-name {
                font-size: 16px;
            }
            .comment-user-action {
                font-size: 12px;
                color: #cdcdcd;
                margin-top: 2px;
            }
        }

    }
    .page {
        .page-header {
            margin: 5px 0;
        }
        .page-content {
            margin-bottom: 15px;
            color: #888;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 1.5;
            word-break: break-all;
            overflow: hidden;
            font-size: 14px;
        }
    }
    .comment {
        .comment-header {
            padding: 5px 0;
            color: #333;
        }
        .comment-content {
            padding: 10px 0 5px 20px;
            box-shadow: 0 1px 2px 1px #ddd;
            color: #0066CC;
            font-size: 18px;
        }
    }
    
}

</style>

