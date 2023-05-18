let chatMemory = {
    mem: [],
    rules: [],
    lastOldChatItem: -1,
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
        // old read for single rewrite old chat history:
        // let singleStrings = chatHistory.split('\n');
        // let singleStrings = chatHistory.match(/^.+$/mg);
        // chatMemory.mem = singleStrings.map((singleString, singleStringIndex) => {
        //     console.log(singleString);
        //     let match = singleString.match(/(?<=([^:]+): ).*$/)
        //     let speaker = (match[1] === 'hoz') ? 'user' : 'butler';
        //     return {
        //         speaker, 
        //         massage: match[0],
        //     }
        // })

        chatMemory.mem = JSON.parse(chatHistory);
        chatMemory.lastOldChatItem = chatMemory.mem.length - 1;

        chatMemory.rules = [];
        let memWithUserMassages = chatMemory.mem.filter((memItem) => memItem.speaker === 'user');
        memWithUserMassages.forEach((memItem) => {
            let userMassage = memItem.massage;
            if (isCommand(userMassage, 'deleteRule')) {
                for (let ruleIndex = chatMemory.rules.length - 1; ruleIndex >= 0; ruleIndex--) {
                    let isCoincidenceOfCondition = (
                        chatMemory.rules[ruleIndex].condition === userMassage.match(/(?<=^на ).+(?= не говор(и$|и ))/)[0]
                    );
                    let isCoincidenceOfAction = (
                        chatMemory.rules[ruleIndex].action === userMassage.match(/(?<= не говори ).*.$/)[0] || ''
                    );
                    let isCoincidenceOfRule = isCoincidenceOfCondition && isCoincidenceOfAction;
                    if (isCoincidenceOfRule) {
                        chatMemory.rules.splice(ruleIndex, 1);
                    }
                }
            } else if (isCommand(userMassage, 'addRule')) {
                chatMemory.rules.push({
                    condition: userMassage.match(/(?<=^на ).+(?= говор(и$|и ))/)[0],
                    action: userMassage.match(/(?<= говори ).*.$/)[0] || '',
                })
            } else return;
        })
        console.log(chatMemory.rules);
    },
    getChatHistory() {
        return JSON.stringify(chatMemory.mem);
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
            if (memItemIndex <= chatMemory.lastOldChatItem) return '';
            chatText += '\n' + memItem.speaker + ': ' + memItem.massage;
            if (memItemIndex === 0) chatText = chatText.slice(1);
            return chatText;
        }, '')
    },
}