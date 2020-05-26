class Meal {
    constructor(id, categoryIds, title, affordability, complexity, imageUrl, duration, ingredients, steps, isGlutenFree, isVegan, isVegetarian, isLactoseFree) {
        this.id=id;
        this.categoryIds=categoryIds;
        this.title=title;
        this.imageUrl=imageUrl;
        this.affordability=affordability;
        this.complexity=complexity;
        this.imageUrl=imageUrl;
        this.duration=duration;
        this.ingredients=ingredients;
        this.steps=steps;
        this.isGlutenFree=isGlutenFree;
        this.isVegan=isVegan;
        this.isVegetarian=isVegetarian;
        this.isLactoseFree=isLactoseFree;
    }
}

// store all data in properties. just store all the arguments we are getting into properties. create object based on class. 

export default Meal;