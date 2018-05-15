<template src="./rmh-list-item.html"></template>

<script>
import component from '../../../mixins/component'

export default {
  name: 'rmh-list-item',

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
