<template src="./rmh-content.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-content',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-content.styl" lang="stylus"></style>
