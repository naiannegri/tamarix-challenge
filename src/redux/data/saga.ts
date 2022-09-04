import { takeEvery, fork, put, all, call } from "redux-saga/effects";
//Account Redux states
import { DataActionTypes } from "./types";
import {
  dataApiResponseSuccess,
  dataApiResponseError,
} from "./actions";

import {
  getAllPortfolios as getAllPortfoliosApi,
  getPortfolio as getPortfolioApi,
  getScenarios as getScenariosApi,
  getScenario as getScenarioApi,
  updateScenario as updateScenarioApi,
  createForecasts as createForecastsApi
 } from "../../services";
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


function* getAllPortfolios() {
  try {
    const response: Promise<any> = yield call(getAllPortfoliosApi);
    yield put(
      dataApiResponseSuccess(
        DataActionTypes.GET_ALL_PORFOLIOS,
        response
      )
    );
  } catch (error: any) {
    yield put(
      dataApiResponseError(DataActionTypes.GET_ALL_PORFOLIOS, error)
    );
  }
}

function* getPortfolio({ payload: params }: any) {
  try {
    const response: Promise<any> = yield call(getPortfolioApi, params);
    yield put(
      dataApiResponseSuccess(
        DataActionTypes.GET_PORTFOLIO,
        response
      )
    );
  } catch (error: any) {
    yield put(
      dataApiResponseError(DataActionTypes.GET_PORTFOLIO, error)
    );
  }
}

function* getScenarios({ payload: params }: any) {
  try {
    const response: Promise<any> = yield call(getScenariosApi, params);
    yield put(
      dataApiResponseSuccess(
        DataActionTypes.GET_SCENARIOS,
        response
      )
    );
  } catch (error: any) {
    yield put(
      dataApiResponseError(DataActionTypes.GET_SCENARIOS, error)
    );
  }
}

function* getScenario({ payload: params }: any) {
  try {
    const response: Promise<any> = yield call(getScenarioApi, params);
    yield put(
      dataApiResponseSuccess(
        DataActionTypes.GET_SCENARIO,
        response
      )
    );
  } catch (error: any) {
    yield put(
      dataApiResponseError(DataActionTypes.GET_SCENARIO, error)
    );
  }
}

function* updateScenario({ payload: params }: any) {
  try {
    const response: Promise<any> = yield call(updateScenarioApi, params);
    yield put(
      dataApiResponseSuccess(
        DataActionTypes.UPDATE_SCENARIO,
        response
      )
    );
    toast.success("Scenario updated!");
  } catch (error: any) {
    yield put(
      dataApiResponseError(DataActionTypes.UPDATE_SCENARIO, error)
    );
    toast.error(error);
  }
}

function* createForecast({ payload: params }: any) {
  try {
    const response: Promise<any> = yield call(createForecastsApi, params);
    yield put(
      dataApiResponseSuccess(
        DataActionTypes.CREATE_FORECAST,
        response
      )
    );
    toast.success("Forecast created!");
  } catch (error: any) {
    yield put(
      dataApiResponseError(DataActionTypes.CREATE_FORECAST, error)
    );
    toast.error(error);
  }
}


export function* watchGetAllPortfolios() {
  yield takeEvery(DataActionTypes.GET_ALL_PORFOLIOS, getAllPortfolios);
}
export function* watchGetPortfolio() {
  yield takeEvery(DataActionTypes.GET_PORTFOLIO, getPortfolio);
}
export function* watchGetScenarios() {
  yield takeEvery(DataActionTypes.GET_SCENARIOS, getScenarios);
}
export function* watchGetScenario() {
  yield takeEvery(DataActionTypes.GET_SCENARIO, getScenario);
}
export function* watchUpdateScenario() {
  yield takeEvery(DataActionTypes.UPDATE_SCENARIO, updateScenario);
}
export function* watchCreateForecast() {
  yield takeEvery(DataActionTypes.CREATE_FORECAST, createForecast);
}


function* dataSaga() {
  yield all([
    fork(watchGetAllPortfolios),
    fork(watchGetPortfolio),
    fork(watchGetScenarios),
    fork(watchGetScenario),
    fork(watchUpdateScenario),
    fork(watchCreateForecast),
  ]);
}

export default dataSaga;

