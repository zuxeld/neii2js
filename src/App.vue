<script>
// import HelloWorld from './components/HelloWorld.vue'
export default {
  data() {
    return {
      userMassage: '',
      chatText: 'extext',
    }
  },

  methods: {
    submit() {
      this.chatText += '\n'+this.userMassage;
      this.userMassage = '';
    }
  },
}
</script>

<template>
  <main class="m-2">
    <p class="p-2  whitespace-pre-wrap">
      {{ chatText }}
    </p>
    <input type="text" v-model="userMassage" @keyup.enter="submit" class="m-2  rounded-lg">
    <hr>
    <button type="button" class="px-3 py-1 m-2  border border-slate-400 rounded-md hover:bg-slate-200 active:bg-slate-500">export memory file</button>
    <button type="button" class="px-3 py-1 m-2  border border-slate-400 rounded-md hover:bg-slate-200 active:bg-slate-500">load memory file</button>
  </main>
</template>

<style scoped>
</style>
