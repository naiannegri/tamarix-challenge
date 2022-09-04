export enum DataActionTypes {
  API_RESPONSE_SUCCESS = "@@data/API_RESPONSE_SUCCESS",
  API_RESPONSE_ERROR = "@@data/API_RESPONSE_ERROR",

  GET_ALL_PORFOLIOS = "@@data/GET_ALL_PORFOLIOS",
  GET_PORTFOLIO = "@@data/GET_PORTFOLIO",
  GET_SCENARIOS = "@@data/GET_SCENARIOS",
  GET_SCENARIO = "@@data/GET_SCENARIO",
  UPDATE_SCENARIO = "@@data/UPDATE_SCENARIO",
  CREATE_FORECAST = "@@data/CREATE_FORECAST",
  SHOW_OPTIONS = "@@data/SHOW_OPTIONS",
  SHOW_FORECAST = "@@data/SHOW_FORECAST"
}

export type IData = {
  _id: string;
  username: string;
  status: number;
  statusText: string;
  portfolios: [];
  port_name:string;
  port_data: any;
    scenarios: ["Baseline", "Downside", "Upside"];
    portfolio_name: string;
    scenario_name:string;
    port_settings:{
      multi_asset:boolean;
      evergreen:boolean;
      taxonomy:[];
      currency:string;
      commitment_horizon:number;
      exposure_metrics:[];
      cash_flow_metrics:[]
    }
};

export type IPortfolios = {
  data: IData;
  status: number;
  statusText: string;
  config: any;
  headers: {};
};

export type IScenarios = {
  data: {
    scenarios: ["Baseline", "Downside", "Upside"];
    portfolio_name: string;
    scenario_name:string;
    port_settings:{
      multi_asset:boolean;
      evergreen:boolean;
      taxonomy:[];
      currency:string;
      commitment_horizon:number;
      exposure_metrics:[];
      cash_flow_metrics:[]
    }
    scenario_data: {
      rates: {
        "call speed": string;
        "distribution speed": string;
      };
      cmas: {
        Buyout: number;
        Growth: number;
        Venture: number;
        Infrastructure: number;
      };
      overrides: {};
    };
  };
};

export type IForecast = {
  data:{
    portfolio:any
  }
}

export interface DataState {
  readonly portfolios: IPortfolios | null;
  readonly selectedPortfolio: IPortfolios | null;
  readonly scenarios: IScenarios | null;
  readonly selectedScenario: IScenarios | null;
  readonly forecast: IForecast | null;
  readonly showOptions:boolean;
  readonly callsSpeed:string | null;
  readonly distributionSpeed:string | null;
  readonly cmas: {Buyout: number; Growth: number; Venture: number; Infrastructure:number;} | null;
  readonly overrides: any;
  readonly showForecast: boolean;
}
