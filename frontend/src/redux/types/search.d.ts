export interface ISearch {
    minCalories: string;
    maxCalories: string;
    minProtein: string;
    maxProtein: string;
    minCarbs: string;
    maxCarbs: string;
    minFat: string;
    maxFat: string;
    food: string;
}


export interface INutritionParams {
    apiKey: string
    query: string
    number: string
    minCalories: string
    maxCalories: string
    minProtein: string
    maxProtein: string
    minCarbs: string
    maxCarbs: string
    minFat: string
    maxFat: string
}
