import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View
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
/* Lodash Imports */
import _set from 'lodash/set';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Color Imports */
import colors from '../../assets/stylesheets/ColorSet1'
/* Redux Imports */

/* Component Imports */


const Form = t.form.Form;
let stylesheet = _cloneDeep(t.form.Form.stylesheet);

stylesheet = {
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
};


const ValidPassword = t.refinement(t.String, (n) => {
    if (n) {
        return validatePassword(n);
    }
});

function validatePassword(password) {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(String(password));
}

class PatientCheckInForm extends React.Component {

    constructor() {
        super();
        this.samePassword = t.refinement(t.String, (s) => {
            return s == this.state.value.newPassword;
        });
        this.state = {
            value: {},
            isCondition: false,
        };
        this.Password = t.struct({
            oldPassword: ValidPassword,
            newPassword: ValidPassword,
            confirmPassword: this.samePassword,
        });
        this.validate = null;
        this.stylesheet = _cloneDeep(stylesheet);
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        console.log(stylesheet, 'stylesheet')
        // this.props.setLoadingFalse();
        // if (this.props.auth.user) {
        //     if (this.props.auth.user.isVerified) {
        //         this.props.navigation.navigate('Home');
        //     } else {
        //         // pass
        //     }
        // }
    }
    // componentWillUnmount() {
    //     this.props.clearError();
    // }

    onChange = (value) => {
        this.setState({ value });
        if (value.confirmPassword != null && value.confirmPassword != '') {
            this.validate = this.refs.form.getValue();
        }
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

    render() {
        const { error, strings } = this.props || {};
        const options = {
            // template: creditCard,
            fields: {
                oldPassword: {
                    keyboardType: 'default',
                    autoFocus: true,
                    secureTextEntry: true,
                    label: `${_get(strings, 'oldPasswordLabel', '')}`,
                    error: `${_get(strings, 'passwordErrorText', '')}`,
                    onSubmitEditing: () => this.refs.form.getComponent('newPassword').refs.input.focus()

                },
                newPassword: {
                    keyboardType: 'default',
                    secureTextEntry: true,
                    label: `${_get(strings, 'newPasswordLabel', '')}`,
                    error: `${_get(strings, 'passwordErrorText', '')}`,
                    onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
                },
                confirmPassword: {
                    keyboardType: 'default',
                    autoFocus: false,
                    secureTextEntry: true,
                    label: `${_get(strings, 'confirmPasswordLabel', '')}`,
                    error: `${_get(strings, 'confirmPasswordErrorText', '')}`,
                    onSubmitEditing: () => this.onPress(),
                },

                mayuk: {
                    keyboardType: 'default',
                    autoFocus: false,
                    secureTextEntry: true,
                    label: `${_get(strings, 'mayuk', '')}`,
                    error: `${_get(strings, 'mayukerror', '')}`,
                    onSubmitEditing: () => this.onPress(),
                },
                

            },
            stylesheet: stylesheet
        };
        return (
            <Container style={[styles.container, { width: '100%' }]}>

                <Header style={{ backgroundColor: colors.secondaryBackgroundColor }} androidStatusBarColor={colors.secondaryBackgroundColor}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <FontAwesome name="chevron-left" size={15} color={colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add New Customer</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome name="search" size={20} color={colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Right>
                </Header>

                <Body style={{ width: '100%' }}>
                    <Content style={{ width: '90%', marginTop: 40 }}>
                        <View >
                            <Form
                                ref="form"
                                options={options}
                                type={this.Password}
                                value={this.state.value}
                                onChange={this.onChange}
                            />
                        </View>
                    </Content>
                    <View style={{ justifyContent: 'center', width: '90%', flexDirection: 'row' }}>
                        <Button onPress={() => this.onPress()} style={styles.button} >
                            <Text >Add Customer</Text>
                        </Button>
                    </View>
                </Body>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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
    }
});

export default PatientCheckInForm;