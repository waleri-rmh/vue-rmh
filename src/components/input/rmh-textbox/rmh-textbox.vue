<template src="./rmh-textbox.html"></template>

<script>
import component from '@/mixins/component'
import input from '@/mixins/input'
import rmhField from '../rmh-field/rmh-field'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-textbox',

  mixins: [
    component,
    input
  ],

  components: {
    rmhField,
    rmhIcon
  },

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    icon: {
      type: String,
      default: ''
    },
    area: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.$refs.field.update(this.value)
  },

  computed: {
    classes () {
      return {
        'with-icon': this.icon !== '',
        'bordered': this.bordered,
        'disabled': this.disabled,
        'required': this.required,
        'is-textarea': this.area
      }
    },

    localValue: {
      get () {
        return this.value
      },
      set (value) {
        if (value !== this.value) {
          this.$emit('input', value)
          this.$refs.field.update(value)
        }
      }
    }
  },

  watch: {
    value (value) {
      if (value !== this.localValue) {
        this.$refs.field.update(value)
      }
    }
  },
}
</script>

<style src="./rmh-textbox.styl" lang="stylus"></style>
