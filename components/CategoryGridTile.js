import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';

const CategoryGridTile = props => {
    let TouchableComponent = TouchableOpacity;

    (Platform.OS === 'android' && Platform.Version >= 21) ? TouchableComponent = TouchableNativeFeedback : TouchableOpacity;

    return (
        <View style={styles.gridItem}>
            <TouchableComponent
                style={styles.touchableContainer}
                onPress={props.onSelect}
            >
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableComponent>
        </View>
    );
};

// must pass styles to view inside touchable opacity because touchable opacity is invisible but View isn't

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        elevation: 5,
        overflow: Platform.OS==='android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 15,
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right'
    },
    touchableContainer: {
        flex: 1,
    }
});

export default CategoryGridTile;