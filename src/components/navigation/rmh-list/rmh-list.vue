<template src="./rmh-list.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-list',

  mixins: [component],

  props: {
    withDivider: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return {
        'width-divider': this.withDivider
      }
    }
  }
}
</script>

<style src="./rmh-list.styl" lang="stylus"></style>
