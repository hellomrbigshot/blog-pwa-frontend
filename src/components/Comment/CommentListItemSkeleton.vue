<template>
  <div class="skeleton-item">
    <van-skeleton title avatar :row="3" />
  </div>
</template>
<script lang="typescript">
import { Vue } from 'vue-property-decorator'
export default class CommentItemSkeleton extends Vue {}
</script>
<style lang="scss" scoped>
.skeleton-item {
  background: #fff;
  padding: .625rem;
  margin-top: 1.25rem;
}
</style> 
