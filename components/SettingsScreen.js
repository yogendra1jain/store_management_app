import React from 'react';
import { StyleSheet, ScrollView } from 'react-native'
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Title,
    Left,
    Right,
    Center,
    Button,
    Icon,
} from 'native-base';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */

/* Redux Imports */

/* Component Imports */


class HomeContentScreen extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Text>Settings</Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#161561"
    },

    cardStyle: {
        backgroundColor: '#2A2B7E',
        marginBottom: 2,
        padding: 20,
    },
    cardContentStyle: {
        backgroundColor: '#2A2B7E',
    },
    cardTextColor: {
        color: '#fff'
    }

});

export default HomeContentScreen;