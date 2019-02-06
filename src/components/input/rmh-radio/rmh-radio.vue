<template src="./rmh-radio.html"></template>

<script>
import component from '@/mixins/component'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-radio',

  mixins: [component],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    model: [String, Number, Boolean],
    name: [String, Number],
    value: {
      type: [String, Number, Boolean],
      default: 'on'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },

  model: {
    prop: 'model',
    event: 'change'
  },

  mounted () {
    this.$refs.field.update(this.value)
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

  methods: {
    toggle (e) {
      if (!this.disabled) {
        this.$emit('change', this.value)
      }
    }
  }
}
</script>

<style src="./rmh-radio.styl" lang="stylus"></style>
