import { useEffect, useState } from 'react';
import axios from '../axios/axios';
import { getAllNews } from '../axios/FetchData';
import { NewsItems } from './NewsItems';

export const News = () => {
    const [newsArray, setNewsArray] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        getAllNews(setNewsArray);
    }, [])

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append('image', file);
        const { data } = await axios.post('/upload', formData);
        setImage(data.url);
    }

    const onSubmit = async () => {
        const { data } = await axios.post('/news', { title, text, image })
        console.log(data)
        setTitle('');
        setText('');
        getAllNews(setNewsArray);
    }

    return (
    <section className='container'>
        <div className='fields'>
            <input type="file" className='file' name="image" accept="image/*, .png, .jpg, .gif, .web, .pdf," onChange={handleFile} />
            <input type="text" className='title' onChange={(e) => setTitle(e.target.value)} value={ title } placeholder="Заголовок" />
            <textarea type="text" rows={10} onChange={(e) => setText(e.target.value)} value={ text } placeholder="Текст" ></textarea>
            <button onClick={onSubmit}>Опублікувати</button>
        </div>
        <ul className='news-list'>
            {newsArray.map(item => 
                <NewsItems key={ item._id } item={ item } />
            )}
        </ul>
    </section>
    )
}