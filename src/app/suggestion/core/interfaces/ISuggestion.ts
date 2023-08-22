import { SuggestionCategoryEnum } from "../enums/SuggestionCategoryEnum";

export interface ISuggestion {
  id: number;
  content: string;
  suggestionCategory: SuggestionCategoryEnum
}
