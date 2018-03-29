import { AsyncStorage } from 'react-native';

export const FLASHCARDS_STORAGE_KEY = 'MobileFlashCards:bunny-glass-water-lord-tree';

export function formatDeckResults(results) {
    return results === null
        ? setInitData()
        : JSON.parse(results);
}

function setInitData() {
    const initData = {
        ['Dragon Ball']: {
            title: 'Dragon Ball',
            questions: [
                {
                    question: `What is the name of Goku's sons?`,
                    answer: 'Gohan and Goten.'
                },
                {
                    question: `How much was the power level that surprised Vegeta?`,
                    answer: '9000.'
                },
                {
                    question: `Despite participating in 6 World Martial Arts Tournaments, how many did Goku win?`,
                    answer: 'Only one.'
                }
            ]
        },
        ['The Office']: {
            title: 'The Office',
            questions: [
                {
                    question: `Who had their first day in the first episode?`,
                    answer: 'Ryan Howard.'
                },
                {
                    question: `Which Dundy does Phyllis take home at the first Dundies?`,
                    answer: 'The Bushiest Beaver Dundie.'
                },
                {
                    question: `What is on Todd Packer's license plate?`,
                    answer: 'WLHUNG.'
                },
                {
                    question: `What is the name of Dwight's sensei?`,
                    answer: 'Ira.'
                },
                {
                    question: `Who ends up with the Video iPod at the end of Secret Santa?`,
                    answer: 'Dwight.'
                }
            ]
        }
    };

    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initData));

    return initData;
}