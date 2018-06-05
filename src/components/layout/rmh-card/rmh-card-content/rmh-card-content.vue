<template src="./rmh-card-content.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-card-content',

  mixins: [component],

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    }
  }
}
</script>

<style src="./rmh-card-content.styl" lang="stylus"></style>
