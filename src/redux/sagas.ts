import { all } from "redux-saga/effects";

//auth
import registerSaga from "./auth/register/saga";
import dataSaga from "./data/saga";


export default function* rootSaga() {
  yield all([
    dataSaga(),
  
  ]);
}
