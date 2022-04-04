import * as express from "express";

export default class Application {
  private port = 3000;
  private app = express();

  start() {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
