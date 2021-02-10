import {useEffect, useState} from 'react'
import './App.css';
import { idbKeyval } from './indexDB/'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [watchlistItems, setWatchlistItems] = useState([])

  useEffect(async () => {
    let keys = await idbKeyval.keys()
    let list = []
    for (let n = 0; n < keys.length; n++) {
      list.push({
        id: keys[n],
        value: await idbKeyval.get(keys[n])
      })
    }
    setWatchlistItems(list)
  })

  const handleSubmit = (env) => {
    env.preventDefault()
    // adds to db
    idbKeyval.set(uuidv4(), env.target.children[0].value)
  }

  const handleDelete = () => {
    // clears db
    idbKeyval.clear()
    setWatchlistItems([])
  }
  const handleDeleteItem = id => {
    idbKeyval.delete(id)
    setWatchlistItems(prevState => prevState.filter(element => element.id !== id))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input placeholder="Add URL"></input>
      </form>
      {watchlistItems.map(item => <li key={item.id} onClick={() => handleDeleteItem(item.id)}>{item.value}</li>)}

      <button onClick={handleDelete}>Clear</button>
    </div>
  );
}

export default App;
