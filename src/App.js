import {Header, Form, List, Stats} from './component'
import { useState } from 'react';

function App() {
  const [items, setItem] = useState([]);

    function handleAddItems(item) {
      setItem(items => [...items, item]);
    }

    function handleDeleteItems(id) {
      // This returns a new array which is then parsed as the new items value
      setItem(items => items.filter(item => item.id !== id))
    }

    function handleChecked(id) {
      setItem(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
    }

    function handleClearList() {
      const confirmed = window.confirm('Are you sure you want to delete all the items on your list?');
      if (confirmed) setItem([]);
  }



  return (
  <div className='app'>
    <Header />
    <Form 
      onAddItem={handleAddItems}
    />
    <List 
      items={items}
      onDeleteItem={handleDeleteItems}
      onHandleChecked={handleChecked}
      onClearList={handleClearList}
    />
    <Stats items={items} />
  </div>
  );
}

export default App;
