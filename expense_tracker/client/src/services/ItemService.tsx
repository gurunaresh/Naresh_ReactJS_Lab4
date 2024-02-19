import axios from "axios";
import IDataList from "../models/IDataList";

// get method to fetch all the expense data
export const getItemsData = () => {
    return axios.get<IDataList[]>('http://localhost:4001/items').then(response => response.data);
}

// post method for adding new expense in the database
export const pushData = (newExpense : Omit<IDataList, "id">) => {
    return axios.post<IDataList>("http://localhost:4001/items", newExpense).then(response=>response.data);
} 