import React, { useCallback, useEffect, useMemo } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { UncontrolledTooltip } from "reactstrap";
import { VscGraph } from "react-icons/vsc";
import { IoIosOptions } from "react-icons/io";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { IoLogoIonic } from "react-icons/io";
import graph from "../../assets/animation/graph.json";
import PlaceAnimation from "../../components/PlaceAnimation";
import Select from "react-select";
import { useRedux } from "../../hooks";
import {
  getPortfolio,
  getScenarios,
  getAllPortfolios,
  setActivePage,
} from "../../redux/actions";
import { Commitments } from "./Commitments";
import { Scenarios } from "./Scenarios";
import { Projections } from "./Projections";

export const Dashboard = () => {
  const customStyles = {
    control: () => ({
      width: "300px",
      display: "flex",
      borderRadius: "6px",
      background: "white",
      padding: "6px 3px 3px 6px",
      border: "1px solid lighten(#737373 , 2%)",
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
      color: "#BDBDBD",
      fontWeigth: "0rem",
      alignItems: "center",
      justifyContent: "center",
      justifySelf: "center",
      alignSelf: "center",
    }),
    option: () => ({
      cursor: "pointer",
      fontSize: "14px",
      marginBottom: "2px",
      padding: "10px",
      color: "#BDBDBD",
      "&:hover": {
        background: "#cfdda3",
        color: "black",
      },
    }),
    menuList: () => ({
      background: "#737373",
      color: "#BDBDBD",
      paddingBottom: "2px",
    }),
  };

  const { dispatch, useAppSelector } = useRedux();

  const { portfolio, selectedPortfolio, selectedPage } = useAppSelector(
    (state) => ({
      portfolio: state.Data.portfolios,
      selectedPortfolio: state.Data.selectedPortfolio,
      selectedPage: state.Pages.activePage,
    })
  );

  useEffect(() => {
    dispatch(getAllPortfolios());
  }, []);

  const portfolioOptions = useMemo(() => {
    return portfolio?.data?.portfolios?.map?.((item: any) => ({
      value: item !== null && item,
      label: item !== null && item,
    }));
  }, [portfolio]);

  const onChangeSelect = useCallback(
    (value: any) => {
      dispatch(getPortfolio(value?.label));
      dispatch(getScenarios(value?.label));
      dispatch(setActivePage("commitments"));
    },
    [portfolio]
  );

  return (
    <>
      <div className="container-fluid bg-dashboard">
        <div className="row">
          <div className="col-sm-auto bg-second sticky-top">
            <div className="d-flex flex-sm-column  flex-md-colum flex-lg-column bg-second flex-row flex-nowrap bg-light align-items-center $zindex-sticky">
              <a
                href="/"
                className="d-block p-3 link-dark text-decoration-none"
                title=""
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Icon-only"
              ></a>
              <ul className="nav nav-pills  color-primary nav-flush flex-sm-column  flex-md-colum flex-lg-column flex-row flex-nowrap mb-auto mx-auto ">
                <li className="nav-item color-primary">
                  <UncontrolledTooltip target="tamarix">
                    Tamarix
                  </UncontrolledTooltip>
                  <a
                    href={process.env.REACT_APP_URL}
                    className="nav-link py-3 px-2 "
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    id="tamarix"
                  >
                    <IoLogoIonic size={20} />
                  </a>
                </li>
                {selectedPortfolio !== null && (
                  <>
                    <li>
                      <UncontrolledTooltip target="commitments">
                        Existing commitments
                      </UncontrolledTooltip>
                      <a
                        className="nav-link pointer py-3 px-2 cursor-pointer color-primary"
                        title=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        id="commitments"
                        onClick={() => dispatch(setActivePage("commitments"))}
                      >
                        <VscGraph size={20} />
                      </a>
                    </li>
                    <li>
                      <UncontrolledTooltip target="scenarios">
                        Scenarios
                      </UncontrolledTooltip>
                      <a
                        className="nav-link pointer py-3 px-2 color-primary"
                        title=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        id="scenarios"
                        onClick={() => dispatch(setActivePage("scenarios"))}
                      >
                        <IoIosOptions size={20} />
                      </a>
                    </li>
                    <li>
                      <UncontrolledTooltip target="projections">
                        Projections
                      </UncontrolledTooltip>
                      <a
                        className="nav-link pointer py-3 px-2 color-primary"
                        title=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        id="projections"
                        onClick={() => dispatch(setActivePage("projections"))}
                      >
                        <AiOutlineFundProjectionScreen size={20} />
                      </a>
                    </li>
                    <li>
                      <UncontrolledTooltip target="portfolio">
                        Change portfolio
                      </UncontrolledTooltip>
                      <a
                        className="nav-link py-3 pointer flex px-2 color-primary"
                        title=""
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        id="portfolio"
                        onClick={() =>
                          dispatch(setActivePage("change_portfolio"))
                        }
                      >
                        <FaExchangeAlt size={20} />
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="col-sm-10 p-4 min-vh-100">
            {selectedPortfolio && selectedPage === "commitments" && (
              <Commitments />
            )}
            {
              selectedPortfolio === null && 
              (
                <div
                className="align-items-center justify-content-center align-content-center d-flex-col text-center relative m-5"
                style={{ height: "200px" }}
              >
                <div className="mt-5">
                  <PlaceAnimation url={graph} height={200} />
                </div>
                <div className="align-items-center d-flex text-center justify-content-center align-content-center row">
                  <h2 className="text-muted m-5">Select a portfolio</h2>
                  <Select
                    isClearable={false}
                    styles={customStyles}
                    placeholder={<div className="font-label">Choose one</div>}
                    options={portfolioOptions}
                    className="font-label align-content-center justify-content-center d-flex "
                    onChange={(value) => onChangeSelect(value)}
                    maxMenuHeight={200}
                    menuPosition="fixed"
                    menuShouldScrollIntoView={false}
                  />
                </div>
              </div>
              )
            }
            {selectedPage === "change_portfolio" && selectedPortfolio !== null && (
              <div
                className="align-items-center justify-content-center align-content-center d-flex-col text-center relative m-5"
                style={{ height: "200px" }}
              >
                <div className="mt-5">
                  <PlaceAnimation url={graph} height={200} />
                </div>
                <div className="align-items-center d-flex text-center justify-content-center align-content-center row">
                  <h2 className="text-muted m-5">Select a portfolio</h2>
                  <Select
                    isClearable={false}
                    styles={customStyles}
                    placeholder={<div className="font-label">Choose one</div>}
                    options={portfolioOptions}
                    className="font-label align-content-center justify-content-center d-flex "
                    onChange={(value) => onChangeSelect(value)}
                    maxMenuHeight={200}
                    menuPosition="fixed"
                    menuShouldScrollIntoView={false}
                  />
                </div>
              </div>
            )}
            {selectedPage === "scenarios" && <Scenarios />}
            {selectedPage === "projections" && <Projections />}
          </div>
        </div>
      </div>
    </>
  );
};
