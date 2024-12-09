import AccessService from "../services/access.service";
import { SuccessResponse, CREATED } from "../core/success.response";
import { BadRequestError } from "../core/error.response";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log("Access requet ", req.body);
      return new CREATED({
        message: "Register Ok",
        metadata: await AccessService.signUp(req.body),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  signIn = async (req, res, next) => {
    try {
      console.log("loginBody ", req.body);
      const { email } = req.body.email;
      if (!email) {
        throw new BadRequestError("Email missing");
      }
      const sendData = Object.assign({ requestId: req.requestId }, req.body);

      return new SuccessResponse({
        message: "Login ok",
        metadata: await AccessService.signIn(sendData),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  // signInWithFacebook = async (req, res, next) => {
  //   try {
  //     console.log("loginBody ", req.body);
  //     console.log("req", req)
  //     // const { email } = req.body.email;
  //     // if (!email) {
  //     //   throw new BadRequestError("Email missing");
  //     // }
  //     // const sendData = Object.assign({ requestId: req.requestId }, req.body);

  //     // return new SuccessResponse({
  //     //   message: "Login ok",
  //     //   metadata: await AccessService.signIn(sendData),
  //     // }).send(res);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // signInWithGoogle = async (req, res, next) => {
  //   try {
  //     console.log("loginBody ", req.body);
  //     const { email } = req.body.email;
  //     if (!email) {
  //       throw new BadRequestError("Email missing");
  //     }
  //     const sendData = Object.assign({ requestId: req.requestId }, req.body);

  //     return new SuccessResponse({
  //       message: "Login ok",
  //       metadata: await AccessService.signIn(sendData),
  //     }).send(res);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  logOut = async (req, res, next) => {
    try {
      console.log("loginBody ", req.keyStore);
      return new SuccessResponse({
        message: "Logout ok",
        metadata: await AccessService.logOut(req.keyStore),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };

  handleRefreshToken = async (req, res, next) => {
    try {
      console.log("loginBody ", req.keyStore);
      return new SuccessResponse({
        message: "RefreshToken Ok",
        metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
      }).send(res);
    } catch (e) {
      console.error(e);
    }
  };
}

export default new AccessController();
