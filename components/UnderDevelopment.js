import React from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native'
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
/* Assets import */
import underConstructionImage from '../assets/images/underConstruction.png'
/* Redux Imports */

/* Component Imports */


class UnderDevelopment extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Container style={[styles.container, {width:'100%'}]}>
                <Image
                    style={{ width:350, height:350 }}
                    source={ underConstructionImage }
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#161561",
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

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

export default UnderDevelopment;