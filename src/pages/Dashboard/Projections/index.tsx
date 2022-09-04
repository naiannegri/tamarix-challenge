import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import DataCard from "../../../components/DataCard";
import { useRedux } from "../../../hooks";
import { FiFilter } from "react-icons/fi";
import { ChartLines, ChartPie, SliderRange } from "../../../components/Chart";
import { DashboardHeader } from "../DashboardHeader";
import {
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Select, { components } from "react-select";
import { getScenario } from "../../../redux/actions";
import { Controller, useForm } from "react-hook-form";
import RangeSlider from "react-bootstrap-range-slider";
import {
  createForecast,
  setShowOptions,
  updateScenario,
  setShowForecast,
} from "../../../redux/data/actions";
import { MdAssignmentReturned } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineTrendingUp } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { PORTFOLIOS } from "../../../services/urls";

export const Projections = () => {
  const customStyles = {
    control: () => ({
      width: "300px",
      display: "flex",
      borderRadius: "6px",
      background: "#333534",
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
    singleValue: (provided: any) => ({
      ...provided,
      color: "#BDBDBD",
    }),
  };

  const { dispatch, useAppSelector } = useRedux();

  const {
    selectedPortfolio,
    scenarios,
    selectedScenario,
    showForecast,
    forecast,
    portfolio,
  } = useAppSelector((state) => ({
    portfolio: state.Data.portfolios,
    selectedPortfolio: state.Data.selectedPortfolio,
    scenarios: state.Data.scenarios,
    selectedScenario: state.Data.selectedScenario,
    showForecast: state.Data.showForecast,
    forecast: state.Data.forecast,
  }));

  const [scenario, setScenario] = useState<any>();
  const [data, setData] = useState<any>();
  const [dataCalls, setDataCalls] = useState<any>();
  const [dataNav, setDataNav] = useState<any>();

  function removeDuplicates(originalArray: any, prop: any) {
    var newArray = [];
    var lookupObject: any = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  const scenarioOptions = useMemo(() => {
    return scenarios?.data?.scenarios?.map?.((item: any) => ({
      value: item !== null && item,
      label: item !== null && item,
    }));
  }, [scenarios]);

  const methods = useForm();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  function nFormatter(num: any, digits: number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  const onGenerateForecast = () => {
    dispatch(
      createForecast({
        scenario_name: scenario,
        metrics: ["nav", "calls - cum"],
        port_name: String(selectedPortfolio?.data?.port_name),
        roadmap: [],
      })
    );
    dispatch(setShowForecast(false));
  };

  const nameArr = useMemo(() => {
    if (
      forecast?.data?.portfolio["strategy"] !== null &&
      forecast?.data?.portfolio["strategy"] !== undefined
    ) {
      var array = Object?.keys?.(forecast?.data?.portfolio["strategy"])?.map?.(
        function (key) {
          return forecast?.data?.portfolio["strategy"][key];
        }
      );
      return array;
    }
  }, [forecast]);

  const portfoliosArr: any = useMemo(() => {
    if (
      portfolio?.data?.portfolios !== null &&
      portfolio?.data?.portfolios !== undefined
    ) {
      var array = Object?.keys?.(portfolio?.data?.portfolios)?.map?.(function (
        key: any
      ) {
        return portfolio?.data?.portfolios[key];
      });
      return array;
    }
  }, [portfolio]);

  // const dataForecast = useMemo(() => {
  //   let newList = [{}];
  //   if (nameArr) {
  //     Object.entries(forecast?.data?.portfolio["2021"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2021",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2022"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2022",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2023"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2023",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2024"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2024",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2025"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2025",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2026"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2026",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2027"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2027",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2028"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2028",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2029"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2029",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2030"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2030",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     Object.entries(forecast?.data?.portfolio["2031"] as any)?.map?.(
  //       ([key, subject], i) => {
  //         newList.push({
  //           Strategy: nameArr[i],
  //           Year: "2031",
  //           Values: subject,
  //         });
  //       }
  //     );
  //     setData(newList);
  //     console.log("data", newList);
  //   }
  // }, [forecast]);


  const dataForecastCalls = useMemo(() => {
    let newList = [{}];
    if (nameArr) {
      Object.entries(forecast?.data?.portfolio["2021"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2021",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2021"][2]
                : forecast?.data?.portfolio["2021"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2022"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2022",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2022"][2]
                : forecast?.data?.portfolio["2022"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2023"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2023",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2023"][2]
                : forecast?.data?.portfolio["2023"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2024"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2024",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2024"][2]
                : forecast?.data?.portfolio["2024"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2025"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2025",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2025"][2]
                : forecast?.data?.portfolio["2025"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2026"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2026",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2026"][2]
                : forecast?.data?.portfolio["2026"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2027"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2027",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2027"][2]
                : forecast?.data?.portfolio["2027"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2028"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2028",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2028"][2]
                : forecast?.data?.portfolio["2028"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2029"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2029",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2029"][2]
                : forecast?.data?.portfolio["2029"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2030"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2030",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2030"][2]
                : forecast?.data?.portfolio["2030"][13])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2031"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2031",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2031"][2]
                : forecast?.data?.portfolio["2031"][13])/1000,
          });
        }
      );
      newList = removeDuplicates(newList, "Values");
      newList.pop();
      setDataCalls(newList);
    }
  }, [forecast]);

  const dataForecastNav = useMemo(() => {
    let newList = [{}];
    if (nameArr) {
      Object.entries(forecast?.data?.portfolio["2021"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2021",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2021"][7]
                : forecast?.data?.portfolio["2021"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2022"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2022",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2022"][7]
                : forecast?.data?.portfolio["2022"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2023"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2023",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2023"][7]
                : forecast?.data?.portfolio["2023"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2024"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2024",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2024"][7]
                : forecast?.data?.portfolio["2024"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2025"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2025",
            Values:
             ( selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2025"][7]
                : forecast?.data?.portfolio["2025"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2026"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2026",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2026"][7]
                : forecast?.data?.portfolio["2026"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2027"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2027",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2027"][7]
                : forecast?.data?.portfolio["2027"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2028"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2028",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2028"][7]
                : forecast?.data?.portfolio["2028"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2029"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2029",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2029"][7]
                : forecast?.data?.portfolio["2029"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2030"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2030",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2030"][7]
                : forecast?.data?.portfolio["2030"][18])/1000,
          });
        }
      );
      Object.entries(forecast?.data?.portfolio["2031"] as any)?.map?.(
        ([key, subject], i) => {
          newList.push({
            Strategy: nameArr[i],
            Year: "2031",
            Values:
              (selectedPortfolio?.data?.port_name === String(portfoliosArr[0])
                ? forecast?.data?.portfolio["2031"][7]
                : forecast?.data?.portfolio["2031"][18])/1000,
          });
        }
      );
      newList = removeDuplicates(newList, "Values");
      newList.pop();
      setDataNav(newList);
    }
  }, [forecast]);

  return (
    <div className="p-5 align-items-center  justify-content-center align-content-center ">
      <DashboardHeader title="Projections" />
      <Row>
        <div className=" d-flex ms-2 d-inline-flex flex-lg-wrap flex-lg-row flex-column flex-sm-column flex-xm-column flex-md-column gap-3 ">
          <Select
            isClearable={false}
            styles={customStyles}
            placeholder={<div className="font-label">Select a scenario</div>}
            options={scenarioOptions}
            className="font-label mt-3 align-content-start justify-content-start d-flex "
            onChange={(value: any) => setScenario(value.label)}
            maxMenuHeight={200}
            menuPosition="fixed"
            menuShouldScrollIntoView={false}
          />
        </div>
      </Row>
      <Button
        className="bg-second border-second mt-3 ms-1 text-muted"
        onClick={onGenerateForecast}
      >
        Generate Forecast
      </Button>
      {showForecast && dataCalls && (
        <>
          <DashboardHeader subtitle="Calls - cum (x $1000 USD)" />
          <div
            className="bg-second mt-2"
            style={{
              height: "250px",
              borderRadius: "10px",
            }}
          >
            <ResponsiveContainer
              className="background-button-color rounded py-1 "
              width="100%"
              height="100%"
            >
              <BarChart width={600} height={300} data={dataCalls}>
                <XAxis dataKey="Year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Values"
                  stackId="a"
                  fill="#94c3a7"
                  fillOpacity={0.5}
                />
                <Bar
                  dataKey="Strategy"
                  stackId="a"
                  fill="#607575"
                  fillOpacity={0.5}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <DashboardHeader subtitle="NAV Exposure (x $1000 USD)" />

          <div
            className="bg-second mt-2"
            style={{
              height: "250px",
              borderRadius: "10px",
            }}
          >
            <ResponsiveContainer
              className="background-button-color rounded py-1 "
              width="100%"
              height="100%"
            >
              <BarChart width={600} height={300} data={dataNav}>
                <XAxis dataKey="Year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Values"
                  stackId="a"
                  fill="#94c3a7"
                  fillOpacity={0.5}
                />
                <Bar
                  dataKey="Strategy"
                  stackId="a"
                  fill="#607575"
                  fillOpacity={0.5}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};
