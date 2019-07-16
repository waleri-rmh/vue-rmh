<template src="./rmh-footer.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-footer',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-footer.styl" lang="stylus"></style>
