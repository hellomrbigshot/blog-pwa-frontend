<template>
    <div>
        <div class="fix-bottom set-comment" style="line-height: 30px;" v-show="!createComment">
            <van-row>
                <van-col span="8" @click.native="createComment=true">
                    <div class="overflow: auto;">
                        <van-icon name="edit" size="16px" />
                        <span style="margin-left: 6px;">写回复</span>
                    </div>
                </van-col>
                <van-col span="12">&nbsp;</van-col>
                <van-col span="4">
                    <a href="#comments" style="color: #909090;">
                        <Badge :info="comments.length">
                            <van-icon slot="content" name="chat" size="16px" />
                        </Badge>
                    </a>
                    
                </van-col>
            </van-row>
        </div>
        <div class="fix-shadow" v-show="createComment" @click.prevent="createComment=false;">
            <div class="fix-bottom set-comment create-comment" @click.stop="">
                <div>
                    <van-field v-model="comment" type="textarea" :autosize="{ maxHeight: 100, minHeight: 30 }" placeholder="回复" />
                </div>
                <div style="overflow: auto;">
                    <van-icon name="success" size="14px" style="margin: 10px 20px 10px 0; float: right;" @click="setComment"></van-icon>
                </div>
                
            </div>
        </div>
        
    </div>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { sendComment, getCommentListByPageId } from '@/api/page'
@Component({
    components: {
        Badge: () => import('@/components/Badge.vue')
    }
})
export default class setComment extends Vue {
    @Prop(Object) detail!: any
    @Prop(Array) comments!: object[]
    createComment: boolean = false
    comment: string = ''
    setComment () {
        if (!this.Cookies.get('user')) {
            this.$router.replace({
                name: 'login',
                query: {
                    redirect: this.$route.fullPath
                }
            })
            return false;
        }
        if (!this.comment.trim()) {
            this.$toast('请输入评论');
            return false;
        }
        const commentObject = {
            create_user: this.Cookies.get('user'),
            to_user: this.detail.create_user,
            page_id: this.detail._id,
            page_title: this.detail.title,
            content: this.comment
        }
        sendComment(commentObject).then((res: object) => {
            this.$toast('评论发送成功');
            this.$emit('update');
            this.comment = '';
            this.createComment = false;
        })

    }
}
</script>
<style lang="scss" scoped>
.set-comment {
    box-shadow: 0 5px 5px 7px #ddd;
    background: #fff;
    font-size: 13px;
    padding: 5px 10px;
    color: #909090;
}
.fix-shadow {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(244, 244, 244, 0.5);
}
.create-comment {
    // height: 100px;
}
</style>


