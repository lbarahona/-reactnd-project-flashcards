import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../helpers/styles';
import { Card } from './Card';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../helpers/colors';
import { clearLocalNotification, setLocalNotification } from '../helpers/notifications';
import { NavigationActions } from 'react-navigation';

class Quiz extends Component {
    state = {
        questions: [],
        currentQuestionIndex: 0,
        showQuestion: true
    };

    static navigationOptions = () => {
        return {
            title: 'Quiz'
        }
    };

    componentDidMount() {
        const {decks, navigation} = this.props;

        const deck = Object.entries(decks).find(
            deck => {
                return deck[1].title === navigation.state.params.deckId;
            }
        );

        const questions = deck[1].questions.map((question) => {
            return {
                question: question.question,
                answer: question.answer,
                correct: false
            }
        });

        this.setState({questions});

        clearLocalNotification()
            .then(setLocalNotification)
    }

    resetQuiz = () => {
        const questions = this.state.questions.map((question) => {
            return { question: question.question, answer: question.answer, correct: false }
        });

        this.setState({questions, currentQuestionIndex: 0, showQuestion: true});
    };

    handleButtons = (status) => {
        const questions = this.state.questions;
        questions[this.state.currentQuestionIndex].correct = status;

        this.setState({questions, currentQuestionIndex: this.state.currentQuestionIndex + 1, showQuestion: true});
    };

    toggleQuestion = () => {
        this.setState({showQuestion: !this.state.showQuestion});
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.questions.length > 0 &&
                this.state.currentQuestionIndex < this.state.questions.length &&
                <Card index={this.state.currentQuestionIndex}
                      showQuestion={this.state.showQuestion}
                      questions={this.state.questions}
                      onQuestionPress={this.toggleQuestion}
                      onButtonPress={this.handleButtons}
                />
                }
                {this.state.questions.length > 0 &&
                this.state.currentQuestionIndex >= this.state.questions.length &&
                <View style={styles.container}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        {this.state.questions.filter(question => question.correct).length === this.state.questions.length &&
                        <Ionicons size={60} style={style.checkmarkIcon} name="ios-checkmark-circle"/>
                        }
                        {this.state.questions.filter(question => question.correct).length !== this.state.questions.length &&
                        <Ionicons size={60} style={style.alertIcon} name="ios-alert"/>
                        }
                        <Text style={style.quizDoneText}>You've
                            got {this.state.questions.filter(question => question.correct).length} out
                            of {this.state.questions.length} questions correct
                            ({Math.round(this.state.questions.filter(question => question.correct).length / this.state.questions.length * 100)}%).
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                            style={[styles.button, style.backToDeckButton]}
                            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                            <Text style={styles.buttonText}>Back to Deck</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.resetQuiz}>
                            <Text style={styles.buttonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
                {this.state.questions.length === 0 &&
                <Text style={style.noQuestions}>There are no questions in this deck. Please create some questions first.</Text>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    noQuestions: {
        fontSize: 24,
        padding: 12
    },
    quizDone: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkmarkIcon: {
        color: colors.GREEN,
        marginBottom: 12
    },
    alertIcon: {
        color: colors.RED,
        marginBottom: 12
    },
    quizDoneText: {
        fontSize: 24,
        textAlign: 'center'
    },
    backToDeckButton: {
        backgroundColor: colors.ASPHALT
    }
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz);