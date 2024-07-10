import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
const PORT = 3000;

const clientId = "6085fb4a43d6e7f91833";
const clientSecret = "bdce0b67b6d997341032b694b3b1e75a78c58a90";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/exchange-token", async (req, res) => {
  const { code } = req.body;
  const tokenUrl = "https://github.com/login/oauth/access_token";

  try {
    const response = await axios.post(
      tokenUrl,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: "http://localhost:5500",
      },
      {
        headers: {
          "Accept": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to exchange code for access token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
