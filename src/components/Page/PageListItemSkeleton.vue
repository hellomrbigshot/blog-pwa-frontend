<template>
  <div class="skeleton-wrapper">
    <van-skeleton title :row="5"/>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class PageItemSkeleton extends Vue {}
</script>
<style lang="scss" scoped>
.skeleton-wrapper {
  padding: .625rem;
   margin-top: 1.25rem;
   background: #fff;
}
</style>
