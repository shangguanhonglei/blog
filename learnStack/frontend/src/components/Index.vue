<template>
  <div class="test">
    {{name}} {{msg}}
  </div>
</template>
<script>
export default {
  name: 'test',
  props:{
    msg: String
  },
  data() {
    return {
      name: 'test'
    }
  },
  methods: {
    getName() {
      return this.name
    }
  }
}
</script>