import { PagesActionTypes } from "./types";



export const setActivePage = (activePage: "commitments" | "scenarios" | "projections" | "forecast" | "change_portfolio") => {
  return {
    type: PagesActionTypes.SET_ACTIVE_PAGE,
    payload: { activePage },
  };
};


export const setActiveTimelineStep = (activeStep: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12) => {
  return {
    type: PagesActionTypes.SET_ACTIVE_TIMELINE_STEP,
    payload: { activeStep },
  };
};

export const setActiveSubstep = (activeSubStep: boolean) => {
  return {
    type: PagesActionTypes.SET_ACTIVE_SUBSTEP,
    payload: { activeSubStep },
  };
};




