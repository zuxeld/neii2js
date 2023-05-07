let chatMemory = {
    mem: [],

};

function isDeleteRuleCommand(words) {
    // let isControlWords = ;
    // let isControlWordsOnRightPlace = ;
    return isControlWords && isControlWordsOnRightPlace;
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
        // let words = userMassage.match(/\S+/ig);
        if (isDeleteRuleCommand(words)) {
            
        } else if (isAddRuleCommand(words)) {
            
        } else {
            
        }
    },
    getChatText() {

    },
}