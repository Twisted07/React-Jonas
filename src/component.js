import { useState } from "react";

function Header() {
    return (
        <h1>🌴Far Away💼</h1>
    );
}

// * Handle the form data
function Form({onAddItem}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return

        const newItem = { description, quantity, id: Date.now(), packed: false };

        onAddItem(newItem);
        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip? 😎</h3>
            <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                {Array.from({length: 20}, (_, i) => i + 1).map(
                    (num) => (
                        <option value={num} key={num}>{num}</option>
                    )
                )}
            </select>
            <input type="text" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)} />
            <button>Add</button>
        </form>
    );
}

function List({items, onDeleteItem, onHandleChecked}) {
    return (
        <div className="list">
            <ul>
                {items.map(item => <Item item={item} onDeleteItem={onDeleteItem} onHandleChecked={onHandleChecked} key={item.id}/>)}
            </ul>
        </div>
    );
}

function Item({item, onDeleteItem, onHandleChecked}) {
    
    return (
        <li>
            {/* If the checkbox is selected, I want the item.packed state to be updated to true */}
            <input type="checkbox" onChange={() => onHandleChecked(item.id)}></input>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>💼You have X items on your list, and you already packed X (X%)</em>
        </footer>
    );
}


export {Header, Form, List, Stats};