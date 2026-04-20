<template>
  <van-tabs v-model="active" sticky :offset-top="46">
    <van-tab title="最热">
      <PageList
        :query="{
          status: 'normal',
          type: '',
          content: '',
          secret: false,
          sort: 'update_time'
        }"
        :api="api"
      />
    </van-tab>
    <van-tab title="最新">
      <PageList
        :query="{
          status: 'normal',
          type: '',
          content: '',
          secret: false,
          sort: 'create_time'
        }"
        :api="api"
      />
    </van-tab>
    <van-tab title="关注">
      <PageList
        key="ATTENTION"
        :query="{
          status: 'normal',
          type: '',
          content: '',
          secret: false
        }"
        :api="api"
      />
    </van-tab>
  </van-tabs>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {
    PageList: () => import('@/components/Page/PageList.vue')
  }
})
export default class pageListPage extends Vue {
  active: number = 0
  api: string = '/api/page/pagelist'
}
</script>
