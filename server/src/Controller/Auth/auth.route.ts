import express, { Router } from 'express'
import AuthController from './auth.controller';


class AuthRouter {
    private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController =new AuthController;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/signup', this.authController.Signup);
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRouter().getRouter();
