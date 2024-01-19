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

function List({items, onDeleteItem, onHandleChecked, onClearList}) {
    const [sort, setSort] = useState('input');
    let sortedItems;

    // TODO: Complete the sorting method for each category
    switch (sort) {
        case "input" : sortedItems = items; break;
        case "description" : sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description)) ; break;
        case "packed" : sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed)); break;
    }


    return (
        <div className="list">
            <ul>
                {sortedItems.map(item => <Item item={item} onDeleteItem={onDeleteItem} onHandleChecked={onHandleChecked} key={item.id}/>)}
            </ul>

            <div className="actions">
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="input">Sort by Input Order</option>
                    <option value="description">Sort by Description</option>
                    <option value="packed">Sort by Packed Status</option>
                </select>

                <button type="button" onClick={onClearList}>Clear List</button>
            </div>
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


function Stats({ items }) {
    if (!items.length) return (
        <p className="footer">
            <em>Start Packing your luggage!</em>
        </p>
    );

    const numItems = items.length;
    const numPacked = items.filter(item => item.packed).length;
    const packedPercentage = Math.round((numPacked / numItems) * 100);

    return (
        <footer className="stats">
            <em>
            {packedPercentage === 100 ? "You are set to go! ✈️" : 
            `💼You have ${ numItems } items on your list, and you already packed ${ numPacked } (${ packedPercentage }%)` 
            }
            </em>
        </footer>
    );
}


export {Header, Form, List, Stats};