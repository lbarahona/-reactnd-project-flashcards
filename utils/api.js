import {AsyncStorage} from 'react-native'

const DB_STORAGE_KEY = 'Flashcard:deck'

// to clear AsyncStorage
export const clearData = () => {
    AsyncStorage.removeItem(DB_STORAGE_KEY)
}

// helper methods for AsyncStorage Database
const initData = () => {
    const decks = {
        Bible: {
            title: 'Bible',
            questions: [
                {
                    question: 'The first book of The Bible is Genesis.',
                    answer: true,
                },

                {
                    question: 'The New Testament has 29 books.',
                    answer: false,
                },

                {
                    question: 'The shortest book in the New Testament is 2 Jhon.',
                    answer: true,
                },

                {
                    question: 'Matthew was a tax collector.',
                    answer: true,
                },

            ]
        },
        Geography: {
            title: 'Geography',
            questions: [
                {
                    question: 'Tokyo is the most populous city in the world.',
                    answer: true
                },
                {
                    question: '7 U.S. states border the Gulf of Mexico.',
                    answer: false
                }
            ]
        }
    }

    AsyncStorage.setItem(DB_STORAGE_KEY, JSON.stringify(decks))
    return decks
}



export const getDecks = () => AsyncStorage.getItem(DB_STORAGE_KEY)
  .then(result => (result === null ?
            initData() :
            JSON.parse(result)))


export const saveDeckTitle = (title) => AsyncStorage.mergeItem(DB_STORAGE_KEY, JSON.stringify({
  [title] : {
    title : title,
    questions: []
  }
}))


export const addCardToDeck = (title, card) => AsyncStorage.getItem(DB_STORAGE_KEY)
  .then(result => {
    result = JSON.parse(result)
    return AsyncStorage.mergeItem(DB_STORAGE_KEY, JSON.stringify({
      [title] : {
        questions : [...result[title].questions,card]
      }
    }))
  })

