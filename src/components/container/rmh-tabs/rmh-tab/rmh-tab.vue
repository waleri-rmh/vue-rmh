<template src="./rmh-tab.html" />

<script>
import { component } from '@/mixins'

export default {
  name: 'rmh-tab',

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

  data () {
    return {
      visible: false
    }
  },

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
