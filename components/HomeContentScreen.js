import React from 'react';
import { StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
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
    Button,
    Icon,

} from 'native-base';

import { withNavigation } from 'react-navigation';
/* Lodash Imports */
import _get from 'lodash/get';
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Color Imports */
import { themeManager } from '../assets/stylesheets/Themes'
/* Redux Imports */
import { connect } from 'react-redux';
/* Global Imports */
import withAuth from './hocs/withAuth';

/* Component Imports */



class HomeContentScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container style={this.props.styles.container}>
                <Header style={{ backgroundColor: this.props.colors.secondaryBackgroundColor }} androidStatusBarColor={this.props.colors.secondaryBackgroundColor}>
                    <Body style={{ paddingLeft: 10 }}>
                        <Title>Store Management</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome name="user" size={20} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                        <Button transparent>
                            <Icon name="more" />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('PatientCheckInScreen')}>
                        <Content padder >
                            <Card style={this.props.styles.cardStyle} >
                                <CardItem style={this.props.styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'group'} size={60} color={this.props.colors.primaryCardTextColor} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[this.props.styles.cardTextColor, { fontSize: 18, fontWeight: 'bold' }]}>Patient Check In</Text>
                                        </Content>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('InventoryAuditScreen')}>
                        <Content padder>
                            <Card style={[this.props.styles.cardStyle]}>
                                <CardItem style={this.props.styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'clipboard'} size={60} color={this.props.colors.primaryCardTextColor} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[this.props.styles.cardTextColor, { fontWeight: 'bold', fontSize: 18 }]}>Inventory Audit</Text>
                                            <Text style={{ color: '#e0a826', fontSize: 10 }}>Under Construction</Text>
                                        </Content>
                                    </Body>

                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('DeliveriesManagementScreen')}>
                        <Content padder>
                            <Card style={this.props.styles.cardStyle}>
                                <CardItem style={this.props.styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'truck'} size={60} color={this.props.colors.primaryCardTextColor} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[this.props.styles.cardTextColor, { fontWeight: 'bold', fontSize: 18 }]}>Deliveries Monitoring</Text>
                                            <Text style={{ color: '#e0a826', fontSize: 10 }}>Under Construction</Text>
                                        </Content>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('OnlineOrderScreen')}>
                        <Content padder>
                            <Card style={this.props.styles.cardStyle}>
                                <CardItem style={this.props.styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'tasks'} size={60} color={this.props.colors.primaryCardTextColor} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[this.props.styles.cardTextColor, { fontWeight: 'bold', fontSize: 18 }]}>Online Orders</Text>
                                            <Text style={{ color: '#e0a826', fontSize: 10 }}>Under Construction</Text>
                                        </Content>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableHighlight>

                </ScrollView>
            </Container>
        );
    }
}

function newColors(colors) {
    let styles = {}
    return styles = {
        container: {
            backgroundColor: colors.primaryBackgroundColor
        },
        cardStyle: {
            backgroundColor: colors.primaryCardBackgroundColor,
            marginBottom: 1,
            borderRadius: 10,
            padding: 20,
            borderColor: colors.primaryCardBorderColor
        },
        cardContentStyle: {
            backgroundColor: colors.primaryCardBackgroundColor,
        },
        cardTextColor: {
            color: colors.primaryCardTextColor
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

export default connect(mapStateToProps)(themeManager((withAuth(true)(withNavigation(HomeContentScreen))), newColors));