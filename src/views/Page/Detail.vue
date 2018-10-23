<template>
    <div>
        <main class="container main-container" style="margin: 50px 0 0;" v-if="detail.content" ref="scrollBody">
            <div class="page-detail">
                <div>
                    <h1>{{ detail.title }}</h1>
                </div>
                <div class="auto-info">
                    <a class="auto-avatar inline-block">
                        <img :src="imgUrl" alt="头像" class="inline-block" ref="img" @error="imgError">
                    </a>
                    <div class="auto-info-text">
                        <div class="auto-name">{{ detail.create_user }}</div>
                        <div class="auto-create-time">{{ formatTime(detail.create_date, '3') }}发布</div>
                    </div>
                </div>
                <div class="page-content" v-html="marked(detail.content)" ></div>
            </div>
            <div style="margin: 50px 0 10px;">
                <van-tag plain v-for="tag, i in detail.tags" @click.native="$router.push({ name: 'tagDetail', params: { name: tag }})" style="margin-right: 5px;">{{ tag }}</van-tag>
            </div>
        </main>
        <div style="margin-bottom: 40px;" class="comment-wrapper" id="comments">
            <div class="comment-header">评论({{ comments.length }})</div>
            <div class="comment-list" v-if="comments.length">
                <Comment v-for="comment, index in comments" :comment="comment" :key="index"></Comment>
            </div>
            <div class="comment-empty" v-else>暂时还没有评论(#^.^#)</div>
        </div>
        <set-comment :detail="detail" :comments="comments" @update="getCommentList"></set-comment>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getPageDetail, getCommentListByPageId } from '@/api/page'
import mixin from '@/utils/mixin.ts'
import { setTimeout } from 'timers';
@Component({
    mixins: [mixin],
    components: {
        setComment: () => import('./components/setComment.vue'),
        Comment: () => import('./components/Comment.vue')
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
    get id (): string {
        return this.$route.params.id;
    }
    mounted() {
        getPageDetail(this.id).then(res => {
            this.detail = res.data;
            this.imgUrl = `/api/file/avatar/user?username=${this.detail.create_user}`;
            setTimeout(() => {
                this.hljsCode();
            }, 500);  
        });
        this.getCommentList();
    }
    imgError () {
        this.imgUrl = this.defaultImg
    }
    getCommentList () {
        getCommentListByPageId(this.id).then(res => {
            this.comments = res.data;
        })
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
    }
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
</style>

