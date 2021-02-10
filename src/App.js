import {useEffect, useState} from 'react'
import './App.css';
import { idbKeyval } from './indexDB/'
import { v4 as uuidv4 } from 'uuid';
import ListItem from './ListItem';

function App() {
  const [watchlistItems, setWatchlistItems] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: ''
  })

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
  }, [])

  const handleSubmit = (env) => {
    env.preventDefault()
    // adds to db
    const payload = {
      title: env.target.children[0].value,
      url: env.target.children[1].value,
      category: env.target.children[2].value
    }
    console.log(payload)
    setWatchlistItems(prevState => [...prevState, payload])
    idbKeyval.set(uuidv4(), payload)
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

  const handleChange = env => {
    env.persist();
    setFormData(prevState => {
      return {
        ...prevState,
        [env.target.name]: env.target.value
      }
    })
  }

  console.log(formData)
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={formData.title} onChange={handleChange} name='title' placeholder="Add Title"></input>
        <input value={formData.url} onChange={handleChange} name='url' placeholder="Add URL"></input>
        <input value={formData.category} onChange={handleChange} name='category' placeholder="Add Category"></input>
        <input type="submit"></input>
      </form>
      {watchlistItems.map(item => <ListItem key={item.id} {...item} handleDeleteItem={handleDeleteItem} />)}

      <button onClick={handleDelete}>Clear</button>
    </div>
  );
}

export default App;
