import React from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native'
import { Container } from 'native-base';
/* Lodash Imports */
import _get from 'lodash/get';
/* Color Imports */
import { themeManager } from '../assets/stylesheets/Themes'
/* Assets import */
import underConstructionImage from '../assets/images/underConstruction.png'
/* Redux Imports */
import { connect } from 'react-redux';
/* Component Imports */


class UnderDevelopment extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Container style={[this.props.styles.container, { width: '100%' }]}>
                <Image
                    style={{ width: 350, height: 350 }}
                    source={underConstructionImage}
                />
            </Container>
        );
    }
}


function newColors(colors) {
    let styles = {}
    return styles = {
        container: {
            backgroundColor: colors.primaryBackgroundColor,
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
}

function mapStateToProps(state) {
    const { commonReducer } = state;
    const theme = commonReducer.theme
    return {
        theme
    };
}

export default connect(mapStateToProps)(themeManager(UnderDevelopment, newColors));