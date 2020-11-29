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
    <page-list
      v-if="this.name"
      ref="pageList"
      :query="{
        status: 'normal',
        type: 'tag',
        content: this.name,
        secret: false
      }"
      @change="listChange"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getTagDetail } from '@/api/tag'
import { ITag } from '@/types/tag'
@Component({
  components: {
    pageList: () => import('@/components/Page/PageList.vue')
  }
})
export default class tagDetail extends Vue {
  name: string = ''
  tagDetail: ITag = {
    _id: '',
    create_user: '',
    name: '',
    description: ''
  }
  total: number = 0
  mounted() {
    this.name = this.$route.params.name
    getTagDetail(this.name).then((res) => {
      let { data } = res
      this.tagDetail = data
    })
  }
  listChange(total: number) {
    this.total = total
  }
}
</script>
<style lang="scss" scoped>
.tag-info-box {
  height: 150px;
  position: relative;
  width: 100%;
  background: #fff;
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
    .tag-meta,
    .tag-desciption {
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
}
</style>
