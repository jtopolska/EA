import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import router from './routes.js';

dotenv.config();
mongoose.set("strictQuery", false);

const PORT = 3005 || process.env.port;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(router);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log(`We're connected to Mongo`))
.catch((err) => console.log("DB connection error", err));

// запити перенаправляються на папку із статичними файлами
app.use('/uploads', express.static('uploads'));

// створюємо сховище для зображень
const storage = multer.diskStorage({
    // вказуємо шлях куди зберігаємо зображення
    destination: (req, file, cb) => {
        // null = відсутні помилки, uploads = назва папки з зображеннями
        cb(null, 'uploads');
    },
    // функція дає ім'я перед тим, як зберегти файл
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });
// якщо прийде запрос на upload, то спочатку буде виконуватись middleware
// express думає, що uploads це роут, а не папка, тому додаємо функцію з express.static вище
app.post('/upload', upload.single('image'), (req, res) => {
    // повертаємо клієнту за якою адресою збережене зображення
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});

app.listen(PORT, (err) => {
    err ? console.log("Port error", err) : console.log(`${PORT} is running`)
})