<template src="./rmh-list-item.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-list-item',

  mixins: [component],

  props: {
    link: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style src="./rmh-list-item.styl" lang="stylus"></style>
