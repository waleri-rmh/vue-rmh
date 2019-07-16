<template src="./rmh-table.html" />

<script>
import { component } from '@/mixins'

import {
  rmhRow,
  rmhCell
} from '@/components'

export default {
  name: 'rmh-table',

  components: {
    rmhRow,
    rmhCell
  },

  mixins: [component],

  computed: {
    classes () {
      return {}
    }
  }
}
</script>

<style src="./rmh-table.styl" lang="stylus"></style>
