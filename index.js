
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/sanitize", (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' in request body" });
  }

  const sanitized = text
    .replace(/"/g, "\\\"")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "")
    .replace(/\t/g, "\\t");

  res.json({ sanitized });
});

app.listen(port, () => {
  console.log(`JSON sanitizer running on port ${port}`);
});
