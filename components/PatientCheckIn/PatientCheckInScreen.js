import React from 'react';
import moment from "moment";
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
import { themeManager } from '../../assets/stylesheets/Themes'
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Redux Imports */
import { connect } from 'react-redux';
import { postData } from '../../actions/commonAction'
/* Component Imports */


class PatientCheckInScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            expanded: ''
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    changeLayout = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (this.state.expanded == id) {
            this.setState({ expanded: '' });
        }
        else {
            this.setState({ expanded: id });
        }

    }

    componentDidMount() {
        this.getQueueList()
    }

    getQueueList = () => {
        let url = 'Get/CustomerQueue/Active'
        let data = {
            id: '64e3ee71-807f-4853-b31c-e45060f3f2fb'
        }
        let identifier = 'FETCH_CUSTOMER_QUEUE'
        let key = 'CustomerQueue'
        this.props.dispatch(postData(url, data, identifier, key))
            .then((data) => {
                console.log(data, 'customerData')
            }, (err) => {
                console.log('error while fetching fleet user list list', err);
            });
    }

    populateCustomerQueue = () => {
        let customerData = _get(this.props, 'CustomerQueue.queueItems', [])
        let view = []
        customerData.map((data, index) => {
            view.push(
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.changeLayout(data.customer.id)} key={data.customer.id}>
                    <Content padder>
                        <Card style={this.props.styles.cardStyle}>
                            {
                                _get(data, 'status', 0) == 2 ?
                                    <View style={{
                                        position: 'absolute',
                                        width: 15,
                                        height: 15,
                                        backgroundColor: this.props.colors.primaryAccentColor,
                                        borderTopLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}></View> : null
                            }
                            <CardItem style={this.props.styles.cardContentStyle}>
                                <Body style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 11 }}>
                                            {
                                                _get(data, 'customer.customerType', 1) == 1 ?
                                                    <FontAwesome name={'medkit'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} /> :
                                                    <FontAwesome name={'pagelines'} size={25} color={this.props.colors.primaryCardTextColor} style={{ flex: 1 }} />
                                            }

                                            <Text style={[this.props.styles.cardTextColor, this.props.styles.queueCardTitle]}>{_get(data, 'customer.customer.firstName', '')} {_get(data, 'customer.customer.lastName', '')}</Text>
                                        </View>
                                        <FontAwesome name={'trash-o'} size={25} color={this.props.colors.secondaryAccentColor} style={{ flex: 1 }} />
                                    </View>
                                    <View style={this.props.styles.queueCardBasicInfoContainer}>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Age</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>{moment().diff(_get(data, 'customer.dob', 0), 'years')} yrs</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>Time</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>{moment(_get(data, 'checkIn.seconds', 0) * 1000).format('h:mm a')}</Text>
                                        </View>
                                        <View>
                                            <Text style={[this.props.styles.cardTextColor]}>State</Text>
                                            <Text style={[this.props.styles.cardTextColor]}>{_get(data, 'customer.billingAddress.state', '...')}</Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '100%', height: (this.state.expanded == data.customer.id) ? null : 0, overflow: 'hidden', alignItems: 'center', flexDirection: 'column', }}>
                                        <View style={[this.props.styles.queueCardExpandedInfoContainer]}>
                                            <View style={this.props.styles.ExpandedInfo}>
                                                <Text style={[this.props.styles.cardTextColor]}>Med ID</Text>
                                                <Text style={[this.props.styles.cardTextColor]}>{_get(data, 'customer.medicalLicenseNumber', '...')}</Text>
                                            </View>
                                            <View style={this.props.styles.ExpandedInfo}>
                                                <Text style={[this.props.styles.cardTextColor]}>Id</Text>
                                                <Text style={[this.props.styles.cardTextColor]}>{data.customer.id}</Text>
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
            )
        })

        return (
            <ScrollView>
                {view}
            </ScrollView>
        )
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
                    {this.populateCustomerQueue()}
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
    const CustomerQueue = commonReducer.CustomerQueue
    return {
        theme,
        CustomerQueue,
    };
}

export default connect(mapStateToProps)(themeManager(PatientCheckInScreen, newColors));