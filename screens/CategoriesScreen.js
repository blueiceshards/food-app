import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'

// you can render grids with FlatList with numColumns. 

// renderGridItem is a function that will receive some itemData and will return some JSX elements, that we will point at renderGridItem in renderItem (property of flatlist).

// itemData.item is something that is available on a FlatList. the itemData object here has an item property, react Native FlatList gives you this item property and in there, we have a title proprerty, because the item property we are getting is just the Category that we are getting from our data, so we get a JS object from item which is based on our model in category.js. our object has a title property which we can totally extract. 



const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'CategoryMeals', params: {
                            categoryId: itemData.item.id
                        }
                    });
                }} />
        );
    }

    // props.navigation.navigate can pass params, along with routeName, which takes an object of any key value pairs and as many key value pairs as you want. extra data that you are passing to the new screen that is being laoded. 

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2} />
    );
};

CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
    }
};

// CategoriesScreen is just a JS object, hence we can add a property after creating it. 

// full list of navigationOoptions can be found in docs.

// need to put renderGridItem inside CategoriesScreen to get access to props to call props.navigation.navigate({routeName: 'xx'}). 

/* const CategoriesScreen = props => {
    console.log(props);
    return (
        <View style={styles.screen}>
            <Text>The Categories Screen!</Text>
            <Button title="Go to Meals!" onPress={() => {
                props.navigation.navigate({routeName: 'CategoryMeals'});
            }} />
        </View>
    );
};
 */

// we get props.navigation because it's a special prop we are getting by react navigation because we loaded this CategoriesScreen component with the help of our MealsNavigator. this special navigation prop has a navigate METHOD. this is the main, most important, method for getting around with the help of react navigation. how does navigate work? => takes an object as an argument, and you can set a routeName to which it will navigate. routeName has to be one of the 3 routenames you set up in MealsNavigator, i.e. Catogories, CategoryMeals, or MealDetail, i.e. identifiers you chose in front of the colons in MealsNavigator. You must pass CategoryMeals as a string if not it'll assume it's a variable (and not an identifier/routename!). Alternatively, you can: ...navigate('CategoryMeals'). 

// it now works out of the box thanks to the library!

// instead of navigate('CategoryMeals'), you can push('Categories') which enables you to reload the same page. why would you do this? => in many apps you might not need this, but if you have an app like dropbox where you have folders you want your users to navigate, if you're in one folder and want to go to another, each folder is technically the same screen just with different content loaded into it. in such a case, you may want to go from Folder A to Folder B, which both use the same screen but have different content. in such a case, you could use push to upush the new (same) screen into the stack and load the same screen with different content. in this app, we don't need this. navigate won't take you back to the screen, but push will. 

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


});

export default CategoriesScreen;