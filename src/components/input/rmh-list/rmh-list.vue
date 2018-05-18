<template src="./rmh-list.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-list',

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
