import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableHighlight
} from 'react-native';
import t from 'tcomb-form-native';
// import { Text } from 'react-native-elements';
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
import moment from 'moment';
/* Lodash Imports */
import _set from 'lodash/set';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _cloneDeep from 'lodash/cloneDeep';
/* Color Imports */
import { themeManager } from '../../assets/stylesheets/Themes'
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Redux Imports */
import { connect } from 'react-redux';
import { showToast } from '../../utils';
import { postData } from '../../actions/commonAction';

/* Component Imports */


const Form = t.form.Form;
let stylesheet = _cloneDeep(t.form.Form.stylesheet);



class PatientCheckInForm extends React.Component {

    constructor() {
        super();
        this.state = {
            value: {},
            isCondition: false,
            addNewCustomer: this.getType(2),
            selectedCustomerType: 2
        };
        this.options = {
            fields: {
                dob: {
                    label: 'Date Of Birth',
                    mode: 'date',
                    config: {
                        format: (date) => moment(date).format('MM-DD-YYYY'),
                    }, // display the Date field as a DatePickerAndroid
                },
                mmrCardExpiration: {
                    label: 'MMR Card Expiration',
                    mode: 'date',
                    config: {
                        format: (date) => moment(date).format('MM-DD-YYYY'),
                    }, // display the Date field as a DatePickerAndroid
                }
            }
        };
        this.validate = null;
    }

    static navigationOptions = {
        header: null,
    };
    getType = (customerType) => {
        if (customerType == 2) {
            return t.struct({
                firstName: t.String,
                middleName: t.String,
                lastName: t.String,
                state: t.String,
                dob: t.Date,
                loyalty: t.Boolean,
            });
        }
        else {
            return t.struct({
                firstName: t.String,
                middleName: t.String,
                lastName: t.String,
                state: t.String,
                dob: t.Date,
                loyalty: t.Boolean,
                medicalCardNumber: t.String,
                mmrCardExpiration: t.Date,
                plantCount: t.Number,
                gramLimit: t.Number
            });
        }
    }

    onChange = (value) => {
        this.setState({ value });
    }
    addCustomerToQueue = (customer) => {
        let customerQueue = this.props.customerQueue
        if (_find(customerQueue, customerQueue => customerQueue.customer.id == customer.id)) {
            showToast('error', `Customer Already in Queue.`, 2000);
        }
        else {
            let dobDiff = moment().diff(_get(customer, 'dob'), 'years')
            let medCarfDiff = moment().diff(_get(customer, 'medicalLicenseExpiration'), 'days')
            if (customer.customerType == 1) {
                if (dobDiff < 18) {
                    showToast('error', `Customer Illegal Age - ${dobDiff} yrs`, 2000);
                    return
                }
                else if (medCarfDiff >= 0) {
                    showToast('error', `Customer Medical Card Expired`, 2000);
                    return
                }
            }
            else if (customer.customerType == 2 && dobDiff < 21) {
                showToast('error', `Customer Illegal Age - ${dobDiff} yrs`, 2000);
                return
            }
            let reqObj = {
                storeId: '64e3ee71-807f-4853-b31c-e45060f3f2fb',
                customerId: customer.id,
                status: 1,
                checkIn: {
                    seconds: parseInt(Date.now() / 1000)
                },
            }
            this.props.dispatch(postData('Add/CustomerQueue', reqObj, 'ADD_CUSTOMER_TO_QUEUE', 'customerAddedInQueue'))
                .then((data) => {
                    this.props.navigation.goBack();
                    showToast('success', `Customer Created Succesfully Successfully.`, 2000);
                })
        }
    }

    onPress = () => {
        const value = this.refs.form.getValue();
        let data = {};
        if (value) {
            _set(data, 'customer.firstName', value.firstName);
            _set(data, 'customer.middleName', value.middleName);
            _set(data, 'customer.lastName', value.lastName);
            _set(data, 'billingAddress.state', value.state);
            _set(data, 'dob', value.dob);
            _set(data, 'loyalty', value.loyalty);
            _set(data, 'retailerId', 'b8cac8d1-7af1-4f73-945d-90f79bcdad61');
            _set(data, 'customerType', this.state.selectedCustomerType)
            // this.props.updatePassword(data);
            let url = `/Customer/Create`;
            let identifier = 'CUSTOMER_CREATE';
            let key = 'createCustomer';
            this.props.dispatch(postData(url, data, identifier, key))
                .then((data) => {
                    console.log(data, "datadata")
                    this.addCustomerToQueue(data);
                }, (err) => {
                    console.log('Error in Creating customer', err);
                });
        } else {
            this.refs.form.getComponent('oldPassword').refs.input.focus();
        }
    }

    selectedCustomerType = (customerType) => {
        this.setState({ addNewCustomer: this.getType(customerType), selectedCustomerType: customerType })
    }
    render() {
        const { error, strings } = this.props || {};
        return (
            <Container style={[this.props.styles.container, { width: '100%' }]}>

                <Header style={{ backgroundColor: this.props.colors.secondaryBackgroundColor }} androidStatusBarColor={this.props.colors.secondaryBackgroundColor}>
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="chevron-left" size={15} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 4 }}>
                        <Title>Add New Customer</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                            <FontAwesome name="search" size={20} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Right>
                </Header>

                <Body style={{ width: '100%' }}>
                    <Content style={{ width: '90%', marginTop: 40 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                            <View>
                                <Button style={this.state.selectedCustomerType == 1 ? this.props.styles.buttonTabActive : this.props.styles.buttonTabInActive} onPress={() => this.selectedCustomerType(1)}>
                                    <Text style={this.state.selectedCustomerType == 1 ? { color: this.props.colors.primaryButtonTextColor } : { color: this.props.colors.secondaryButtonTextColor }} >Medical</Text>
                                </Button>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Button style={this.state.selectedCustomerType == 2 ? this.props.styles.buttonTabActive : this.props.styles.buttonTabInActive} onPress={() => this.selectedCustomerType(2)}>
                                    <Text style={this.state.selectedCustomerType == 2 ? { color: this.props.colors.primaryButtonTextColor } : { color: this.props.colors.secondaryButtonTextColor }} >RECREATIONAL</Text>
                                </Button>
                            </View>

                        </View>
                        <View >
                            <Form
                                ref="form"
                                type={this.state.addNewCustomer}
                                value={this.state.value}
                                options={this.options}
                                onChange={this.onChange}
                            />
                        </View>
                    </Content>
                    <View style={{ justifyContent: 'center', width: '90%', flexDirection: 'row' }}>
                        <Button onPress={() => this.onPress()} style={this.props.styles.button} >
                            <Text style={{ color: this.props.colors.primaryButtonTextColor }}>Add Customer</Text>
                        </Button>
                    </View>
                </Body>
            </Container>
        );
    }
}

function newColors(colors) {
    let styles = {}
    return styles = {
        container: {
            backgroundColor: colors.primaryBackgroundColor,
        },
        cardStyle: {
            position: 'relative',
            backgroundColor: colors.primaryCardBackgroundColor,
            marginBottom: 1,
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
        },

        button: {
            backgroundColor: colors.primaryButtonColor,
            width: '100%',
            height: 53,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
            marginBottom: 20
        },
        buttonTabActive: {
            backgroundColor: colors.primaryButtonColor,
            width: '100%',
            height: 40,
            borderRadius: 20,
            marginTop: 30,
            marginBottom: 20
        },
        buttonTabInActive: {
            backgroundColor: colors.secondaryButtonColor,
            borderColor: colors.secondaryButtonBorderColor,
            borderWidth: 1,
            width: '100%',
            height: 40,
            borderRadius: 20,
            marginTop: 30,
            marginBottom: 20
        },
        stylesheet: {
            ...stylesheet,
            textbox: {
                normal: {
                    borderColor: colors.normalTextfieldColor,
                    borderRadius: 6,
                    borderWidth: 1,
                    color: colors.normalTextfieldColor,
                    fontSize: 17,
                    height: 36,
                    marginBottom: 5,
                    paddingHorizontal: 7,
                    paddingVertical: 0,
                }
            },
            controlLabel: {
                normal: {
                    color: colors.normalTextfieldColor,
                    fontSize: 17,
                    marginBottom: 7,
                    fontWeight: '500'
                },
                error: {
                    color: colors.errorTextfieldColor,
                    fontSize: 17,
                    marginBottom: 7,
                    fontWeight: '500'
                }
            }
        }
    }
}

function mapStateToProps(state) {
    const { commonReducer } = state;
    const theme = commonReducer.theme;
    const CustomerQueue = commonReducer.CustomerQueue.queueItems;
    return {
        theme,
        CustomerQueue
    };
}

export default connect(mapStateToProps)(themeManager(PatientCheckInForm, newColors));;