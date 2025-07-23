import React, { useEffect, useState } from "react";
import API from '../api';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { increment, decrement, incrementByAmount } from '../../src/features/counter/counterSlice';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({ id: null, invoiceNumber: "", customer: "", amount: "", status: "" });

    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await API.get('/invoices');
            setInvoices(response.data);
        } catch (err) {
            setError(err);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.id) {
            // Update existing invoice  }
            await API.put('/invoices', form, { withCredentials: true });
        }
        else {
            // Create new invoice
            form.id = -1;
            await API.post('/invoices', form, { withCredentials: true });
        }

        setForm({ id: null, invoiceNumber: "", customer: "", amount: "", status: "" });
        fetchData();
    };

    const handleEdit = (invoice) => {
        setForm(invoice);
    };

    const handleDelete = async (id) => {
        await API.delete(`/invoices/${id}`, { withCredentials: true });
        fetchData();
    };

    return (
        <div>
            <h2>Invoice List</h2>
            <form className="ml-84 w-216" onSubmit={handleSubmit}>
                <input className="w-40"
                    name="invoiceNumber"
                    placeholder="Invoice Number"
                    value={form.invoiceNumber}
                    onChange={handleChange}
                />
                <input className="w-40"
                    name="customer"
                    placeholder="Customer"
                    value={form.customer}
                    onChange={handleChange}
                />
                <input className="w-40"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                />
                <input className="w-40"
                    name="status"
                    placeholder="Status"
                    value={form.status}
                    onChange={handleChange}
                />
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" type="submit">{form.id ? "Update" : "Add"} Invoice</button>
            </form>
            <table className="table-auto w-236 mt-4 mr-8">
                <thead>
                    <tr>
                        <th>Action</th><th>#</th><th>Customer</th><th>Amount</th><th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(inv => (
                        <tr key={inv.id}>
                            <td>
                                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2" onClick={() => handleEdit(inv)}>Edit</button>{" "}
                                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(inv.id)}>Delete</button>
                            </td>
                            <td>{inv.invoiceNumber}</td>
                            <td>{inv.customer}</td>
                            <td>${inv.amount}</td>
                            <td>{inv.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ padding: '2rem' }}>
                <h1>Redux Toolkit Counter</h1>
                <h2>{count}</h2>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => dispatch(decrement())}>-</button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => dispatch(increment())}>+</button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(incrementByAmount(5))}>+5</button>
            </div>
        </div>
    );
};

export default InvoiceList;
