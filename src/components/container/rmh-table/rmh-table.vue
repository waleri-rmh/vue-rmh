<template src="./rmh-table.html"></template>

<script>
import component from '@/mixins/component'
import rmhRow from './rmh-row/rmh-row'
import rmhCell from './rmh-cell/rmh-cell'

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
