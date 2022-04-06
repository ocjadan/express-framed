export default class Environment {
  readonly port = 3000;
  readonly env = process.env.NODE_EV || "development";
}
