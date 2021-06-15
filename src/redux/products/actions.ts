import { ItemsList } from "../store/initialState"


export const SET_ITEMS = 'SET_ITEMS'
export const setItems = (itemsData: ItemsList):Readonly<{
  type: typeof SET_ITEMS
  payload: ItemsList
}> => {
  return {
    type: SET_ITEMS,
    payload: itemsData,
  }
}