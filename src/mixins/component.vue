<script>
export default {
  name: 'mixin-component',

  props: {
    initialized: {
      type: Function,
      default: null
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
      if (this.initialized) {
        this.initialized()
      }
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
