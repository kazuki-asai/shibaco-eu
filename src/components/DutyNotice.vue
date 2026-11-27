<template>
  <p class="duty-notice">
    <slot>{{ dutyNotice }}</slot>
  </p>
</template>

<script setup>
import { dutyNotice } from '@/config/store'
</script>

<style scoped>
.duty-notice {
  margin: 12px 0 0;
  padding: 12px 14px;
  background: #eef0ed;
  border-left: 3px solid #b89a6a;
  color: #3a3a3a;
  font-size: 0.82rem;
  line-height: 1.65;
}
</style>
