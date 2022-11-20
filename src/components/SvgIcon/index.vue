<template>
  <svg class="app-svg-icon" aria-hidden="true" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
  export interface Props {
    prefix?: string
    name: string
    color?: string
    size?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    prefix: 'icon',
    color: '#333',
    size: '2em',
  })

  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped>
  svg {
    overflow: hidden;
    color: inherit;
    vertical-align: -0.1em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
    outline: none;
    fill: currentColor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
  }
</style>
