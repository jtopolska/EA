import axios from "./axios";

const getAllNews = (setNewsArray) => {
    axios.get('/news')
    .then(({data}) => {
        setNewsArray(data);
    })
}

export { getAllNews } 