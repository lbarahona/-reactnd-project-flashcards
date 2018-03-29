import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class DeckListItem extends Component {
    state = {
        rotateX: new Animated.Value(0),
        opacity: new Animated.Value(1)
    };

    deckPressed(title) {
        Animated.parallel([
            Animated.timing(this.state.rotateX, {
                toValue: 360,
                duration: 750
            })
        ]).start(() => {
            this.setState({rotateX: new Animated.Value(0), opacity: new Animated.Value(1)});
            this.props.onDeckPressed(title);
        });
    }

    render() {
        const {item} = this.props;

        return (
            <TouchableOpacity
                style={[style.deck]}
                onPress={() => this.deckPressed(item.title)}>

                <Animated.View style={{
                    opacity: this.state.opacity,
                    transform: [
                        {
                            rotateX: this.state.rotateX.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg']
                            })
                        },
                        {perspective: 1000}
                    ]
                }}>
                    <Text style={style.deckTitle}>{item.title}</Text>
                    <Text>{item.questions.length} cards</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    deck: {
        borderTopColor: '#cccccc',
        borderTopWidth: 1,
        paddingBottom: 18,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 18
    },
    deckTitle: {
        fontSize: 20,
        paddingBottom: 3
    }
});