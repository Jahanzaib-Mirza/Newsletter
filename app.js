const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { error } = require("console");

const port = 9000;


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
})
app.post("/", (req, res) => {
    const data = {
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.firstName,
                    LNAME: req.body.lastName
                }
            }
        ]
    }
    const url = "https://us12.api.mailchimp.com/3.0/lists/52c6f36e17";
    const options = {
        method: "POST",
        auth: "zebi:105912c2f2ad1722215d9f7c482911f6-us12"
    }
    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200) res.sendFile(`${__dirname}/success.html`); 
        else res.sendFile(`${__dirname}/failure.html`);
        response.on("data", (data) => {
            const dataa = JSON.parse(data)            
        })
    })
    request.write(JSON.stringify(data))
    request.end();
    console.log(req.body);
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})









app.listen(process.env.PORT||port, () => {
    console.log(`Server running on port ${port}`);
})



//

// API Key
//
//Audience Id
//52c6f36e17