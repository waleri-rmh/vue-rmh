<template src="./rmh-row.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-row',

  mixins: [component],

  props: {
    head: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return {
        head: this.head
      }
    }
  }
}
</script>
