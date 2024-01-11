const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];


function Header() {
    return (
        <h1>🌴Far Away💼</h1>
    );
}

function Form() {
    return (
        <div className="add-form">
            <h3>What do you need for your trip? 😎</h3>
        </div>
    );
}

function List() {
    return (
        <ul className="list">
            {initialItems.map(item => <Item item={item.description} />)}
        </ul>
    );
}

function Item(props) {
    return (
        <li>{props.item}</li>
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