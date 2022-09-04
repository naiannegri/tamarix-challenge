import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { setCookie } from "nookies";
//Account Redux states
import { AuthRegisterActionTypes } from "./types";
import {
  authRegisterApiResponseSuccess,
  authRegisterApiResponseError,
} from "./actions";

import {
  // registerUser as registerUserApi,
  // login as loginApi
 } from "../../../services";

 const myDomain = process.env.REACT_APP_PUBLIC_DOMAIN;


//Include Both Helper File with needed methods

// Is user register successfull then direct plot user in redux.
// function* registerUser({ payload: { user } }: any) {
//   try {
//     const response: Promise<any> = yield call(registerUserApi, user);
//     setCookie(null, "@NN.token",String(response), {
//       maxAge: 60 * 60 * 24,
//       url: myDomain,
//       path: "/",
//     })
//     yield put(
//       authRegisterApiResponseSuccess(
//         AuthRegisterActionTypes.REGISTER_USER,
//         response
//       )
//     );
//   } catch (error: any) {
//     yield put(
//       authRegisterApiResponseError(AuthRegisterActionTypes.REGISTER_USER, error)
//     );
//   }
// }

// function* login({ payload: {params} }: any) {
//   try {
//     const response: Promise<any> = yield call(loginApi, params);
//     yield put(
//       authRegisterApiResponseSuccess(
//         AuthRegisterActionTypes.LOGIN,
//         response
//       )
//     );
//   } catch (error: any) {
//     yield put(
//       authRegisterApiResponseError(AuthRegisterActionTypes.LOGIN, error)
//     );
//   }
// }

// export function* watchUserRegister() {
//   yield takeEvery(AuthRegisterActionTypes.REGISTER_USER, registerUser);
// }

// export function* watchLogin() {
//   yield takeEvery(AuthRegisterActionTypes.LOGIN, login);
// }

function* registerSaga() {
  yield all([
    // fork(watchUserRegister),
    // fork(watchLogin)
  ]);
}

export default registerSaga;

