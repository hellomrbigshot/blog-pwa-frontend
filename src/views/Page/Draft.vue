<template>
  <div>
    <page-list
      key="draft"
      :query="{
        status: 'draft',
        type: 'creator',
        content: Cookies.get('user')
      }"
      :api="api"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    pageList: () => import('@/components/Page/PageList.vue')
  }
})
export default class Draft extends Vue {
  api: string = '/api/page/limitpagelist'
}
</script>
