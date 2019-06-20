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
import colors from '../../assets/stylesheets/ColorSet1'
/* Icons Import */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/* Redux Imports */

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

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        return (
            <Container style={[styles.container, { width: '100%' }]}>
                <Header style={{ backgroundColor: colors.secondaryBackgroundColor }} androidStatusBarColor={colors.secondaryBackgroundColor}>
                    <Body style={{ paddingLeft: 10 }}>
                        <Title>Settings</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <FontAwesome name="search" size={20} color={colors.secondaryBackgroundTextColor} />
                        </Button>
                    </Right>
                </Header>

                <ScrollView style={{ paddingTop: 20 }}>
                    <Content padder style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#2A2B7E' }}>
                        <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <View style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#2A2B7E', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name="image" size={20} color={colors.secondaryBackgroundTextColor} />
                                </View>
                                <View>
                                    <Text style={{ color: '#fff', paddingLeft: 20, fontSize: 18 }}>Change Theme</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: this.state.expanded ? null : 0, overflow: 'hidden', flexDirection: 'column', paddingLeft: 70 }}>
                            <View style={{ paddingLeft: 40, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Left>
                                    <Text style={{ color: '#ffffff5e', fontSize: 15 }}>Dark Theme</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        color={colors.primaryAccentColor}
                                        selectedColor={colors.primaryAccentColor}
                                        selected={true}
                                        style={{paddingRight:20}}
                                    />
                                </Right>
                            </View>
                            <View style={{ paddingLeft: 40, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Left>
                                    <Text style={{ color: '#ffffff5e', fontSize: 15 }}>Light Theme</Text>
                                </Left>
                                <Right>
                                    <Radio
                                        color={colors.primaryAccentColor}
                                        selectedColor={colors.primaryAccentColor}
                                        selected={false}
                                        style={{paddingRight:20}}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryBackgroundColor
    },

});

export default SettingsScreen;