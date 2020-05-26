import React, { useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; // HeaderButtons plural not singular as in the ohter HeaderButton file. 
import { MEALS } from '../data/dummy-data';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    // useDispatch gives us a function that we acn call to dispatch new actions. 

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler]);

    /*     useEffect (() => {
            props.navigation.setParams({mealTitle: selectedMeal.title})
        }, [selectedMeal]);  */

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavorite});
    }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient =>
                <ListItem key={ingredient}> {ingredient}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step =>
                <ListItem key={step}> {step}</ListItem>)}
        </ScrollView>
    );
};

// popToTop: pops to root screen i.e. Categories screen. 

// problem: cannot use useSelector hook in the navigationoptions becuase you can only use hooks inside of other hooks or functional components. but this is a novel function. solution 1: you can use setParams to forward stuff.

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav')
    const isFavorite = navigationData.navigation.getParam('isFav');
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: mealTitle,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Favorite'
                    iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200 // or use dimensions API
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;