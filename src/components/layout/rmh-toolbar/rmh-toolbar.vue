<template src="./rmh-toolbar.html"></template>

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-toolbar',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-toolbar.styl" lang="stylus"></style>
