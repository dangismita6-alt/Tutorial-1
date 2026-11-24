import open from "open";
import tls from "node:tls";

const options = {
  host: "localhost",
  port: 8443,
  rejectUnauthorized: false,
};

const socket = tls.connect(options, () => {
  console.log("Connected to Caddy server!");

  socket.write(
    "GET /static/pieces/wK.svg HTTP/1.1\r\n" +
    "Host: localhost\r\n" +
    "Connection: close\r\n\r\n"
  );
});

let response = "";

socket.on("data", (data) => {
  response += data.toString();
});

socket.on("end", async () => {
  console.log(response);

  await open("https://localhost:8443/static/pieces/wK.svg");
});

socket.on("error", (error) => {
  console.error("Connection error:", error.message);
});