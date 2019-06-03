// Require pool for our testing purposes //
const pool = require("../database/configuration")

module.exports = {

    getIndex: (req, res) => {
        res.render("index");
    },


    getResults: (req, res) => {
        pool
            .connect()
            .then(client => {
                return client
                    .query("select * from messages")
                    .then(results => {
                        client.release();
                        res.render("results", {
                            allMessages: results.rows
                        })
                    })
                    .catch(error =>
                        console.error(
                            `Something went wrong with rendering all messages${error.stack}`
                        )
                    )
            })
            .catch(error =>
                console.error(
                    `Something went wrong while connecting to pool ${error.stack}`
                )
            )
    },

    addPostToDatabase: (req, res) => {
        pool
            .connect()
            .then(client => {
                return client
                    .query(`insert into messages(title, body) values($1,$2)`,
                        [
                            req.body.newTitle,
                            req.body.newBody
                        ])
                    .then(results => {
                        client.release();
                        res.redirect("/results")

                    })
                    .catch(err => console.error(`Query don't work ${err.stack}`))
            }).catch(err => console.error(`Connect don't work ${err.stack}`))
    }
};