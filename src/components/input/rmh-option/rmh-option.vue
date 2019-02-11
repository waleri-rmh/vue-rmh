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
      type: [String, Number, Object],
      default: null
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
    parent: null
  }),

  mounted () {
    this.parent = this.parentByName('rmh-select', this)
    this.preSelect()
  },

  computed: {
    isSelected () {
      return this.parent && this.parent.selectedItem.value === this.item.value
    },

    classes () {
      return {
        selected: this.isSelected,
        'with-icon': this.icon !== ''
      }
    },

    item () {
      return {
        value: this.localValue,
        text: this.text || this.$slots.default[0].text
      }
    },

    localValue: {
      get () {
        return this.mutable(this.value)
      },
      set (value) {
        this.$nextTick(() => {
          if (value !== this.value) {
            this.$emit('input', value)
          }
        })
      }
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
