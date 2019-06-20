import { createStackNavigator } from 'react-navigation';

import UsernameScreen from '../components/auth/UserNameScreen';

// import PasswordScreen from '../components/auth/PasswordScreen';
// import OtpScreen from '../components/auth/OtpScreen';

export default AuthStack = createStackNavigator(
    {
        WhichUser: UsernameScreen,
        // WhatPassword: PasswordScreen,
        // WhatOtp: OtpScreen,
    }, {
        initialRouteName: 'WhichUser',
        navigationOptions: {
            headerVisible: false,
        },
        headerMode: 'none',
    }
);
