<template src="./rmh-radio.html" />

<script>
import { component } from '@/mixins'

import {
  rmhField,
  rmhIcon
} from '@/components'

export default {
  name: 'rmh-radio',

  components: {
    rmhField,
    rmhIcon
  },

  mixins: [component],

  model: {
    prop: 'model',
    event: 'change'
  },

  props: {
    model: {
      type: [String, Number, Boolean],
      default: null
    },
    name: {
      type: [String, Number],
      default: null
    },
    value: {
      type: [String, Number, Boolean],
      default: 'on'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isSelected () {
      return this.model === this.value
    },

    classes () {
      return {
        'checked': this.isSelected,
        'disabled': this.disabled,
        'required': this.required,
        'inline': this.inline
      }
    }
  },

  mounted () {
    this.$refs.field.update(this.value)
  },

  methods: {
    toggle () {
      if (!this.disabled) {
        this.$emit('change', this.value)
      }
    }
  }
}
</script>

<style src="./rmh-radio.styl" lang="stylus"></style>
