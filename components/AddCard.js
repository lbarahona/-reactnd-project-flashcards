import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as actions from '../actions';
import * as storage from '../helpers/storage';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { styles } from '../helpers/styles';

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: `Add card`
        }
    };

    submit = () => {
        if (this.state.question && this.state.answer) {
            const {dispatch, navigation} = this.props;

            dispatch(actions.addCardToDeck(navigation.state.params.deckId, this.state.question, this.state.answer));
            storage.addCardToDeck(navigation.state.params.deckId, this.state.question, this.state.answer);

            this.setState({question: '', answer: ''});
            Keyboard.dismiss();
            this.props.navigation.dispatch(NavigationActions.back());
        }
        else {
            alert('You have to fill out both fields!');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={style.deckTitle}>Add card to { this.props.navigation.state.params.deckId }</Text>
                <Text style={styles.formLabel}>Question</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />
                <Text style={styles.formLabel}>Answer</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submit}>
                    <Text style={styles.buttonText}>Add card</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    deckTitle: {
        fontSize: 24,
        padding: 12
    }
});

export default connect()(AddCard);