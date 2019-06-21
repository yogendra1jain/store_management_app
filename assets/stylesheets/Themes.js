import React from 'react';

export function themeManager(WrappedComponent, StylesSheetCreatorFunction) {

    const DarkTheme = {
        primaryBackgroundColor: '#161561',
        primaryBackgroundTextColor: '#ffffff',

        secondaryBackgroundColor: '#161561',
        secondaryBackgroundTextColor: '#ffffff',

        tertiaryBackgroundColor: '#2A2B7E',
        secondaryBackgroundTextColor: '#ffffff',
    
        primaryCardBackgroundColor: '#2A2B7E',
        primaryCardBorderColor: '#2A2B7E',
        primaryCardTextColor: '#ffffff',

        primaryButtonColor: '#4648BF',
        primaryButtonTextColor: '#ffffff',

        secondaryButtonColor: '#161561',
        secondaryButtonTextColor: '#ffffff',
        secondaryButtonBorderColor: '#ffffff',

        normalTextfieldColor: '#D5D4DF',
        errorTextfieldColor: '#a94442',

        primaryAccentColor: '#59BBF8',
        secondaryAccentColor: '#0DD3D7',

        activeColor: '#59BBF8',
        inactiveColor: '#ffffff'

    }

    const LightTheme = {
        primaryBackgroundColor: '#F4F8FB',
        primaryBackgroundTextColor: '#485550',

        secondaryBackgroundColor: '#2F3443',
        secondaryBackgroundTextColor: '#ffffff',

        tertiaryBackgroundColor: '#2F3443',
        secondaryBackgroundTextColor: '#ffffff',
    
        primaryCardBackgroundColor: '#f3f3f3',
        primaryCardBorderColor: '#485550',
        primaryCardTextColor: '#485550',

        primaryButtonColor: '#2F3443',
        primaryButtonTextColor: '#FFF',

        secondaryButtonColor: '#F4F8FB',
        secondaryButtonTextColor: '#2F3443',
        secondaryButtonBorderColor: '#2F3443',

        normalTextfieldColor: '#485550',
        errorTextfieldColor: '#a94442',

        primaryAccentColor: '#8296a3',
        secondaryAccentColor: '#7A7E7E',

        activeColor: '#ffffff',
        inactiveColor: '#8296a3'
    }


    return class HocWithStyles extends React.Component {
        render() {
            let colors = {}
            if (this.props.theme == 'dark') {
                colors = { ...DarkTheme }
            }
            else {
                colors = { ...LightTheme }
            }
            let styles = StylesSheetCreatorFunction(colors)
            return (
                <WrappedComponent colors={colors} styles={styles} {...this.props} />
            )
        }
    }
}