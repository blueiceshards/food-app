import React from 'react';
import {View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

// now that we are using Redux, we should get the meals out of the dummy data and from the redux store instead. useSelector is a hook that allows us to select a slice of our globally managed state and use it in this componenet. useselector takes a function that will be sleected for us by react-redux, a function that gets state as an argument; automatically, react-redux which executes the function for us will provide the current redux state to this function, and it's then able to return any data you want from that state/global store. 

const CategoryMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');
    
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    // getParam takes a string with the name of the Param we want to extract, which is the name we chose as a key in our parent object i.e. categoryId. You can pass whatever data you want, arrays, etc, don't have to be limited to Id. 

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    if (displayedMeals.length === 0) {
        return <View style={styles.content}><DefaultText>No meals found, maybe check your filters.</DefaultText></View>
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectedCategory.title,
    };
};

// navigationOptions can be static or a function (dynamic) - supported by react navigation. 

// if you want to trigger a back navigation automatically and don't want to wait for the user to press the back button, you can: props.navigation.goBack(); or props.navigation.pop() pops off the curernt screen on the stack; difference: pop can only be used if you're in a stack navigator, goBack is also available in other navigators which we will use in this module. 

// if you want to go all the way back to the parent component - see MealDetailScreen.

// if you want to go to another page, but don't call it to a stack, but instead replace it in the stack so you only have one item in the stack and the screen is the new page, i.e. you won't be able to go back because the stack is empty, you can use replace. props.navigation.replace({routename: 'CategoryMeals'});  you can use this for login screen after log in, you don't want to go back. 

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryMealsScreen;

/* const CategoryMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');
    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    // getParam takes a string with the name of the Param we want to extract, which is the name we chose as a key in our parent object i.e. categoryId. You can pass whatever data you want, arrays, etc, don't have to be limited to Id.

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    return (
        <MealList listData={displayedMeals} navigation={props.navigation}/>
    );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectedCategory.title,
    };
}; */