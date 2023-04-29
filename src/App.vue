<script>
// import HelloWorld from './components/HelloWorld.vue'
import chatCore from '../chatCore/index.js'
export default {
  data() {
    return {
      userMassage: '',
      chatText: 'extext',
      chatHistory: '',
      showingChatTextInfo: '',
    }
  },

  methods: {
    submitChat() {
      chatCore.enterMassage(this.userMassage);
      this.chatText = chatCore.getChatText();
      // this.chatText += '\n'+this.userMassage;
      this.userMassage = '';
    },
    submitLastChat() {
      chatCore.rebildChatMemory(this.chatHistory);
      this.chatText = chatCore.getChatText();
      this.chatHistory = '';
    },
    showChatInfo() {
      this.showingChatTextInfo = chatCore.getChatHistory();
    },

  },
}
</script>

<template>
  <main class="m-2">
    <p class="p-2">Chat:</p>
    <p class="p-2  whitespace-pre-wrap">
      {{ chatText }}
    </p>
    <input type="text" v-model="userMassage" @keyup.enter="submitChat" class="m-2  rounded-lg">
    <hr>
    <button type="button" class="px-3 py-1 m-2  border border-slate-400 rounded-md hover:bg-slate-200 active:bg-slate-500">export memory file</button>
    <button type="button" class="px-3 py-1 m-2  border border-slate-400 rounded-md hover:bg-slate-200 active:bg-slate-500">load memory file</button>
    // coming soon //
    <hr>
    <p class="p-2">text input for last chat info:</p>
    <textarea v-model="chatHistory" cols="30" rows="10" class="p-2  rounded-lg"></textarea>
    <br>
    <button @click.left="submitLastChat" type="button" class="px-3 py-1 m-2  border border-slate-400 rounded-md hover:bg-slate-200 active:bg-slate-500">submit last chat info</button>
    <hr>
    <button @click.left="showChatInfo" type="button" class="px-3 py-1 m-2  border border-slate-400 rounded-md hover:bg-slate-200 active:bg-slate-500">show current chat info</button>
    <p class="p-2  whitespace-pre-wrap">
      {{ showingChatTextInfo }}
    </p>
    
  </main>
</template>

<style scoped>
</style>
