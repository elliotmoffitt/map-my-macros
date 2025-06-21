export interface ISearchErrors {
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
}

export interface IMenuItem {
  id?: number;
  restaurantName?: string;
  restaurantChain?: string;
  name?: string;
  title?: string;
  image?: string;
  imageUrl?: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}
