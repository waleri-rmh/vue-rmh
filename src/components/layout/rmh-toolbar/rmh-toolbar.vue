<template src="./rmh-toolbar.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-toolbar',

  mixins: [component],

  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-toolbar.styl" lang="stylus"></style>
