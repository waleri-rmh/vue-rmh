<template src="./rmh-container.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-container',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-container.styl" lang="stylus"></style>
