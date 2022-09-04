import { DataActionTypes, DataState } from "./types";

export const INIT_STATE: DataState = {
  portfolios: null,
  selectedPortfolio: null,
  scenarios: null,
  selectedScenario: null,
  forecast:null,
  showOptions:false,
  callsSpeed:null,
  distributionSpeed:null,
  cmas: null,
  overrides: null,
  showForecast:false
};

const Data = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DataActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case DataActionTypes.GET_ALL_PORFOLIOS:
          return {
            ...state,
            portfolios: action.payload.data
          };
        case DataActionTypes.GET_PORTFOLIO:
          return {
            ...state,
            selectedPortfolio: action.payload.data
          };
        case DataActionTypes.GET_SCENARIOS:
          return {
            ...state,
            scenarios: action.payload.data
          };
        case DataActionTypes.GET_SCENARIO:
          return {
            ...state,
            showOptions:true,
            selectedScenario: action.payload.data,
            callsSpeed:action.payload.data.data.scenario_data.rates['call speed'],
            distributionSpeed:action.payload.data.data.scenario_data.rates['distribution speed'],
            cmas:action.payload.data.data.scenario_data.cmas,
            overrides:action.payload.data.data.scenario_data.overrides,
          };
        case DataActionTypes.UPDATE_SCENARIO:
          return {
            ...state,
            selectedScenarios: action.payload.data
          };
        case DataActionTypes.CREATE_FORECAST:
          return {
            ...state,
            forecast: action.payload.data,
            showForecast:true
          };
        default:
          return { ...state };
      }

    case DataActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case DataActionTypes.GET_ALL_PORFOLIOS:
          return {
            ...state,
            portfolioError: action.payload.error,
          };
        case DataActionTypes.GET_PORTFOLIO:
          return {
            ...state,
            portfolioError: action.payload.error,
          };
        case DataActionTypes.GET_SCENARIOS:
          return {
            ...state,
            scenariosError: action.payload.error,
          };
        case DataActionTypes.GET_SCENARIO:
          return {
            ...state,
            scenarioError: action.payload.error,
          };
        case DataActionTypes.UPDATE_SCENARIO:
          return {
            ...state,
            scenarioError: action.payload.error,
          };
        case DataActionTypes.CREATE_FORECAST:
          return {
            ...state,
            createForecast: action.payload.error,
          };
        default:
          return { ...state };
      }

    case DataActionTypes.GET_ALL_PORFOLIOS: {
      return {
        ...state,
        loading: true,
        isPortfolioFetched: false,
      };
    }
    case DataActionTypes.GET_PORTFOLIO: {
      return {
        ...state,
        loading: true,
        isPortfolioFetched: false,
      };
    }
    case DataActionTypes.GET_SCENARIOS: {
      return {
        ...state,
        loading: true,
        isScenariosFetched: false,
      };
    }
    case DataActionTypes.GET_SCENARIO: {
      return {
        ...state,
        loading: true,
        isScenarioFetched: false,
      };
    }
    case DataActionTypes.UPDATE_SCENARIO: {
      return {
        ...state,
        loading: true,
        isScenarioFetched: false,
      };
    }
    case DataActionTypes.CREATE_FORECAST: {
      return {
        ...state,
        loading: true,
        isForecastFetched: false,
      };
    }
    case DataActionTypes.SHOW_OPTIONS: {
      return {
        ...state,
        showOptions: action.payload.showOptions
      };
    }
    case DataActionTypes.SHOW_FORECAST: {
      console.log('show', action.payload)
      return {
        ...state,
        showForecast: action.payload.showForecast
      };
    }
    default:
      return { ...state };
  }
};

export default Data;
