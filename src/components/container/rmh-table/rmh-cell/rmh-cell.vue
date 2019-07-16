<template src="./rmh-cell.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-cell',

  mixins: [component],

  props: {
    right: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return {
        right: this.right,
        center: this.center
      }
    }
  }
}
</script>
