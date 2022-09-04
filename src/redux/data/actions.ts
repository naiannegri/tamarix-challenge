import { DataActionTypes } from "./types";

// common success
export const dataApiResponseSuccess = (
  actionType: string,
  data: any
) => ({
  type: DataActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// common error
export const dataApiResponseError = (
  actionType: string,
  error: string
) => ({
  type: DataActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});



  export const getAllPortfolios = () => {
    return {
      type: DataActionTypes.GET_ALL_PORFOLIOS
    };
  };
  
export const getPortfolio = (portName: string) => {
    return {
      type: DataActionTypes.GET_PORTFOLIO,
      payload: { portName },
    };
  };
  
export const getScenarios = (portName: string) => {
    return {
      type: DataActionTypes.GET_SCENARIOS,
      payload: { portName },
    };
  };
  
export const getScenario = (portName: string, scenarioName:string) => {
    return {
      type: DataActionTypes.GET_SCENARIO,
      payload: { portName, scenarioName },
    };
  };
  
export const updateScenario = (portName: string, scenarioName:string, data:{}) => {
  console.log('action')
    return {
      type: DataActionTypes.UPDATE_SCENARIO,
      payload: { portName, scenarioName, data },
    };
  };
  
export const createForecast = ( data:{}) => {
    return {
      type: DataActionTypes.CREATE_FORECAST,
      payload: { data },
    };
  };
  
export const setShowOptions = (showOptions:boolean) => {
    return {
      type: DataActionTypes.SHOW_OPTIONS,
      payload: { showOptions },
    };
  };
  
  
export const setShowForecast = (showForecast:boolean) => {
    return {
      type: DataActionTypes.SHOW_FORECAST,
      payload: { showForecast },
    };
  };
  