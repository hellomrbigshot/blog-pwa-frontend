<template>
    <router-link :to="{ name: 'pageDetail', params: { id: page._id } }">
        <div class="page">
            <div class="page-tag">来自标签 
                <router-link v-for="(tag, i) in page.tags" :key="i" :to="{ name: 'tagDetail', params: { name: tag }}">
                    <span>{{ tag }}</span><span v-if="i!==page.tags.length-1">，</span>
                </router-link>
            </div>
            <div class="page-head">
                <h4>{{ page.title }}
                    <van-tag v-if="page.status==='draft'">草稿</van-tag>
                    <van-tag v-else-if="page.secret" type="danger">私密</van-tag>
                </h4>
            </div>
            <div class="page-content">
                {{ marked(page.content).replace(/<[^>]+>/g, '') }}
            </div>
            <div class="page-bottom">
                <router-link class="create-user" :to="{ name: 'userInfo', params: { username: encodeURIComponent(page.create_user) }}">{{ page.create_user }}</router-link>
                <span class="dot">·</span>
                <span class="create-time">{{ formatTime(page.update_time, '3') }}</span>
                <template v-if="page.update_time !== page.create_time">
                    <span class="dot">·</span>
                    <span class="create-time">更新</span>
                </template>
            </div>
        </div>
    </router-link>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import mixin from '@/utils/mixin.ts'
@Component({
    mixins: [mixin]
})
export default class Page extends Vue {
    @Prop() page: any
}
</script>
<style lang="scss" scoped>
.page {
    margin-top: 15px;
    padding: 10px 15px;
    color: #9E9E9E;
    background: #fff;
    .page-tag, .page-content {
        font-size: 14px;
        color: #9E9E9E;
        a {
            color: #9E9E9E;
        }
    }
    .page-head {
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
    }
    .page-bottom {
        margin-bottom: 5px;
        .create-user {
            color: #07c160;
            font-size: 13px;
        }
        .dot {
            padding: 0 5px;
        }
        .create-time {
            font-size: 13px;
        }
    }
}
</style>


