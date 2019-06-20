import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
/* Color Imports */
import colors from '../assets/stylesheets/ColorSet1';
/* Components Import */
import HomeContentScreen from '../components/HomeContentScreen';
import PatientCheckInScreen from '../components/PatientCheckIn/PatientCheckInScreen';
import PatientCheckInForm from '../components/PatientCheckIn/PatientCheckInForm';
import UnderDevelopment from '../components/UnderDevelopment';
import SettingsScreen from '../components/Settings/SettingsScreen';


const AppStack = createStackNavigator(
  {
    Home: HomeContentScreen,

    // Patient CheckIn screens
    PatientCheckInScreen: PatientCheckInScreen,
    PatientCheckInForm: PatientCheckInForm,

    // Inventory Audit screens
    InventoryAuditScreen: UnderDevelopment,

    // Deliveries Management screens
    DeliveriesManagementScreen: UnderDevelopment,

    // Online Order screens
    OnlineOrderScreen: UnderDevelopment,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,

    },
  }
);

// * To Hide Tabs in a stack view
AppStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "PatientCheckInForm") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible
  };
};

const SettingsAppStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Settings',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

// const SettingsStack = createStackNavigator({
//     UserAccount: UserAccountScreen,
//     ChangePasswordScreen: ChangePasswordScreen,
//     EditUserProfile: EditUserProfileScreen,
//   });


// const TasksStack = createStackNavigator({
//     TaskListScreen: TaskListScreen,
//     TaskDetailScreen: TaskDetailScreen,
//     LocationMap: LocationMap,
//     LocationA: LocationA,
// });

// const ServiceStack = createStackNavigator({
//   ServiceTicketHome: ServiceTicketHome,
//   NewTicketScreen: NewTicketScreen,
//   ScheduleMaintenanceScreen: ScheduleMaintenanceScreen,
//   OtherTicketScreen: OtherTicketScreen,
//   ServiceTicketListScreen: ServiceTicketListScreen,
// });
// const ContactPersonStack = createStackNavigator({
//   ContactPersonHome: ContactPersonHome,
// });


// class IconWithBadge extends React.Component {
//   render() {
//     const { name, badgeCount, color, size } = this.props;
//     return (
//       <View style={{ width: 24, height: 24, margin: 5, backgroundColor: color }}>
//         <Image source={serviceImg} style={{ width: 50, height: 50 }} />
//         {/* <Ionicons name={name} size={size} color={color} /> */}
//         {badgeCount > 0 && (
//           <View
//             style={{
//               // /If you're using react-native < 0.57 overflow outside of the parent
//               // will not work on Android, see https://git.io/fhLJ8
//               position: 'absolute',
//               right: -6,
//               top: -3,
//               backgroundColor: 'red',
//               borderRadius: 6,
//               width: 12,
//               height: 12,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
//               {badgeCount}
//             </Text>
//           </View>
//         )}
//       </View>
//     );
//   }
// }

// const HomeIconWithBadge = (props) => {
//   // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
//   return <IconWithBadge {...props} badgeCount={3} />;
// };

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `md-home${focused ? '' : ''}`;
    // We want to add badges to home tab icon
    // IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Settings') {
    iconName = `ios-options${focused ? '' : ''}`;
  } else if (routeName === 'Tasks') {
    iconName = `tasks${focused ? '' : ''}`;
    IconComponent = FontAwesome;
  } else if (routeName === 'Services') {
    iconName = `screwdriver`;
    IconComponent = MaterialCommunityIcons;
  } else if (routeName === 'ContactPerson') {
    iconName = `contact-phone${focused ? '' : ''}`;
    IconComponent = MaterialIcons;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const TabStack = createBottomTabNavigator(
  {
    Home: AppStack,
    Settings: SettingsAppStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: colors.activeColor,
      inactiveTintColor: colors.inactiveColor,
      style: {
        backgroundColor: colors.secondaryBackgroundColor,
      }
    },
  }
);
export default TabStack;
