<template>
  <div @click="handleClick" class="tick-button">
    <span v-if="slot.icon">
      <slot name="icon"></slot>
    </span>
    <svg v-if="svgId">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :xlink:href="`#${svgId}`"
      ></use>
    </svg>
    <span v-if="slot.default">
      <slot></slot>
    </span>
    <span v-else>按钮</span>
  </div>
</template>

<script setup>
import { defineProps, useSlots, defineEmits } from 'vue'

// 插槽
const slot = useSlots()

// props
defineProps({
  svgId: {
    type: String,
    default: ''
  }
})

// emits
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style lang="less" scoped>
.tick-button {
  display: flex;
  align-items: center;
  width: 84px;
  padding: 6px;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
