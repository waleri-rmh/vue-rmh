<template src="./rmh-table.html"></template>

<script>
import { component } from '@/mixins'

import {
  rmhRow,
  rmhCell
} from '@/components'

export default {
  name: 'rmh-table',

  mixins: [component],

  components: {
    rmhRow,
    rmhCell
  },

  computed: {
    classes () {
      return {}
    }
  }
}
</script>

<style src="./rmh-table.styl" lang="stylus"></style>
