<template>
    <div>
        <div style="padding: 10px 15px; background: #fff; font-size: 14px;">共有 <span style="font-weight: bold;">{{ total }}</span> 个标签</div>
        <van-pull-refresh v-model="pullLoading" @refresh="onRefresh" style="padding: 10px 8px 0; min-height: 70vh;">
            <div  v-for="(item, index) in tagList" :key="index" class="tag-wrapper">
                <router-link :to="{ name: 'tagDetail', params: { name: item.name }}">
                    <div class="tag-name">{{ item.name }}<span style="color: #888;"></span></div>
                    <hr style="margin: 0 16px; border: 0; border-bottom: 1px solid #DFE1E5; "/>
                </router-link>
                
                <div class="tag-desc">{{ item.description }}</div>
                <hr style="margin: 0 16px; border: 0; border-bottom: 1px solid #DFE1E5; "/>
                <div class="tag-bottom">标签下有 <router-link :to="{ name: 'tagDetail', params: { name: item.name }}" style="color: #1989fa; font-weight: bold;">{{ item.page_num }}</router-link> 篇文章</div>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTagList } from '@/api/tag.ts';
@Component
export default class Tags extends Vue {
    tagList: object[] = [];
    page: number = 1;
    pageSize: number = 999;
    pullLoading: boolean = false;
    total: number = 0;
    mounted () {
        this.getTagList();
    }
    getTagList () {
        getTagList({ page: this.page, pageSize: this.pageSize })
            .then(res => {
                this.pullLoading = false;
                const { result, total } = res.data;
                this.tagList = result;
                this.total = total;
            })
    }
    onRefresh () {
        this.getTagList();
    }
}
</script>
<style lang="scss" scoped>
.tag-wrapper {
    background: #fff;
    padding: 5px;
    display: block;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 6px #20212447;
    .tag-name, .tag-desc, .tag-bottom {
        padding: 12px 16px;
        display: block;
    }
    .tag-bottom {
        padding-top: 5px;
    }
    .tag-desc, .tag-bottom {
        color: #888; 
        font-size: 12px;
    }
    .tag-name {
        font-size: 16px; 
        color: #1989fa;
        font-weight: bold;
        line-height: 20px;
    }
}
</style>


