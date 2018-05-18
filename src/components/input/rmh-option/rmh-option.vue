<template src="./rmh-option.html"></template>

<script>
import component from '@/mixins/component'
import rmhIcon from '../rmh-icon/rmh-icon'

export default {
  name: 'rmh-option',

  mixins: [component],

  components: {
    rmhIcon
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
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
      delete l.div
      return l
    },

    isSelected () {
      return this.parent && this.parent.selectedItem.value === this.item.value
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
