<template src="./rmh-tabs.html"></template>

<script>
import { component } from '@/mixins'
import { rmhTabHeader } from '@/components'

export default {
  name: 'rmh-tabs',

  mixins: [component],

  components: {
    rmhTabHeader
  },

  data: () => ({
    tabs: [],
    selectedTab: null,
    selectedTabIndex: -1
  }),

  computed: {
    hasDefaultSlot () {
      return !!this.$slots.default
    },

    classes () {
      return {}
    }
  },

  mounted () {
    this.fetchTabs()
  },

  watch: {
    selectedTabIndex () {
      this.changedSelectedTab()
    }
  },

  methods: {
    setSelectedTabIndex (index) {
      this.selectedTabIndex = parseInt(index)
      this.selectedTab = this.tabs[index]
      this.tabs.forEach((tab) => {
        tab.hide()
        if (tab === this.selectedTab) {
          tab.show()
        }
      })
    },

    fetchTabs () {
      this.tabs = this.$children.filter(child => child.$options._componentTag === 'rmh-tab')
      this.checkPropActivated()
    },

    checkPropActivated () {
      this.tabs.forEach((tab, index) => {
        if (tab.active) {
          this.setSelectedTabIndex(index)
          return
        }
      })
      this.setSelectedTabIndex(0)
    },

    changedSelectedTab () {
      this.$emit('change', {
        tab: this.selectedTab,
        target: this.selectedTab.$el,
        index: this.selectedTabIndex
      })
    }
  }
}
</script>

<style src="./rmh-tabs.styl" lang="stylus"></style>
