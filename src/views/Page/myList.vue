<template>
  <page-list
    key="MyList"
    :query="{
      status: 'normal',
      type: 'create_user',
      content: Cookies.get('user')
    }"
    :api="api"
  />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'myList',
  components: {
    pageList: () => import('@/components/Page/PageList.vue')
  }
})
export default class myList extends Vue {
  api: string = '/api/page/limitpagelist'
}
</script>
