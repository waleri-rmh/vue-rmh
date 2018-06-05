<template src="./rmh-card-header.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-card-header',

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-card-header.styl" lang="stylus"></style>
