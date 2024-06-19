const express = require("express")

const app = express();

app.get('/', (rreq, resp) => {
    resp.send("WORKING");
})

app.listen(5000);