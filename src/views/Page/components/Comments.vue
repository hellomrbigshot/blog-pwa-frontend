<template>
    <div style="margin-bottom: 50px;">
        <div class="comment-header">评论({{ comments.length }})</div>
        <div class="comments">
            <div class="comment" v-for="comment, index in comments">
                <div class="comment-info">
                    <img class="comment-avatar" :src='`/api/file/avatar/user?username=${comment.create_user}`' alt="">
                    <span class="comment-author">{{ comment.create_user }}</span>
                </div>
                <div class="comment-content">{{ comment.content }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class Comments extends Vue {
    @Prop(Array) comments!: object[]
    defaultImg: string = require('@/assets/img/avatar.jpg')
 }
</script>
<style lang="scss" scoped>
.comment-header {
    color: #555;
    font-size: 14px;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
}
.comments {
    .comment {
        padding: 0px 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        .comment-info {
            padding: 10px 0;
            overflow: auto;
            .comment-avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                float: left;
            }
            .comment-author {
                line-height: 30px;
                font-size: 13px;
                float: left;
                margin-left: 5px;
                color: #28a946;
            }
        }
        .comment-content {
            padding-left: 35px;
            font-size: 14px;
            color: #555;
        }
    }
}
</style>


