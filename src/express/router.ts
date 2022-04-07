import { Router } from "express";
import { PathParams } from "express-serve-static-core";

export default abstract class ExpressRouter {
  abstract readonly path: PathParams;
  abstract readonly router: Router;
}
