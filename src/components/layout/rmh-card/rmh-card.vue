<template src="./rmh-card.html"></template>

<script>
import component from '../../../mixins/component'

export default {
  name: 'rmh-card',

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-card.styl" lang="stylus"></style>
