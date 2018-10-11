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
                    <Badge :info="detail.comments&&detail.comments.length||0">
                        <van-icon slot="content" name="chat" size="16px" />
                    </Badge>
                </van-col>
            </van-row>
        </div>
        <div class="fix-shadow" v-show="createComment" @click.prevent="createComment=false;">
            <div class="fix-bottom set-comment create-comment" @click.stop="">
                <div>
                    <van-field v-model="comment" type="textarea" :autosize="{ maxHeight: 100, minHeight: 30 }" placeholder="回复" />
                </div>
                <div style="overflow: auto;">
                    <van-icon name="success" size="14px" style="margin: 10px 20px 10px 0; float: right;"></van-icon>
                </div>
                
            </div>
        </div>
        
    </div>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: {
        Badge: () => import('@/components/Badge.vue')
    }
})
export default class setComment extends Vue {
    @Prop(Object) detail!: object
    createComment: boolean = false
    comment: string = ''
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


