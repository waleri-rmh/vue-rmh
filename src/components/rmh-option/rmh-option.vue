<template src="./rmh-option.html"></template>

<script>
import component from '../../mixins/component'

export default {
  name: 'rmh-option',

  mixins: [component],

  props: {
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    localValue: '',
    parent: null
  }),

  mounted () {
    this.localValue = this.value
    this.parent = this.parentByName('rmh-select', this)
    this.preSelect()
  },

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.input
      return l
    },

    parentData () {
      return this.parent ? this.parent.data : null
    },

    isSelected () {
      return this.parent.selectedItem.value === this.item.value
    },

    item () {
      return {
        value: this.localValue,
        text: this.text || this.$slots.default[0].text
      }
    }
  },

  watch: {
    localValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.localValue = val
    }
  },

  methods: {
    preSelect () {
      if (this.selected) {
        this.$nextTick(() => {
          this.select()
        })
      }
    },

    select () {
      this.parent.select(this.item)
    }
  }
}
</script>

<style src="./rmh-option.styl" lang="stylus"></style>
