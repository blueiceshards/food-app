import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS, // dummy data array
    filteredMeals: MEALS,
    favoriteMeals: [] // in a real app, to store in a server so the user can save his favorite meals. 
}

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId)
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return {...state, favoriteMeals: updatedFavMeals };
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId)
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)}
            }
        case SET_FILTERS: 
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                return true; 
            });
            return {...state, filteredMeals: updatedFilteredMeals}
        default:
            return state;
    }
}

// action is an object with a type property which identifies the action occured

// This is the file where you will manage your meals Reducer state updating logic. That's the file that will provide the logic for marking the meal as a favorite, and for managing all the filters. A reducer in react is just a function which receives 2 arguments: current state snapshot on which you can build up on and derive a new state (because the reducer in the end will have to return a new state, which is then taken by Redux and stored in store, and the action. const reducer = (state, action). action because the reducer function is executed by redux whenever a new action is dispatched. and return a new state. 

export default mealsReducer;