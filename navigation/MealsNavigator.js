import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React from 'react';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    } ,
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
}

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: 'Meal Categories',
            }
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: {
            screen: MealDetailScreen
        }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        // initialRouteName: 'Categories',
    }
);

// you can pass a second argument to createStackNavigator. the first argument is an object with your screens, the second allows you to configure that navigator. there are list of settings you can configure, including default navigation options, optionst that apply to every screen. takes an object with your nav options and pply to all 3 screens. 

// defaultNavigatonOptions will get merged with specific options. specific options always win. specific headerTitle in MealsNavigator win over specific headerTitle in CategoryMealsScreen. 

// besides default navigation options, you can pass more stuff in the object for the second parameter. 

// takes at least one argument, that is a JS object, where we configure the different screens we want to be able to move between.

// property name : pointer you want to load, OR, you can also pass an object i.e. property name : object e.g. CategoryMeals : { screen: CategoryMealsScreen } to set default config for the screen. we will do this later. 

// any component mapped to your screen identifiers/navigators (Categories, CategoryMeals), will get a special prop. Nested components don't get it, just top level components you mapped to your navigators. 

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        // initialRouteName: 'Categories',
    }
);

// OK to use same screens in multiple navigators.

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-restaurant'
                    size={25}
                    color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android'
            ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>
            : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: Platform.OS === 'android'
            ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
            : 'Favorites',
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-star'
                    size={25}
                    color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor
        }

    }
};

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        /*         barStyle: {
                    backgroundColor: Color.primaryColor
                } to configure bgcolor if you don't like shifting i.e. shifting: false*/

    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            },
            activeTintColor: Colors.accentColor
        }
    }
    );

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        /* navigationOptions: {
            drawerLabel: 'Filters!'
        }, */
        defaultNavigationOptions: defaultStackNavOptions
    }
);

// MealsFavTabNavigator takes two parameters, first is an object containing the tabs, second is object containing options for the tabs. 

// you can point at a screen in createTabNavigator.

// Now, MealsFavTabNavigator is the root navigator (entry point into the app) because it nests MealsNavigator inside. 

const MainNavigator = createDrawerNavigator(
    {
    MealsFavs: {
        screen: MealsFavTabNavigator, 
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: 'Filters'
        }
    }
}, 
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans'
            }
        }
    }
);

// add drawer navigators to categories and favorites because they're the roots of your two tabs.

export default createAppContainer(MainNavigator);

// special for createStackNavigator => must wrap export in createAppContainer.

// createAppContainer also creates NavigationContainer, which is a react component that you should use in your JSX code because it has all the metadata related to navigation. 

// most basic and common form of navigation of any mobile app: how to go back and forth between screens. for this, we will set up a stack navigator because pages/screens are managed on a stack of pages. whenever you go to a new screen, it'll be pushed to the top of that stack, and the topmostt screen on a stack is always the screen that is visible. if you click the back button, the screen you were at is popped off and you will see the screen below that, which was the screen you came from. This is why it's called a stack navigator. 

// inefficient method:
/*
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
        }
    },

    CategoryMeals: {
        screen: CategoryMealsScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
        }
    },
    MealDetail: MealDetailScreen
});
 */