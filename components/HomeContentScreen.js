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
/* Lodash Imports */
import _get from 'lodash/get';
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
                <Header style={{ backgroundColor: '#161561', borderBottomColor: '#fff' }}>
                    <Body style={{ paddingLeft: 10 }}>
                        <Title>Store Management</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome name="user" size={20} color={'white'} />
                        </Button>
                        <Button transparent>
                            <Icon name="more" />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('PatientCheckInScreen')}>
                        <Content padder >
                            <Card style={styles.cardStyle} >
                                <CardItem style={styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'group'} size={60} color={'white'} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[styles.cardTextColor, { fontSize: 18, fontWeight: 'bold' }]}>Patient Check In</Text>
                                        </Content>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('InventoryAuditScreen')}>
                        <Content padder>
                            <Card style={[styles.cardStyle]}>
                                <CardItem style={styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'clipboard'} size={60} color={'white'} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[styles.cardTextColor, { fontWeight: 'bold', fontSize: 18 }]}>Inventory Audit</Text>
                                            <Text style={{ color: '#F9C533', fontSize: 10 }}>Under Construction</Text>
                                        </Content>
                                    </Body>

                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('DeliveriesManagementScreen')}>
                        <Content padder>
                            <Card style={styles.cardStyle}>
                                <CardItem style={styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'truck'} size={60} color={'white'} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[styles.cardTextColor, { fontWeight: 'bold', fontSize: 18 }]}>Deliveries Monitoring</Text>
                                            <Text style={{ color: '#F9C533', fontSize: 10 }}>Under Construction</Text>
                                        </Content>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('OnlineOrderScreen')}>
                        <Content padder>
                            <Card style={styles.cardStyle}>
                                <CardItem style={styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'tasks'} size={60} color={'white'} style={{ width: '30%' }} />
                                        <Content style={{ width: '70%' }}>
                                            <Text style={[styles.cardTextColor, { fontWeight: 'bold', fontSize: 18 }]}>Online Orders</Text>
                                            <Text style={{ color: '#F9C533', fontSize: 10 }}>Under Construction</Text>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#161561"
    },
    cardStyle: {
        backgroundColor: '#2A2B7E',
        marginBottom: 1,
        borderRadius: 10,
        padding: 20,
        borderColor: '#2A2B7E'
    },
    cardContentStyle: {
        backgroundColor: '#2A2B7E',
    },
    cardTextColor: {
        color: '#fff'
    }

});

export default HomeContentScreen;