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
        chatMemory.mem.push({
            speaker: 'user',
            massage: userMassage,
        })
        let answer = null;
        let oneSpaceUserMassage = userMassage.replace(/\s+/,' ').replace(/^ | $/,'');
        if (isCommand(oneSpaceUserMassage, 'deleteRule')) {
            for (let ruleIndex = chatMemory.rules.length - 1; ruleIndex >= 0; ruleIndex--) {
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
            }
            answer = 'понял';
        } else if (isCommand(oneSpaceUserMassage, 'addRule')) {
            chatMemory.rules.push({
                condition: oneSpaceUserMassage.match(/(?<=^на ).+(?= говор(и$|и ))/)[0],
                action: oneSpaceUserMassage.match(/(?<= говори ).*.$/)[0] || '',
            })
            answer = 'понял';
        } else {
            for (let ruleIndex = 0; ruleIndex <= chatMemory.rules.length - 1; ruleIndex++) {
                if (chatMemory.rules[ruleIndex].condition === oneSpaceUserMassage) {
                    if (answer === null) {
                        answer = chatMemory.rules[ruleIndex].action;
                    } else {
                        answer += ' ' + chatMemory.rules[ruleIndex].action;
                    }
                }
            }
        }
        if (answer === null) {
            answer = '?'
        }
        chatMemory.mem.push({
            speaker: 'butler',
            massage: answer,
        })
    },
    getChatText() {
        return chatMemory.mem.reduce((chatText, memItem, memItemIndex) => {
            chatText += '\n' + memItem.speaker + ': ' + memItem.massage;
            if (memItemIndex === 0) chatText = chatText.slice(1);
            return chatText;
        }, '')
    },
}