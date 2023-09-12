<template>
  <a-layout-footer class="cloud-footer">
    <p>————you-want 提供计算服务————</p>
    <p>
      Copyright © 2019 -
      {{ new Date().getFullYear() }} you-want 出品
    </p>
  </a-layout-footer>
</template>

<style lang="less" scoped>
.cloud-footer {
  height: 40px;
  width: 100%;
  color: #9a9b9d;
  background: #f1f1f1;
  font-size: 12px;
  text-align: center;
  padding: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  p {
    height: 20px;
    line-height: 20px;
    margin-bottom: 0;
  }
}
</style>
