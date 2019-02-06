<script>
export default {
  name: 'mixin-component',

  props: {
    id: {
      type: String,
      default: null
    },
    initialized: {
      type: Function,
      default: null
    }
  },

  data: () => ({
    uId: null
  }),

  computed: {
    listeners () {
      return { ...this.$listeners }
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    /**
     * @name initialize
     **/
    initialize () {
      this.generateUid()
      if (this.initialized) {
        this.initialized()
      }
    },

    generateUid () {
      this.uId = `${(this.id || this.$options._componentTag)}-${this._uid}`
    },

    parentByName (name, scope) {
      const tag = scope.$parent.$options._componentTag
      if (tag && tag !== name) {
        return scope.parentByName(name, scope.$parent)
      } else {
        return scope.$parent
      }
    }
  }
}
</script>
