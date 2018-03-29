import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../helpers/styles';
import { colors } from '../helpers/colors';

class Deck extends Component {
    state = {
        deck: null
    };

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params;

        return {
            title: deckId
        }
    };

    componentDidMount() {
        const {decks, navigation} = this.props;

        const deck = Object.entries(decks).find(
            deck => {
                return deck[1].title === navigation.state.params.deckId;
            }
        );

        this.setState({deck: deck[1]});
    }

    componentWillReceiveProps(props) {
        if (props.decks) {
            const {navigation} = this.props;

            const deck = Object.entries(props.decks).find(
                deck => {
                    return deck[1].title === navigation.state.params.deckId;
                }
            );

            this.setState({deck: deck[1]});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.deck &&
                <View style={{flex: 0.8, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={style.deckTitle}>{this.state.deck.title}</Text>
                    <Text style={style.questionCount}>{this.state.deck.questions.length} cards</Text>
                </View>
                }
                {this.state.deck &&
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                        style={[styles.button, style.addCardButton]}
                        onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            {deckId: this.state.deck.title}
                        )}>
                        <Text style={styles.buttonText}>Add card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            {deckId: this.state.deck.title}
                        )}>
                        <Text style={styles.buttonText}>Start quiz</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    deckTitle: {
        fontSize: 24,
        paddingBottom: 6
    },
    questionCount: {
        color: colors.DARK_GRAY,
        fontSize: 18
    },
    addCardButton: {
        backgroundColor: colors.ASPHALT
    }
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Deck);