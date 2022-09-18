import {UPDATE_SELECTED_CURRENCY, GET_CURRENCIES} from "./Currency.type"

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const updateSelectedCurrency = (currency) => ({
  type: UPDATE_SELECTED_CURRENCY,
  currency,
});
