<template src="./rmh-select.html"></template>

<script>
import component from '../../mixins/component'
import rmhField from '../../components/rmh-field/rmh-field'

export default {
  name: 'rmh-select',

  mixins: [component],

  components: {
    rmhField
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    localValue: '',
    selectedItem: {
      value: null,
      text: ''
    },
    open: false,
    RmhSelect: {
      value: null,
      text: ''
    }
  }),

  mounted () {
    this.localValue = this.value
    this.$refs.field.inputMounted(this.value)
  },

  computed: {
    listeners () {
      let l = { ...this.$listeners }
      delete l.input
      return l
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
    focus (e) {
      this.open = true
      this.$refs.field.focus(e)
    },

    blur (e) {
      setTimeout(() => {
        this.open = false
      }, 300)
      this.$refs.field.blur(e)
    },

    select (item) {
      this.selectedItem = item
      this.localValue = item.value
      this.$refs.field.inputMounted(item.value)
      this.open = false
    }
  }
}
</script>

<style src="./rmh-select.styl" lang="stylus"></style>
