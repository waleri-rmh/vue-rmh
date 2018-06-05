<template src="./rmh-dialog-header.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-dialog-header',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-dialog-header.styl" lang="stylus"></style>
