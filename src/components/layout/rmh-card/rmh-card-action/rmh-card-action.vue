<template src="./rmh-card-action.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-card-action',

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-card-action.styl" lang="stylus"></style>
