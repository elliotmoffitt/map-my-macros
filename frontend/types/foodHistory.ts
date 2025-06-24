import { IMenuItem } from "./menuItems";

export interface IFoodHistory {
  id?: number;
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  food?: IMenuItem;
}
