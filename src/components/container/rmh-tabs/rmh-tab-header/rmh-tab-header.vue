<template src="./rmh-tab-header.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-tab-header',

  mixins: [component],

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {
        'active': this.active
      }
    }
  }
}
</script>

<style src="./rmh-tab-header.styl" lang="stylus"></style>
