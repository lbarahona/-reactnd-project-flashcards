import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../helpers/styles';
import { colors } from '../helpers/colors';

export function Card(props) {
    const {index, showQuestion, questions, onQuestionPress, onButtonPress} = props,
        question = questions[index].question,
        answer = questions[index].answer;

    const style = StyleSheet.create({
        count: {
            padding: 12
        },
        questionAnswer: {
            fontSize: 24,
            paddingBottom: 6,
            paddingLeft: 12,
            paddingRight: 12
        },
        toggleQuestionAnswer: {
            color: colors.BLUE,
            fontSize: 18
        },
        correctButton: {
            backgroundColor: colors.GREEN
        },
        incorrectButton: {
            backgroundColor: colors.RED
        }
    });

    return <View style={styles.container}>
        <Text style={ style.count }>{index + 1} / {questions.length}</Text>

        <View style={{flex: 0.8, justifyContent: 'flex-end', alignItems: 'center'}}>
            {showQuestion &&
            <Text style={style.questionAnswer}>{question}</Text>
            }

            {!showQuestion &&
            <Text style={style.questionAnswer}>{answer}</Text>
            }

            <TouchableOpacity
                onPress={onQuestionPress}>
                <Text style={style.toggleQuestionAnswer}>Show { showQuestion ? 'Answer' : 'Question' }</Text>
            </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
                style={[styles.button, style.correctButton]}
                onPress={() => onButtonPress(true)}>
                <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, style.incorrectButton]}
                onPress={() => onButtonPress(false)}>
                <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
        </View>
    </View>
}
