<template src="./rmh-icon.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-icon',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-icon.styl" lang="stylus"></style>
