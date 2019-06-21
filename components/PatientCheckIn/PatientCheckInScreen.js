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
/* Color Imports */
import {themeManager} from '../../assets/stylesheets/Themes'
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Redux Imports */
import { connect } from 'react-redux';

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
            <Container style={this.props.styles.container}>
                <Header style={{ backgroundColor: this.props.colors.secondaryBackgroundColor }} androidStatusBarColor={this.props.colors.secondaryBackgroundColor}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="chevron-left" size={15} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Customer Queue</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('PatientCheckInForm')}>
                            <FontAwesome name="user-plus" size={20} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Right>
                </Header>

                <ScrollView>

                    <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
                        <Content padder>
                            <Card style={this.props.styles.cardStyle}>
                                <View style={{
                                    position: 'absolute',
                                    width: 15,
                                    height: 15,
                                    backgroundColor: this.props.colors.primaryAccentColor,
                                    borderTopLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                }}>
                                </View>
                                <CardItem style={this.props.styles.cardContentStyle}>
                                    <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 11 }}>
                                                <FontAwesome name={'medkit'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} />
                                                <Text style={[this.props.styles.cardTextColor, this.props.styles.queueCardTitle]}>Mayuk Agarwal</Text>
                                            </View>
                                            <FontAwesome name={'trash-o'} size={25} color={this.props.colors.secondaryAccentColor} style={{ flex: 1 }} />
                                        </View>
                                        <View style={this.props.styles.queueCardBasicInfoContainer}>
                                            <View>
                                                <Text style={[this.props.styles.cardTextColor]}>Age</Text>
                                                <Text style={[this.props.styles.cardTextColor]}>24</Text>
                                            </View>
                                            <View>
                                                <Text style={[this.props.styles.cardTextColor]}>Time</Text>
                                                <Text style={[this.props.styles.cardTextColor]}>10:25 AM</Text>
                                            </View>
                                            <View>
                                                <Text style={[this.props.styles.cardTextColor]}>State</Text>
                                                <Text style={[this.props.styles.cardTextColor]}>CA</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: '100%', height: this.state.expanded ? null : 0, overflow: 'hidden', alignItems: 'center', flexDirection: 'column', }}>
                                            <View style={[this.props.styles.queueCardExpandedInfoContainer]}>
                                                <View style={this.props.styles.ExpandedInfo}>
                                                    <Text style={[this.props.styles.cardTextColor]}>Med ID</Text>
                                                    <Text style={[this.props.styles.cardTextColor]}>32423412</Text>
                                                </View>
                                                <View style={this.props.styles.ExpandedInfo}>
                                                    <Text style={[this.props.styles.cardTextColor]}>Id</Text>
                                                    <Text style={[this.props.styles.cardTextColor]}>21356234567</Text>
                                                </View>
                                            </View>
                                            <View style={[this.props.styles.queueCardExpandedInfoContainer]}>
                                                <View style={this.props.styles.ExpandedInfo}>
                                                    <Text style={[this.props.styles.cardTextColor]}>Gram Limit</Text>
                                                    <Text style={[this.props.styles.cardTextColor]}>100 gm</Text>
                                                </View>
                                                <View style={this.props.styles.ExpandedInfo}>
                                                    <Text style={[this.props.styles.cardTextColor]}>Gram Limit</Text>
                                                    <Text style={[this.props.styles.cardTextColor]}>100 gm</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </TouchableOpacity>


                    <Content padder>
                        <Card style={this.props.styles.cardStyle}>
                            <CardItem style={this.props.styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'pagelines'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} />
                                        <Text style={[this.props.styles.cardTextColor, this.props.styles.queueCardTitle]}>Paul Pogba</Text>
                                    </View>
                                    <View style={this.props.styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Age</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>30</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Time</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>11:05 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>State</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>CA</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content padder>
                        <Card style={this.props.styles.cardStyle}>
                            <CardItem style={this.props.styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'pagelines'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} />
                                        <Text style={[this.props.styles.cardTextColor, this.props.styles.queueCardTitle]}>James Milner</Text>
                                    </View>
                                    <View style={this.props.styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Age</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>28</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Time</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>10:15 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>State</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>LA</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>


                    <Content padder>
                        <Card style={this.props.styles.cardStyle}>
                            <CardItem style={this.props.styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'medkit'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} />
                                        <Text style={[this.props.styles.cardTextColor, this.props.styles.queueCardTitle]}>David De Gea</Text>
                                    </View>
                                    <View style={this.props.styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Age</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>29</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Time</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>05:30 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>State</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>NY</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content padder>
                        <Card style={this.props.styles.cardStyle}>
                            <CardItem style={this.props.styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'medkit'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} />
                                        <Text style={[this.props.styles.cardTextColor, this.props.styles.queueCardTitle]}>Marcus Rashford</Text>
                                    </View>
                                    <View style={this.props.styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Age</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>20</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Time</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>10:25 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>State</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>CA</Text>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>

                    <Content padder>
                        <Card style={this.props.styles.cardStyle}>
                            <CardItem style={this.props.styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome name={'pagelines'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} />
                                        <Text style={[this.props.styles.cardTextColor, this.props.styles.queueCardTitle]}>Jesse Lingard</Text>
                                    </View>
                                    <View style={this.props.styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Age</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>24</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Time</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>10:25 AM</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>State</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>CA</Text>
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


function newColors(colors) {
    let styles = {}
    return styles = {
        container: {
            backgroundColor: colors.primaryBackgroundColor
        },
        cardStyle: {
            position: 'relative',
            backgroundColor: colors.primaryCardBackgroundColor,
            marginBottom: 0,
            borderRadius: 10,
            padding: 15,
            borderColor: colors.primaryCardBorderColor
        },
        cardContentStyle: {
            backgroundColor: colors.primaryCardBackgroundColor,
        },
        cardTextColor: {
            color: colors.primaryCardTextColor
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
    }
}

function mapStateToProps(state) {
    const { commonReducer } = state;
    const theme = commonReducer.theme
    return {
        theme
    };
}

export default connect(mapStateToProps)(themeManager(PatientCheckInScreen, newColors));