import NewsModel from './Model.js';

export const getNews = async (req, res) => {
    const news = await NewsModel.find();

    res.json(news);
}

export const addNews = async (req, res) => {
    const data = new NewsModel({
        title: req.body.title,
        text: req.body.text,
        image: req.body.image
    })

    const news = await data.save();
    res.json(news);
}
