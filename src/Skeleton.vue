<template>
    <div class="skeleton-wrapper">
        <header class="skeleton-header"></header>
        <section class="skeleton-block">
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
            </div>
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
            </div>
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
            </div>
            <div class="skeleton-page">
                <div class="skeleton-page-tag"></div>
                <div class="skeleton-page-header"></div>
                <div class="skeleton-page-content"></div>
            </div>
            <div class="skeleton-bottom"></div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'skeleton'
};
</script>

<style scoped>
.skeleton-header {
  height: 64px;
  background: #eee;
  width: 100%;
}

.skeleton-block {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
}
.skeleton-block .skeleton-page-tag {
  background: #eee;
  height: 19px;
  width: 100px;
}
.skeleton-block .skeleton-page-header {
  background: #eee;
  height: 28px;
  margin: 5px 0;
  width: 100px;
}
.skeleton-block .skeleton-page-content {
  background: #eee;
  height: 80px;
  margin-bottom: 15px;
}
.skeleton-block .skeleton-bottom {
  background: #eee;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>