import React from 'react';
import { Center, Dimensions } from 'react-native'
import t from 'tcomb-form-native';
import { Container, Header, Title, View, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import theme from '../../theme';
import withLocalization from '../hocs/withLocalization';
import withLoadingScreen from '../hocs/withLoadingScreen';
import CustomText from '../../stateless/CustomText';
import withAuth from '../hocs/withAuth';
import _set from 'lodash/set'
import {Axios} from '../../App';
import { postData } from '../../actions/commonAction';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';



const Form = t.form.Form;
const stylesheet = t.form.Form.stylesheet;
const LoginUser = t.struct({
    email: t.String,
    password: t.String,
});
const ContainerWithLoading = withLoadingScreen(Container);


class UsernameScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onPress = () => {
        const value = this.refs.form.getValue();
        const data = {};
        if (value) {
            _set(data, 'email', value.email.toString());
            _set(data, 'password', value.password.toString());
           this.props.dispatch(postData('/login/pos-login',data,'LOGIN','userData')).then((data)=>{
               console.log(data,"data is here")
            this.props.navigation.navigate('Home');
           })
           .catch((err)=>{
            console.log(err)
           })

            // this.props.login(data);
        } else {
            // TODO... this statement below is somehow not working when onPress is called from onSubmitEditing.. when keyboard green tick key is pressed
            this.refs.form.getComponent('email').refs.input.focus();
        }
    }
    render() {
        let { error, strings, appLanguage } = this.props;
        if (!strings) {
            strings = {};
        }
        const options = {
            fields: {
                email: {
                    //placeholder: 'Enter email',
                    autoFocus: true,
                    label: 'Email',
                    stylesheet: this.stylesheet,
                    config: {
                        strings: strings,
                    },
                    onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus(),
                },
                password: {
                    secureTextEntry: !this.state.showPassword,
                    // placeholder: 'Enter Password',
                    returnKeyType: 'done',
                    label: `Password`,
                    stylesheet: this.stylesheet,
                    // config: {
                    //     handlePasswordVisiblity: () => this.handlePasswordVisiblity(),
                    //     strings: strings,
                    // },
                    onSubmitEditing: () => this.onPress(),
                },
            },

        };
        return (
            <ContainerWithLoading style={theme.container} androidStatusBarColor="#00A9E0" iosBarStyle="light-content" isLoading={this.props.isLoading}>
                {/* <Header style={{ backgroundColor: '#00A9E0', borderBottomWidth: 0 }} androidStatusBarColor="#00A9E0">
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => this.props.navigation.navigate('LanguageSelection')}>
                            <Icon name='arrow-back' style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                </Header> */}
                <Content style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: '#DBDBDB' }}>
                    <View style={[theme.centerAlign, { backgroundColor: '#00A9E0', paddingBottom: 60, marginBottom: Dimensions.get('window').height - 230 }]}>
                        {/* <Image source={loginLogo} style={styles.profileImg} /> */}
                    </View>
                    <View style={[theme.cardShape, {
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: '#f3f3f3', margin: 20, marginTop: 100, zIndex: 9999, borderRadius: 5
                    }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 40, paddingTop: 40 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#00A9E0' }}>LOGIN</Text>
                        </View>
                        <View style={[theme.mart15, theme.marL25, theme.marR25]}>
                            <Form
                                ref="form"
                                options={options}
                                type={LoginUser}
                                value={this.state.value}
                                onChange={this.onChange}
                                style={theme.formStyle}
                            />
                        </View>
                        <View style={[theme.mart25]}>
                            <Button style={[theme.buttonLogin, { backgroundColor: '#00A9E0' }]} onPress={() => this.onPress()} full>
                                <Text style={[theme.butttonFixTxt]}>{`${strings.loginLabel}`}</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </ContainerWithLoading>
        )
    }
}

function mapStateToProps(state){
    return {}
}


export default connect(mapStateToProps)(withNavigation(withLocalization(UsernameScreen)));