import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../helpers/storage';
import { receiveDecks } from '../actions';
import { styles } from '../helpers/styles';
import DeckListItem from './DeckListItem';

class DeckList extends Component {
    componentDidMount() {
        const {dispatch} = this.props;

        getDecks().then((decks) => dispatch(receiveDecks(decks)));
    };

    deckPressed = (title) => {
        this.props.navigation.navigate(
            'Deck',
            {deckId: title}
        );
    }

    renderItem = ({item}) => {
        return (
            <DeckListItem item={item} onDeckPressed={this.deckPressed}/>
        );
    };

    render() {
        const {decks} = this.props;
        const deckList = Object.entries(decks).map(
            deck => {
                return {title: deck[1].title, key: deck[1].title, questions: deck[1].questions}
            }
        );

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Deck list</Text>
                <FlatList data={deckList}
                          renderItem={this.renderItem}/>
            </View>
        );
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList);