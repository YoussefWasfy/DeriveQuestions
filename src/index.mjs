// const db = require("./db/db");
// const Model = require("./models/document");

import { getArticles } from './services/fetchData.mjs'

const data = await getArticles()
