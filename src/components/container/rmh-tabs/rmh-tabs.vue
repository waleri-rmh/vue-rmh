<template src="./rmh-tabs.html"></template>

<script>
import component from '@/mixins/component'
import rmhTabHeader from './rmh-tab-header/rmh-tab-header'

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
      for (let tab of this.tabs) {
        tab.hide()
        if (tab === this.selectedTab) {
          tab.show()
        }
      }
    },

    fetchTabs () {
      this.tabs = this.$children.filter(child => {
        return child.$options._componentTag === 'rmh-tab'
      })
      this.checkPropActivated()
    },

    checkPropActivated () {
      for (let tab in this.tabs) {
        if (this.tabs[tab].active) {
          this.setSelectedTabIndex(tab)
          return
        }
      }
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
