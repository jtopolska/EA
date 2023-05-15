
export const NewsItems = ({ item }) => {
    return (
        <li>
            {item.image ?
                <img src={ `http://localhost:3005${item.image}` } alt="Uploaded" />
                : ''
            }
            <h3>{ item.title }</h3>
            <p>{ item.text }</p>
        </li>
    )
}