<template src="./rmh-select.html"></template>

<script>
import component from '../../mixins/component'
import rmhField from '../../components/rmh-field/rmh-field'
import rmhIcon from '../../components/rmh-icon/rmh-icon'

export default {
  name: 'rmh-select',

  mixins: [component],

  components: {
    rmhField,
    rmhIcon
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
    open: false
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
      this.$refs.field.focus(this.$refs.input)
    },

    blur (e) {
      setTimeout(() => {
        this.open = false
      }, 300)
      this.$refs.field.blur(this.$refs.input)
    },

    fakeFocus (e) {
      this.focus()
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
