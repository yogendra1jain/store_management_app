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
} from 'react-native';
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
    ListItem,
    Radio,
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
import { setCustomData } from '../../actions/commonAction';

/* Component Imports */


class SettingsScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        this.setState({
            theme: _get(this.props, 'theme', 'dark')
        })
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    radioPressed = (theme) => {
        this.setState({
            theme
        })
        this.props.dispatch(setCustomData(theme, { init: 'APP_THEME_CUSTOM_INIT' }, 'APP_THEME', 'theme'))

    }

    render() {
        return (
            <Container style={[this.props.styles.container, { width: '100%' }]}>
                <Header style={{ backgroundColor: this.props.colors.secondaryBackgroundColor }} androidStatusBarColor={this.props.colors.secondaryBackgroundColor}>
                    <Body style={{ paddingLeft: 10 }}>
                        <Title>Settings</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome name="search" size={20} color={this.props.colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Right>
                </Header>

                <ScrollView style={{ paddingTop: 20 }}>
                    <Content padder style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: this.props.colors.tertiaryBackgroundColor }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <View style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: this.props.colors.tertiaryBackgroundColor, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name="image" size={20} color={this.props.colors.secondaryBackgroundTextColor} />
                                </View>
                                <View>
                                    <Text style={{ color: this.props.colors.primaryBackgroundTextColor, paddingLeft: 20, fontSize: 18 }}>Change Theme</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: this.state.expanded ? null : 0, overflow: 'hidden', flexDirection: 'column', paddingLeft: 70 }}>
                            <View style={{ paddingLeft: 40, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Left>
                                    <Text style={{ color: this.props.colors.primaryBackgroundTextColor, fontSize: 15 }}>Dark Theme</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        color={this.props.colors.primaryAccentColor}
                                        selectedColor={this.props.colors.primaryAccentColor}
                                        selected={this.state.theme == 'light' ? false : true}
                                        style={{ paddingRight: 20 }}
                                        onPress={() => this.radioPressed('dark')}
                                    />
                                </Right>
                            </View>
                            <View style={{ paddingLeft: 40, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Left>
                                    <Text style={{ color: this.props.colors.primaryBackgroundTextColor, fontSize: 15 }}>Light Theme</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        color={this.props.colors.primaryAccentColor}
                                        selectedColor={this.props.colors.primaryAccentColor}
                                        selected={this.state.theme == 'light' ? true : false}
                                        style={{ paddingRight: 20 }}
                                        onPress={() => this.radioPressed('light')}
                                    />
                                </Right>
                            </View>
                        </View>
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

    }
}

function mapStateToProps(state) {
    const { commonReducer } = state;
    const theme = commonReducer.theme
    return {
        theme
    };
}

export default connect(mapStateToProps)(themeManager(SettingsScreen, newColors));