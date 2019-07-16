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

  data () {
    return {
      uId: null
    }
  },

  computed: {
    listeners () {
      return { ...this.$listeners }
    },

    attributes () {
      return {
        id: this.id,
        ...this.$attrs
      }
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
    },

    mutable (value) {
      if (value === null) return null
      if (value === undefined) return undefined
      if (typeof value === 'string') return new String(value)
      if (typeof value === 'number') return new Number(value)
      if (typeof value === 'boolean') return new Boolean(value)
      if (typeof value === 'object') return { ...value }
      if (typeof value === 'array') return [ ...value ]
      return JSON.parse(JSON.stringify(value))
    }
  }
}
</script>
