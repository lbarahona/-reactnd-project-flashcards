import { AsyncStorage } from 'react-native';

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:deck';

export function formatDeckResults(results) {
    return results === null
        ? setInitData()
        : JSON.parse(results);
}

function setInitData() {
    const initData = {
        ['Bible']: {
            title: 'Bible',
            questions: [
                {
                    question: `What is the first book of The Bible?`,
                    answer: 'Genesis'
                },
                {
                    question: `How many books does the new testament have?`,
                    answer: '27.'
                },
                {
                    question: `Mathhew the disciple was a ...?`,
                    answer: 'Tax collector.'
                }
            ]
        },
        ['Geography']: {
            title: 'Geography',
            questions: [
                {
                    question: `In which state is the historic Shinnecock Hills Golf Club located?`,
                    answer: 'New York.'
                },
                {
                    question: `How many U.S. states border the Gulf of Mexico?`,
                    answer: 'Five - From east to west:Florida, Alabama, Mississippi, Louisiana, and Texas.'
                },
                {
                    question: `Which Nordic country was first to give women the right to vote, in 1906?`,
                    answer: 'Finland.'
                }
            ]
        }
    };

    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initData));

    return initData;
}