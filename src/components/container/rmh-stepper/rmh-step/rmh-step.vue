<template src="./rmh-step.html"></template>

<script>
import component from '@/mixins/component'

export default {
  name: 'rmh-step',

  mixins: [component],

  props: {
    label: {
      type: String,
      default: 'Item'
    },
    active: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    visible: false
  }),

  methods: {
    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    }
  }
}
</script>
