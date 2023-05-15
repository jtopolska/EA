import { Router } from "express";
import { getNews, addNews } from "./Controllers.js";
const router = Router();

router.get('/news', getNews);
router.post('/news', addNews);

export default router;