<template>
  <van-tabs v-model="active" sticky :offset-top="46">
    <van-tab title="最热">
      <page-list key="最热" :query="{ status: 'normal', type: '', content: '', secret: false, sort: 'update_time' }" :api="api"></page-list>
    </van-tab>
    <van-tab title="最新">
      <page-list key="最新" :query="{ status: 'normal', type: '', content: '', secret: false, sort: 'create_time' }" :api="api"></page-list>
    </van-tab>
    <van-tab title="关注">
      <page-list key="关注" :query="{ status: 'normal', type: '', content: '', secret: false }" :api="api"></page-list>
    </van-tab>
  </van-tabs>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getPageList, searchPage } from '@/api/page.ts'
@Component({
  components: {
    pageList: () => import('@/components/Page/List.vue')
  }
})
export default class pageListPage extends Vue {
  active: number = 0
  api: string = '/api/page/pagelist'
}
</script>

