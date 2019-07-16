<template src="./rmh-dialog-content.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-dialog-content',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-dialog-content.styl" lang="stylus"></style>
