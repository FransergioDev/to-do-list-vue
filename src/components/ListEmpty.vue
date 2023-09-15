<template>
    <div>
        {{ msg }}
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'ListEmpty',
    components: {
    },
    data () {
      return {
        msg: 'No tasks'
      }
    }
  }
  </script>