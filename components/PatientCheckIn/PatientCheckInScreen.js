import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    LayoutAnimation,
    Platform,
    UIManager,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'
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
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Redux Imports */

/* Component Imports */


class PatientCheckInScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: '#161561', borderBottomColor: '#fff' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Customer Queue</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome name="user-plus" size={20} color={'white'} />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>

                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
                        <Content padder>
                            <Card style={styles.cardStyle}>
                                <View style={{
                                    position: 'absolute',
                                    width: 15,
                                    height: 15,
                                    backgroundColor: '#59BBF8',
                                    borderTopLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                }}>
                                </View>
                                <CardItem style={styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"space-between" }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 11 }}>
                                                <FontAwesome name={'medkit'} size={25} color={'white'} style={{ flex: 1 }} />
                                                <Text style={[styles.cardTextColor, styles.queueCardTitle]}>Mayuk Agarwal</Text>
                                            </View>
                                            <FontAwesome name={'trash-o'} size={25} color={'#0DD3D7'} style={{ flex: 1 }} />
                                        </View>
                                        <View style={styles.queueCardBasicInfoContainer}>
                                            <View>
                                                <Text style={[styles.cardTextColor]}>Age</Text>
                                                <Text style={[styles.cardTextColor]}>24</Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.cardTextColor]}>Time</Text>
                                                <Text style={[styles.cardTextColor]}>10:25 AM</Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.cardTextColor]}>State</Text>
                                                <Text style={[styles.cardTextColor]}>CA</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: '100%', height: this.state.expanded ? null : 0, overflow: 'hidden', alignItems: 'center', flexDirection: 'column', }}>
                                            <View style={[styles.queueCardExpandedInfoContainer]}>
                                                <View style={styles.ExpandedInfo}>
                                                    <Text style={[styles.cardTextColor]}>Med ID</Text>
                                                    <Text style={[styles.cardTextColor]}>32423412</Text>
                                                </View>
                                                <View style={styles.ExpandedInfo}>
                                                    <Text style={[styles.cardTextColor]}>Id</Text>
                                                    <Text style={[styles.cardTextColor]}>21356234567</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.queueCardExpandedInfoContainer]}>
                                                <View style={styles.ExpandedInfo}>
                                                    <Text style={[styles.cardTextColor]}>Gram Limit</Text>
                                                    <Text style={[styles.cardTextColor]}>100 gm</Text>
                                                </View>
                                                <View style={styles.ExpandedInfo}>
                                                    <Text style={[styles.cardTextColor]}>Gram Limit</Text>
                                                    <Text style={[styles.cardTextColor]}>100 gm</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableOpacity>


                    <Content padder>
                        <Card style={styles.cardStyle}>
                            <CardItem style={styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'pagelines'} size={25} color={'white'} style={{ flex: 1 }} />
                                        <Text style={[styles.cardTextColor, styles.queueCardTitle]}>Paul Pogba</Text>
                                    </View>
                                    <View style={styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Age</Text>
                                            <Text style={[styles.cardTextColor]}>30</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Time</Text>
                                            <Text style={[styles.cardTextColor]}>11:05 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>State</Text>
                                            <Text style={[styles.cardTextColor]}>CA</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content padder>
                        <Card style={styles.cardStyle}>
                            <CardItem style={styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'pagelines'} size={25} color={'white'} style={{ flex: 1 }} />
                                        <Text style={[styles.cardTextColor, styles.queueCardTitle]}>James Milner</Text>
                                    </View>
                                    <View style={styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Age</Text>
                                            <Text style={[styles.cardTextColor]}>28</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Time</Text>
                                            <Text style={[styles.cardTextColor]}>10:15 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>State</Text>
                                            <Text style={[styles.cardTextColor]}>LA</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>


                    <Content padder>
                        <Card style={styles.cardStyle}>
                            <CardItem style={styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'medkit'} size={25} color={'white'} style={{ flex: 1 }} />
                                        <Text style={[styles.cardTextColor, styles.queueCardTitle]}>David De Gea</Text>
                                    </View>
                                    <View style={styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Age</Text>
                                            <Text style={[styles.cardTextColor]}>29</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Time</Text>
                                            <Text style={[styles.cardTextColor]}>05:30 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>State</Text>
                                            <Text style={[styles.cardTextColor]}>NY</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content padder>
                        <Card style={styles.cardStyle}>
                            <CardItem style={styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'medkit'} size={25} color={'white'} style={{ flex: 1 }} />
                                        <Text style={[styles.cardTextColor, styles.queueCardTitle]}>Marcus Rashford</Text>
                                    </View>
                                    <View style={styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Age</Text>
                                            <Text style={[styles.cardTextColor]}>20</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Time</Text>
                                            <Text style={[styles.cardTextColor]}>10:25 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>State</Text>
                                            <Text style={[styles.cardTextColor]}>CA</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content padder>
                        <Card style={styles.cardStyle}>
                            <CardItem style={styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'pagelines'} size={25} color={'white'} style={{ flex: 1 }} />
                                        <Text style={[styles.cardTextColor, styles.queueCardTitle]}>Jesse Lingard</Text>
                                    </View>
                                    <View style={styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Age</Text>
                                            <Text style={[styles.cardTextColor]}>24</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>Time</Text>
                                            <Text style={[styles.cardTextColor]}>10:25 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardTextColor]}>State</Text>
                                            <Text style={[styles.cardTextColor]}>CA</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>


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
        position: 'relative',
        backgroundColor: '#2A2B7E',
        marginBottom: 1,
        borderRadius: 10,
        padding: 15,
        borderColor: '#2A2B7E'
    },
    cardContentStyle: {
        backgroundColor: '#2A2B7E',
    },
    cardTextColor: {
        color: '#fff'
    },

    queueCardTitle: {
        fontSize: 18,
        flex: 7,
        fontWeight: 'bold'
    },
    queueCardBasicInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 25,
        width: '100%'
    },


    queueCardExpandedInfoContainer: {
        flexDirection: 'row',
        paddingTop: 15,
        width: '80%'
    },
    ExpandedInfo: {
        width: '50%'
    }





});

export default PatientCheckInScreen;