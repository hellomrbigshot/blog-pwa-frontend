<template>
  <div>
    <div class="tag-title">共有 <span style="font-weight: bold;">{{ total }}</span> 个标签</div>
    <div class="taglist-wrapper">
      <router-link v-for="(tag, i) in tagList" :key="i" :to="{ name: 'tagDetail', params: { name: tag.name }}" class="tag-item">
        <van-tag size="large" plain :type="typeMapping(tag.page_num)">{{ `${tag.name}(${tag.page_num})` }}</van-tag>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getTagList } from '@/api/tag.ts'
@Component
export default class Tags extends Vue {
  tagList: object[] = []
  page: number = 1
  pageSize: number = 999
  pullLoading: boolean = false
  total: number = 0
  mounted() {
    this.getTagList()
  }
  getTagList() {
    getTagList({ page: this.page, pageSize: this.pageSize })
      .then(res => {
        this.pullLoading = false
        const { result, total } = res.data
        this.tagList = result
        this.total = total
      })
  }
  typeMapping(num: any) {
    if (num - 0 > 9) {
      return 'success'
    }
    if (num - 0 > 4) {
      return  'primary'
    }
    if (num - 0 === 0) {
      return 'danger'
    }
    return 'default'
  }
}
</script>
<style lang="scss" scoped>
.tag-title {
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
}
.taglist-wrapper {
  margin: 0px auto;
  width: 90%;
  text-align: center;
  .tag-item {
    margin-top: 20px;
    margin-left: 10px;
    display: inline-block;
  }
}
</style>


