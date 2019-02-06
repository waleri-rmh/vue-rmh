<script>
export default {
  name: 'mixin-input',

  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: [Boolean, String],
      default: false
    },
    validation: {
      type: Object,
      default: null
    }
  },

  methods: {
    focus (e) {
      this.$refs.field.focus(e)
    },

    blur (e) {
      this.$refs.field.blur(e)
    }
  }
}
</script>
