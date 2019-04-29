<template>
    <div class="activity-main">
        <div class="activity-header">
            <div class="avatar inline-block">
                <img :src="imgUrl" class="inline-block" alt="" @error="imgError">
            </div>
            <div class="activity-user-info">
                <div class="activity-user-name">{{ activity.create_user }}</div>
                <div class="activity-user-action">
                    <span v-if="activity.type==='comment'">发表了评论</span>
                    <span v-else-if="activity.type==='page'">{{ activity.content.create_time === activity.content.update_time && '发布了文章' || '更新了文章' }}</span>
                    <span style="margin-left: 10px;">{{ formatTime(activity.update_time, '3') }}</span>
                </div>
            </div>
        </div>
        <template>
            <div class="page" v-if="activity.type==='page'">
                <router-link :to="{ name: 'pageDetail', params: { id: activity.content._id } }">
                    <div class="page-header">
                        <h4>{{ activity.content.title }}</h4>
                    </div>
                    <div class="page-content">{{ marked(activity.content.content).replace(/<[^>]+>/g, '') }}</div>
                </router-link>
            </div>
            <div class="comment" v-else-if="activity.type==='comment'">
                <router-link :to="`/pages/detail/${activity.content.page_id}#${activity.content._id}`">
                    <div class="comment-header">{{ activity.content.content }}</div>
                    <div class="comment-content">{{ activity.content.page_title }}</div>
                </router-link>
            </div>
        </template>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import mixin from '@/utils/mixin'
@Component({
    mixins: [mixin]
})
export default class Activity extends Vue {
    @Prop() activity: any
    imgUrl: string = require('../../assets/img/avatar.jpg')
    defaultImg: string = require('../../assets/img/avatar.jpg')
    mounted () {
        this.imgUrl = `/api/file/avatar/user?username=${this.activity.create_user}`
    }
    @Watch('activity', { deep: true })
    onActivityChange (newVal: any, oldVal: any) {
        this.imgUrl = `/api/file/avatar/user?username=${this.activity.create_user}`
    }
    imgError () {
        this.imgUrl = this.defaultImg
    }
}
</script>
<style lang="scss" scoped>
.activity-main {
    padding: 10px 10px;
    margin-top: 15px;
    background: #fff;
    .activity-header {
        overflow: hidden;
        .avatar {
            width: 40px;
            height: 40px;
            float: left;
            img {
                border-radius: 50%;
            }
        }
        .activity-user-info {
            float: left;
            margin-left: 10px;
            .activity-user-name {
                font-size: 16px;
            }
            .activity-user-action {
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

