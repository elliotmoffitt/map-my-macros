export interface ISearch {
  id?: number;
  name?: string;
  food?: string;
  minCalories?: string;
  maxCalories?: string;
  minProtein?: string;
  maxProtein?: string;
  minCarbs?: string;
  maxCarbs?: string;
  minFat?: string;
  maxFat?: string;
}

export interface ISearchState {
  byId: {
    [id: number]: ISearch;
  };
  allSavedSearches: ISearch[];
}

export interface INutritionParams {
  apiKey: string;
  query?: string;
  number: string;
  minCalories?: string;
  maxCalories?: string;
  minProtein?: string;
  maxProtein?: string;
  minCarbs?: string;
  maxCarbs?: string;
  minFat?: string;
  maxFat?: string;
}
