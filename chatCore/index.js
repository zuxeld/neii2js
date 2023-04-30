let chatMemory = {
    mem: [],

};
function isDeleteRuleCommand(words) {
    
}
function isAddRuleCommand(words) {
    
}
export default {
    // rebild memory from chat history:
    rebildChatMemory(chatHistory) {

    },
    getChatHistory() {

    },

    enterMassage(userMassage) {
        chatMemory.mem += 'hoz: ' + userMassage;
        let words = userMassage.split(' ');
        words = words.filter(function(item, index, array) {
            if (item === '') return false;
            return true;
        });
        if (isDeleteRuleCommand(words)) {
            
        } else if (isAddRuleCommand(words)) {
            
        } else {
            
        }
    },
    getChatText() {

    },
}