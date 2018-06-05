<template src="./rmh-icon.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-icon',

  mixins: [component],

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.span
      return l
    },

    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-icon.styl" lang="stylus"></style>
