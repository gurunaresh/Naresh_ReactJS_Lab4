import React, { ChangeEvent, Component, FormEvent } from 'react';
import { pushData } from '../services/ItemService';


type Props = {
    onClose: any,
    onTrue: any
}

type State = {
    product: string,
    price: number,
    payeeName: string,
    setDate: string
}

export default class ExpenseTrackerForm extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            product: '',
            price: 0,
            payeeName: '',
            setDate: ''
        }
    }

    submitHandler = async(event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault(); 
        const finalData = { ...this.state };
        const data = await pushData(finalData);
        console.log(data);
        this.props.onTrue();
    }

    // ChangeEvent function to set the Payee name
    setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({ payeeName: event.target.value });
    };

    // ChangeEvent function to set the Product
    setProduct = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ product: event.target.value });
    };

    // ChangeEvent function to set the Price
    setPrice = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ price: parseInt(event.target.value) });
    };

    // ChangeEvent function to set the Date
    loggedDate = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ setDate: e.target.value });
    };


    render() {
        return (<>
            <section>
                <header>
                    <h1>Add new item</h1>
                    <p>Read the below instruction  carefully before adding a new expense.<br />
                        Make sure you provide all the fields where * is provided</p>
                </header>
                <form onSubmit={this.submitHandler}>
                    <article>
                        <p>Name</p>
                        <select name="Name" required value={this.state.payeeName}
                            onChange={this.setPayee}>
                            <option value="" defaultChecked>Choose</option>
                            <option value="Rahul">Rahul</option>
                            <option value="Ramesh">Ramesh</option>
                        </select>
                    </article>
                    <article>
                        <p>Product Purchased</p>
                        <input type="text" required value={this.state.product} onChange={this.setProduct}></input>
                    </article>
                    <article>
                        <p>Price</p>
                        <input type="number" required value={this.state.price} onChange={this.setPrice} />
                    </article>

                    <article>
                        <p>Date</p>
                        <input type="date" required value={this.state.setDate} onChange={this.loggedDate} />
                    </article>
                    <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>

                    <button type="submit" className="form-button">Submit</button>
                </form>
            </section>
        </>
        );
    }
}