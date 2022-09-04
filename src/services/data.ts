import APIClient from "./api";
import * as url from "./urls";

const api = new APIClient();

const getAllPortfolios = () => {
  return api.get(`${url.USERS}${url.ME}${url.PORTFOLIOS}`);
};

const getPortfolio = (params: any) => {
  return api.get(`${url.USERS}${url.ME}${url.PORTFOLIOS}/${params?.portName}`);
};

const getScenarios = (params: any) => {
  return api.get(`${url.USERS}${url.ME}${url.PORTFOLIOS}/${params?.portName}${url.SCENARIOS}`);
};

const getScenario = (params: any) => {
  return api.get(`${url.USERS}${url.ME}${url.PORTFOLIOS}/${params?.portName}${url.SCENARIOS}/${params?.scenarioName}`);
};

const updateScenario = (params: any) => {
  return api.create(`${url.USERS}${url.ME}${url.PORTFOLIOS}/${params?.portName}${url.SCENARIOS}/${params?.scenarioName}`,{
    ...params?.data
  });
};

const createForecasts = (params: any) => {
  return api.create(`${url.USERS}${url.ME}${url.FORECAST}`,{
    ...params?.data
  });
};


export { 
    getAllPortfolios,
    getPortfolio,
    getScenarios,
    getScenario,
    updateScenario,
    createForecasts
};
