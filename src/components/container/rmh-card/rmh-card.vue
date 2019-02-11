<template src="./rmh-card.html"></template>

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-card',

  mixins: [component],

  props: {
    withDivider: {
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

<style src="./rmh-card.styl" lang="stylus"></style>
