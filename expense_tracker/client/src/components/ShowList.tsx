import React, { useEffect, useState} from "react";
import IDataList from "../models/IDataList";
import { getItemsData } from "../services/ItemService";
import ExpenseTrackerForm from "./ExpenseTrackerForm";

export default function ShowList() {
    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>(0);
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    // useEffect to run after render
    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const data = await getItemsData();
                console.log(data);
                setItems(data);
                setSum(data.reduce((result, expense) => result + expense.price, 0)); 
                calculateShares(data);
            }
            catch (err: any) {
                console.error(err);
                setError(err);
            };
        }
        fetchItemsData();
    }, [showForm]);
     
    // function to calculate the shares of rahul and ramesh
    const calculateShares = (data: IDataList[]) => {
        var rahulspent1: number = 0;
        var rameshspent: number = 0;
        data.map((sams) =>
            sams.payeeName === "Rahul"
                ? (rahulspent1 = rahulspent1 + sams.price)
                : (rameshspent = rameshspent + sams.price)
        );
        setRahulSpent(rahulspent1);
        setRameshSpent(rameshspent);
    }

    // Table headers
    const getTableHeaders = () => {
        return (
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width:112}}>Payee</div>
            </>
        )
    }

    // Function to handle adding new item in table
    const renderExpense = (expense: IDataList) => {
        return (
            <div key={expense.id} >
            <div className="use-inline date">{expense.setDate}</div>
            <div className="use-inline">{expense.product}</div>
            <div className="use-inline price">{expense.price}</div>
            <div className={`use-inline ${expense.payeeName}`}>{expense.payeeName}</div>
        </div>
        )
    }


    // render the summary of the spends by rahul and ramesh
    const renderSummary = () => {
        return (
            <>
                <div className="use-inline">Total</div>
                <div className="use-inline total">{sum}</div><br/>
                <div className="use-inline">Rahul</div>
                <div className="use-inline total Rahul">{rahulSpent}</div><br/>
                <div className="use-inline">Ramesh paid:</div>
                <div className="use-inline total Ramesh">{rameshSpent}</div><br /> 
                <span className="use-inline payable">{rahulSpent > rameshSpent ? "Pay Rahul" : "Pay Ramesh"}</span>
                <span className="use-inline payable price">{ Math.abs(rahulSpent-rameshSpent)/2}</span>
            </>
        )
    }


    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {showForm && <div className="form">
                <ExpenseTrackerForm onClose={()=>setShowForm(false)} onTrue={()=>setShowForm(false)}></ExpenseTrackerForm>
            </div>}
            {getTableHeaders()}
            {items && items.map((expense) => renderExpense(expense))}
            <hr/>
            {renderSummary()}
            {error && <strong>{error?.message}</strong>}
        </>
    )
}