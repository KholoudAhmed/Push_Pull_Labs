const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const messages = [];

app.post("/messages", (req, res) => {
  const { body } = req;
  messages.push(body);
  res.sendStatus(204);
});


app.get("/messages/:length", (req, res) => {
  const { length } = req.params;
  res.json(messages.slice(length));
});

const subscribers = {};
app.get("/long", (req, res) => {
  const id = Math.ceil(Math.random() * 10000);
  subscribers[id] = res;
});

app.post("/long", (req, res) => {
  console.log(subscribers);
  const { body } = req;
  Object.entries(subscribers).forEach(([id, response]) => {
    console.log(response);
    response.json(body);
    delete subscribers[id];
  });
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
