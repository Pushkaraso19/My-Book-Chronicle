import express from "express";
import axios from "axios";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const PORT = 3000;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let readBooks = [];

async function getReadBooks() {
    const result = await db.query("SELECT * FROM readbookslist ORDER BY title ASC");
    readBooks = result.rows;
    return readBooks;
}

app.get("/", async (req,res) => {
    try {
        const booksList = await getReadBooks();
        res.render("index.ejs", {
            books: booksList   
        });
    } catch (err) {
        console.log(err);
    }
    
});
app.get("/book-cover/:isbn", async (req, res) => {
    const { isbn } = req.params;
    const apiUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

    try {
        const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
        res.set("Content-Type", "image/jpeg");
        res.send(response.data);
    } catch (error) {
        console.error(`Error fetching cover for ISBN: ${isbn}, serving fallback.`);
        res.sendFile(__dirname + "/public/images/FallBackCover.jpeg");
    }
});

app.get("/add-books", (req,res) => {
    res.render("newbook.ejs")
});

app.get("/about", (req,res) => {
    res.render("about.ejs")
});

app.get("/delete-book/:id", async (req,res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM readbookslist WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.post("/search", async (req,res) => {
    const { title } = req.body;
    try {
        const result = await db.query("SELECT * FROM readbookslist WHERE title ILIKE $1", [`%${title}%`]);
        const booksList = result.rows;
        res.render("index.ejs", {
            books: booksList,
            isSearch: true,  // Add this flag
            searchTerm: title // Add the search term
        });
    } catch (err) {
        console.log(err)
    }
});

app.post("/add-books", async (req, res) => {
    const result = req.body;
    console.log(result);
    try {
        await db.query("INSERT INTO readbookslist (title, author, dateread, isbn, personalnote, rating) VALUES ($1, $2, $3, $4, $5, $6)", [result.title, result.author, result.dateRead, result.isbn, result.personalNotes, result.rating]);
        res.redirect("/add-books");
    } catch (err) {
        console.log(err);
    }
});

app.get("/", (req,res) => {});

app.get("/", (req,res) => {});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})