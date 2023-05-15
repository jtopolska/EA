import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    },
    { timestamps: true }
)

const NewsModel = mongoose.model("NewsModel", newsSchema);

export default NewsModel;