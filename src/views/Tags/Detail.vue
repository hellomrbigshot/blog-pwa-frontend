<template>
    <div>
        <div class="tag-info-box">
            <div class="tag-info">
                <div>
                    <div class="tag-title">{{ name }}</div>
                    <div class="tag-meta">{{ total }} 篇文章</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getTagDetail } from '@/api/tag'
import { getPageList, searchPage }  from '@/api/page'
@Component
export default class tagDetail extends Vue {
    name: string = '';
    tagDetail: object = {};
    page: number = 1;
    pageSize: number = 10;
    total: number = 0;
    list: object[] = [];
    listFinished: boolean = true;
    mounted () {
        this.name = this.$route.params.name;
        getTagDetail(this.name).then(res => {
            let { data } = res;
            this.tagDetail = data;
        })
        getPageList({ status: 'normal', pageSize: this.pageSize, page: this.page, type: 'tag', content: this.name, secret: false }).then(res => {
            const { total, result } = res.data;
            this.list = result;
            this.total = total;
            if (this.total <= this.pageSize) this.listFinished = true;
        })
    };
}
</script>
<style lang="scss" scoped>
.tag-info-box {
    height: 150px;
    position: relative;
    width: 100%;
    background: #f8f9fa;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
    color: #666;
    .tag-info {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        // padding: 4em 0;
        text-align: center;
        .tag-title {
            font-size: 25px;
            line-height: 30px;
            font-weight: 700;
            margin-bottom: 2px;
        }
        .tag-meta, .tag-desciption {
            font-size: 12px;
            margin-bottom: 2px;
        }
    }
}
</style>

