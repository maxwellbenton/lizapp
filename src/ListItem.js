export default function ListItem({id, value, handleDeleteItem}) {
    return (
        <div>
            {value.title},
            {value.url},
            {value.category}
            <button onClick={() => handleDeleteItem(id)}>Delete</button>
        </div>
    )
}