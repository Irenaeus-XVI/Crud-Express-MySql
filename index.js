const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "route-assignment-3"
});




//NOTE - Get All Users
app.get('/', (req, res) => {

    const query = "select * from Users";
    connection.execute(query, (err, data) => {
        if (err) {
            res.send({ "message": "connection failed", err });
        }
        else {
            res.send({ "message": "connection success", data });
        }
    });

});



//NOTE - Add User
app.post("/addUser", (req, res) => {

    const { name, email, password, age } = req.body;
    //NOTE - checkQuery  if user already exists
    const checkQuery = `select  * from users where email = ?`
    connection.execute(checkQuery, [email], (err, data) => {//NOTE - proper parameter binding
        if (err) {
            res.status(500).send({ "message": "connection failed", error: err });

        } else {

            const addQuery = `INSERT INTO users(name, email, password, age) VALUES (?,?,?,? )`;
            data.length ? res.status(409).json({ "message": "User already exist", data }) : (
                connection.execute(addQuery, [name, email, password, age], (err, data) => {
                    if (err) {
                        res.status(500).send({ "message": "connection failed", error: err });

                    } else {
                        res.status(200).send({ "message": "User added success", data: data });

                    }
                }))


        }
    })
});


//NOTE - updateUser
app.put("/updateUser", (req, res) => {
    const { name, email, password, age } = req.body;
    const checkQuery = `SELECT * FROM users WHERE email = ?`;
    connection.execute(checkQuery, [email], (err, data) => {
        //NOTE - proper parameter binding
        if (err) {
            res.status(500).send({ message: "Connection failed", error: err });
        } else {
            if (data.length === 0) {
                res.status(409).json({ message: "User not found", data });
            } else {
                const updateQuery = `UPDATE users SET name = ?, email = ?, password = ?, age = ? WHERE email = ?`;
                connection.execute(updateQuery, [name, email, password, age, email], (err, data) => {
                    if (err) {
                        res.status(500).send({ message: "Connection failed", error: err });
                    } else {
                        res.status(200).send({ message: "User updated successfully", data: data });
                    }
                });
            }
        }
    });
});




//NOTE - deleteUser
app.delete("/deleteUser", (req, res) => {
    const { email } = req.body;
    const checkQuery = `SELECT * FROM users WHERE email = ?`;
    connection.execute(checkQuery, [email], (err, data) => {
        //NOTE - proper parameter binding
        if (err) {
            res.status(500).send({ message: "Connection failed", error: err });
        } else {
            if (data.length === 0) {
                res.status(409).json({ message: "User not found", data });
            } else {
                const deleteQuery = `delete from users where email = ?`;
                connection.execute(deleteQuery, [email], (err, data) => {
                    if (err) {
                        res.status(500).send({ message: "Connection failed", error: err });
                    } else {
                        res.status(200).send({ message: "User deleted successfully", data: data });
                    }
                });
            }
        }
    });
});




//NOTE - Search
app.get('/searchUser', (req, res) => {

    const searchQuery = "select * from Users where name LIKE 'a%' and age < 30";
    connection.execute(searchQuery, (err, data) => {
        if (err) {
            res.send({ "message": "connection failed", err });
        }
        else {
            if (data.length === 0) {
                res.send({ "message": "no user found", data });

            }
            else {
                res.send({ "message": "connection success", data });

            }
        }
    });

});



//NOTE - SearchUsingIN
app.get('/searchUserIn', (req, res) => {

    const query = "SELECT * FROM Users WHERE name IN ('Emma Clark', 'James Anderson', 'Sophia Miller')";
    connection.execute(query, (err, data) => {
        if (err) {
            res.send({ "message": "connection failed", err });
        }
        else {
            if (data.length === 0) {
                res.send({ "message": "no user found", data });
            }
            else {
                res.send({ "message": "connection success", data });
            }
        }
    });

});


//NOTE - get all users with products
app.get("/getUserProducts", (req, res) => {
    const query = "select * from Users join products on users.name = products.createdby ";
    connection.execute(query, (err, data) => {
        if (err) {
            res.send({ "message": "connection failed", err });
        }
        else {
            res.send({ "message": "connection success", data });
        }
    });
});


app.listen(port, () => console.log(`Server is listening on port ${port}!`));