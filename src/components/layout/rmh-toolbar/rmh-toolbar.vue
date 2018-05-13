<template src="./rmh-toolbar.html"></template>

<script>
import component from '../../../mixins/component'

export default {
  name: 'rmh-toolbar',

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-toolbar.styl" lang="stylus"></style>
