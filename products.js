const express = require('express');
const app = express();
const port = 4000;
const mysql = require('mysql2');
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "route-assignment-3"
})




//NOTE - Get All products
app.get('/', (req, res) => {

    const query = "select * from products";
    connection.execute(query, (err, data) => {
        if (err) {
            res.send({ "message": "connection failed", err });
        }
        else {
            res.send({ "message": "connection success", data });
        }
    });

});



//NOTE - Add Product
app.post("/addProduct", (req, res) => {

    const { pName, pDescription, price, createdby } = req.body;
    //NOTE - checkQuery  if product already exists
    const checkQuery = `select  * from products where pName = ?`
    connection.execute(checkQuery, [pName], (err, data) => {//NOTE - proper parameter binding
        if (err) {
            res.status(500).send({ "message": "connection failed", error: err });
        } else {

            const addQuery = `INSERT INTO Products(pName, pDescription, price, createdby) VALUES (?,?,?,? )`;
            data.length ? res.status(409).json({ "message": "Product already exist", data }) : (
                connection.execute(addQuery, [pName, pDescription, price, createdby], (err, data) => {
                    if (err) {
                        res.status(500).send({ "message": "connection failed", error: err });
                    } else {
                        res.status(200).send({ "message": "Product added success", data: data });
                    }
                }))


        }
    })
});




//NOTE - updateProduct
app.put("/updateProduct", (req, res) => {
    const { pName, pDescription, price, createdby } = req.body;
    const checkQuery = `SELECT * FROM Products WHERE pName = ? AND createdby= ? `;
    connection.execute(checkQuery, [pName, createdby], (err, data) => {
        //NOTE - proper parameter binding
        if (err) {
            res.status(500).send({ message: "Connection failed", error: err });
        } else {
            if (data.length === 0) {
                res.status(409).json({ message: "Product not found or unauthorized", data });
            } else {
                const updateQuery = `UPDATE Products SET pName = ?, pDescription = ?, price = ?, createdby= ? WHERE pName = ?`;
                connection.execute(updateQuery, [pName, pDescription, price, createdby, pName], (err, data) => {
                    if (err) {
                        res.status(500).send({ message: "Connection failed", error: err });
                    } else {
                        res.status(200).send({ message: "Product updated successfully", data: data });
                    }
                });
            }
        }
    });
});




//NOTE - deleteProduct
app.delete("/deleteProduct", (req, res) => {
    const { pName, createdby } = req.body;
    const checkQuery = `SELECT * FROM products WHERE pName = ? AND createdBy = ?`;
    connection.execute(checkQuery, [pName, createdby], (err, data) => {
        if (err) {
            res.status(500).send({ message: "Connection failed", error: err });
        } else {
            if (data.length === 0) {
                res.status(409).json({ message: "Product not found or unauthorized", data });
            } else {
                const deleteQuery = `DELETE FROM products WHERE pName = ? AND createdBy = ?`;
                connection.execute(deleteQuery, [pName, createdby], (err, data) => {
                    if (err) {
                        res.status(500).send({ message: "Connection failed", error: err });
                    } else {
                        res.status(200).send({ message: "Product deleted successfully", data });
                    }
                });
            }
        }
    });
});





//NOTE - Search
app.get('/searchProduct', (req, res) => {

    const searchQuery = "select * from Products where price >3000";
    connection.execute(searchQuery, (err, data) => {
        if (err) {
            res.send({ "message": "connection failed", err });
        }
        else {
            if (data.length === 0) {
                res.send({ "message": "no Product found", data });

            }
            else {
                res.send({ "message": "connection success", data });
            }
        }
    });

});





app.listen(port, () => console.log(`Server is listening on port ${port}!`))