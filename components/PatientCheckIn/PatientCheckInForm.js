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
import _cloneDeep from 'lodash/cloneDeep';
/* Color Imports */
import { themeManager } from '../../assets/stylesheets/Themes'
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Redux Imports */
import { connect } from 'react-redux';

/* Component Imports */


const Form = t.form.Form;
let stylesheet = _cloneDeep(t.form.Form.stylesheet);



class PatientCheckInForm extends React.Component {

    constructor() {
        super();
        this.state = {
            value: {},
            isCondition: false,
            addNewCustomer: this.getType(1)
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
                loyalteeProgram: t.Boolean,
            });
        }
        else {
            return t.struct({
                firstName: t.String,
                middleName: t.String,
                lastName: t.String,
                state: t.String,
                dob: t.Date,
                loyalteeProgram: t.Boolean,
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

    onPress = () => {
        const value = this.refs.form.getValue();
        let data = {};
        if (value) {
            _set(data, 'id', _get(this.props, 'decodedToken.FleetUser.id', ''));
            _set(data, 'oldPassword', value.oldPassword);
            _set(data, 'newPassword', value.newPassword);
            // this.props.updatePassword(data);
            let url = `/ClientUser/UpdatePassword`;
            let constants = {
                init: 'UPDATE_PASSWORD_INIT',
                success: 'UPDATE_PASSWORD_SUCCESS',
                error: 'UPDATE_PASSWORD_ERROR',
            };
            let identifier = 'UPDATE_PASSWORD';
            let key = 'updatePassword';
            this.props.postData(url, data, constants, identifier, key)
                .then((data) => {
                    this.props.navigation.goBack();
                    this.props.navigation.navigate('Home');
                    showToast('success', `Password Updated Successfully.`, 2000);
                }, (err) => {
                    console.log('error while updating password', err);
                });
        } else {
            this.refs.form.getComponent('oldPassword').refs.input.focus();
        }
    }

    selectCustomerType = (customerType) => {
        this.setState({ addNewCustomer: this.getType(customerType) })
    }

    render() {
        const { error, strings } = this.props || {};
        return (
            <Container style={[this.props.styles.container, { width: '100%' }]}>

                <Header style={{ backgroundColor: this.props.colors.secondaryBackgroundColor }} androidStatusBarColor={this.props.colors.secondaryBackgroundColor}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="chevron-left" size={15} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add New Customer</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome name="search" size={20} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Right>
                </Header>

                <Body style={{ width: '100%' }}>
                    <Content style={{ width: '90%', marginTop: 40 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                            <TouchableHighlight onPress={() => this.selectCustomerType(1)}>
                                <Button style={this.props.styles.button}>
                                    <Text >Medical</Text>
                                </Button>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.selectCustomerType(2)}>
                                <View>
                                    <Text>RECREATIONAL</Text>
                                </View>
                            </TouchableHighlight>
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
                            <Text >Add Customer</Text>
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
    const theme = commonReducer.theme
    return {
        theme
    };
}

export default connect(mapStateToProps)(themeManager(PatientCheckInForm, newColors));;