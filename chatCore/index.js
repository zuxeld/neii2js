let chatMemory = {
    mem: [],
    rules: [],
};

function isCommand(oneSpaceUserMassage, command) {
    switch (command) {
        case 'deleteRule':
            if (true) { // for create local namespace
                let isFerstControlWord = /^на (?!.* на .*)/.test(oneSpaceUserMassage);
                if (!isFerstControlWord) return false;
                let isSecondControlWord = /(?<!.* говори .*|.* не .*) не говор(и$|и )(?!.* говори .*|.* не .*)/.test(oneSpaceUserMassage);
                if (!isSecondControlWord) return false;
                let isControlRuleWords = /на .+ не говор(и$|и )/.test(oneSpaceUserMassage);
                if (!isControlRuleWords) return false;
                return true;
            }
            break;
        case 'addRule':
            if (true) { // for create local namespace
                let isFerstControlWord = /^на (?!.* на .*)/.test(oneSpaceUserMassage);
                if (!isFerstControlWord) return false;
                let isSecondControlWord = /(?<!.* говори .*) говор(и$|и )(?!.* говори .*)/.test(oneSpaceUserMassage);
                if (!isSecondControlWord) return false;
                let isControlRuleWords = /на .+ говор(и$|и )/.test(oneSpaceUserMassage);
                if (!isControlRuleWords) return false;
                return true;
            }
            break;

        default:
            console.log('false command: '+command);
            break;
    }
    
    // let isControlWords = ;
    // let isControlWordsOnRightPlace = ;
    return isControlWords && isControlWordsOnRightPlace;
}
export default {
    // rebild memory from chat history:
    rebildChatMemory(chatHistory) {

    },
    getChatHistory() {

    },

    enterMassage(userMassage) {
        chatMemory.mem += 'hoz: ' + userMassage;
        let answer = null;
        let oneSpaceUserMassage = userMassage.replace(/\s+/,' ').replace(/^ | $/,'');
        if (isCommand(oneSpaceUserMassage, 'deleteRule')) {
            let ruleIndex = chatMemory.rules.length - 1;
            while (ruleIndex >= 0) {
                let isCoincidenceOfCondition = (
                    chatMemory.rules[ruleIndex].condition === oneSpaceUserMassage.match(/(?<=^на ).+(?= не говор(и$|и ))/)[0]
                );
                let isCoincidenceOfAction = (
                    chatMemory.rules[ruleIndex].action === oneSpaceUserMassage.match(/(?<= не говори ).*.$/)[0] || ''
                );
                let isCoincidenceOfRule = isCoincidenceOfCondition && isCoincidenceOfAction;
                if (isCoincidenceOfRule) {
                    chatMemory.rules.splice(ruleIndex, 1);
                }
                ruleIndex -= 1;
            }
            answer = 'понял';
        } else if (isCommand(oneSpaceUserMassage, 'addRule')) {
            
        } else {
            
        }
        
    },
    getChatText() {

    },
}