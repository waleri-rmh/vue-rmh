<template src="./rmh-row.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-row',

  mixins: [component],

  props: {
    head: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return {
        head: this.head
      }
    }
  }
}
</script>
