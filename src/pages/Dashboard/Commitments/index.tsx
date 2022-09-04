import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import DataCard from "../../../components/DataCard";
import { useRedux } from "../../../hooks";
import { FiFilter } from "react-icons/fi";
import { ChartLines, ChartPie } from "../../../components/Chart";
import { DashboardHeader } from "../DashboardHeader";
import { ResponsiveContainer } from "recharts";

export const Commitments = () => {
  const { dispatch, useAppSelector } = useRedux();

  const { selectedPortfolio } = useAppSelector((state) => ({
    portfolio: state.Data.portfolios,
    selectedPortfolio: state.Data.selectedPortfolio,
  }));

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

  const [calls, setCalls] = useState(
    selectedPortfolio?.data?.port_data["Total called"]
  );
  const [distributions, setDistributions] = useState(
    selectedPortfolio?.data?.port_data["Total distributed "]
  );
  const [navFund, setNavFund] = useState(
    selectedPortfolio?.data?.port_data["NAV"]
  );
  const [nameFund, setNameFund] = useState(
    selectedPortfolio?.data?.port_data["Fund name"]
  );
  const [tvpiFund, setTvpiFund] = useState([]);
  const [strategy, setStrategy] = useState(
    selectedPortfolio?.data?.port_data["Strategy"]
  );
  const [strategyCounter, setStrategyCounter] = useState([]);
  const [vintage, setVintage] = useState(
    selectedPortfolio?.data?.port_data["Vintage"]
  );
  const [vintageCounter, setVintageCounter] = useState([]);
  const [currency, setCurrency] = useState(
    selectedPortfolio?.data?.port_data["Currency"]
  );
  const [currencyCounter, setCurrencyCounter] = useState([]);

  const commitmentsCounter = useMemo(() => {
    let initialValue = 0;
    var arrayCommitments = Object.keys(
      selectedPortfolio?.data?.port_data["Commitment "]
    ).map(function (key) {
      return selectedPortfolio?.data?.port_data["Commitment "][key];
    });
    return arrayCommitments.reduce?.((a: any, b: any) => a + b, initialValue);
  }, [selectedPortfolio]);

  const totalCalled = useMemo(() => {
    let initialValue = 0;
    var array = Object.keys(
      selectedPortfolio?.data?.port_data["Total called"]
    ).map(function (key) {
      return selectedPortfolio?.data?.port_data["Total called"][key];
    });
    return array.reduce?.((a: any, b: any) => a + b, initialValue);
  }, [selectedPortfolio]);

  const totalUnfuded = useMemo(() => {
    let initialValue = 0;
    var array = Object.keys(
      selectedPortfolio?.data?.port_data["Commitment "]
    ).map(function (key) {
      return selectedPortfolio?.data?.port_data["Commitment "][key];
    });
    return commitmentsCounter - totalCalled;
  }, [selectedPortfolio]);

  const totalDistribution = useMemo(() => {
    let initialValue = 0;
    var array = Object.keys(
      selectedPortfolio?.data?.port_data["Total distributed "]
    ).map(function (key) {
      return selectedPortfolio?.data?.port_data["Total distributed "][key];
    });
    return array.reduce?.((a: any, b: any) => a + b, initialValue);
  }, [selectedPortfolio]);

  const NAV = useMemo(() => {
    let initialValue = 0;
    var array = Object.keys(selectedPortfolio?.data?.port_data["NAV"]).map(
      function (key) {
        return selectedPortfolio?.data?.port_data["NAV"][key];
      }
    );
    return array.reduce?.((a: any, b: any) => a + b, initialValue);
  }, [selectedPortfolio]);

  const TVPI = useMemo(() => {
    return (totalDistribution + NAV) / totalCalled;
  }, [selectedPortfolio]);

  const TVPIPortfolio = useMemo(() => {
    let newList = [{}];
    if (distributions && navFund && calls && nameFund) {
      for (
        let i = 0;
        i < Object.keys(selectedPortfolio?.data?.port_data["NAV"])?.length;
        i++
      ) {
        newList.push({
          Fund: nameFund[i],
          Tvpi: ((distributions[i] + navFund[i]) / calls[i]).toFixed(2),
        });
        setTvpiFund(newList as any);
      }
    }
  }, [selectedPortfolio, distributions, navFund, nameFund, calls]);

  const strategyPer = useMemo(() => {
    let newList = [{}];
    if (strategy) {
      var array = Object.keys(
        selectedPortfolio?.data?.port_data["Strategy"]
      ).map(function (key) {
        return selectedPortfolio?.data?.port_data["Strategy"][key];
      });
      let uniqueValues = [...(new Set(array) as any)];
      for (let i = 0; i < Object.keys(uniqueValues)?.length; i++) {
        newList.push({
          name: uniqueValues[i],
          value: array.filter((x) => x == uniqueValues[i]).length,
        });
      }
      newList.shift();
      setStrategyCounter(newList as any);
    }
  }, [selectedPortfolio, strategy]);

  const vintagePer = useMemo(() => {
    let newList = [{}];
    if (strategy) {
      var array = Object.keys(
        selectedPortfolio?.data?.port_data["Vintage"]
      ).map(function (key) {
        return selectedPortfolio?.data?.port_data["Vintage"][key];
      });
      let uniqueValues = [...(new Set(array) as any)];
      for (let i = 0; i < Object.keys(uniqueValues)?.length; i++) {
        newList.push({
          name: uniqueValues[i],
          value: array.filter((x) => x == uniqueValues[i]).length,
        });
      }
      newList.shift();
      setVintageCounter(newList as any);
    }
  }, [selectedPortfolio, vintage]);

  const currencyPer = useMemo(() => {
    let newList = [{}];
    if (strategy) {
      var array = Object.keys(
        selectedPortfolio?.data?.port_data["Currency"]
      ).map(function (key) {
        return selectedPortfolio?.data?.port_data["Currency"][key];
      });
      let uniqueValues = [...(new Set(array) as any)];
      for (let i = 0; i < Object.keys(uniqueValues)?.length; i++) {
        newList.push({
          name: uniqueValues[i],
          value: array.filter((x) => x == uniqueValues[i]).length,
        });
      }
      newList.shift();
      setCurrencyCounter(newList as any);
    }
  }, [selectedPortfolio, currency]);

  var countValuesInObj = (obj: any, value: any) => {
    var count = 0;
    for (const property in obj) {
      if (typeof obj[property] === "object") {
        count = count + countValuesInObj(obj[property], value);
      }

      if (obj[property] === value) {
        return 1; // count = count + 1; // count++;
      }
    }
    return count;
  };


  return (
    <div className="p-5">
        <DashboardHeader
          title="Existing Commitments"
          subtitle="Summary statistics"
        />
      <Row>
        <div className="mt-5 card-group flex-column flex-sm-column flex-md-row flex-lg-row gap-3 align-items-center justify-content-center  ">
          <div className="card bg-second rounded-3">
            {selectedPortfolio?.data?.port_data["Fund name"] && (
              <DataCard
                title={String(
                  Object.keys(selectedPortfolio?.data?.port_data["Fund name"])
                    .length
                )}
                subtitle="Funds"
              />
            )}
          </div>
          <div className="card bg-second rounded-3">
            {selectedPortfolio?.data?.port_data["Fund name"] && (
              <DataCard
                title={String(
                  Object.keys(selectedPortfolio?.data?.port_data["Strategy"])
                    .length
                )}
                subtitle="Strategy"
              />
            )}
          </div>
          <div className="card bg-second rounded-3">
            {selectedPortfolio?.data?.port_data?.["Commitment "] && (
              <DataCard
                title={`$${nFormatter(commitmentsCounter, 3)}`}
                subtitle="Total committed"
              />
            )}
          </div>
          <div className="card bg-second rounded-3">
            {selectedPortfolio?.data?.port_data?.["Total called"] &&
              selectedPortfolio?.data?.port_data?.["Commitment "] && (
                <DataCard
                  title={`$${nFormatter(totalUnfuded, 3)}`}
                  subtitle="Total unfunded"
                />
              )}
          </div>
          <div className="card bg-second rounded-3">
            {selectedPortfolio?.data?.port_data?.["NAV"] && (
              <DataCard title={`$${nFormatter(NAV, 3)}`} subtitle="NAV" />
            )}
          </div>
          <div className="card bg-second rounded-3">
            {selectedPortfolio?.data?.port_data?.["Total called"] &&
              selectedPortfolio?.data?.port_data["Total distributed "] &&
              selectedPortfolio?.data?.port_data?.["NAV"] && (
                <DataCard title={`${TVPI.toFixed(2)}x`} subtitle="TVPI" />
              )}
          </div>
          {/* <DataCard title="$112.40m" subtitle="Total committed" />
          <DataCard title="4" subtitle="Strategy" />
          <DataCard title="20" subtitle="Funds" />
          <DataCard title="$112.40m" subtitle="Total committed" />
          <DataCard title="4" subtitle="Strategy" /> */}
        </div>
        <div className="mt-5 card-group d-inline-flex flex-column  align-items-start justify-content-start  flex-lg-row flex-md-column flex-sm-column">
          <Button className="bg-second border-second  text-muted ms-2">
            <FiFilter /> Filters
          </Button>
        </div>
        <div className="container ">
          <div className="row justify-content-md-center flex-lg-wrap  flex-md-wrap ">

            <Row className="col-sm flex flex-lg-wrap flex-md-wrap ">
              <Col sm={12} lg={4} md={4}>
              {" "}
              {/* <ResponsiveContainer width="99%" > */}
              <ChartPie
                data={strategyCounter}
                nameKey="name"
                innerRadius='45%'
                outerRadius='60%'
                paddingAngle={5}
                dataKey="value"
                colors={["#cfdda3", "#98a377", "#b2b299", "#b8ba68"]}
              />
              </Col>
              {/* </ResponsiveContainer> */}
              {/* <ResponsiveContainer width="99%" > */}
              <Col sm={12} lg={4} md={4}>
              <ChartPie
                nameKey="name"
                data={vintageCounter}
                innerRadius='45%'
                outerRadius='60%'
                paddingAngle={4}
                dataKey="value"
                colors={["#cfdda3", "#98a377", "#b2b299", "#b8ba68"]}
              />
              </Col>
              {/* </ResponsiveContainer> */}
              {/* <ResponsiveContainer width="99%" > */}
                      <Col sm={12} lg={4} md={4}>

              <ChartPie
                nameKey="name"
                data={currencyCounter}
                innerRadius='45%'
                outerRadius='60%'
                paddingAngle={5}
                dataKey="value"
                colors={["#cfdda3", "#98a377", "#b2b299", "435050"]}
              />
              </Col>
              {/* </ResponsiveContainer> */}

           
          </Row>
          </div>
        </div>
        <div
          className="bg-second mt-5"
          style={{
            height: "300px",
            borderRadius: "10px",
          }}
        >
          {" "}
          <ChartLines
            YDataName="TVPI"
            XDataName="Count"
            data={tvpiFund}
            YDataKey="Fund"
            XDataKey="Tvpi"
            YColor="#a9cfa8"
            XColor="#668F93"
          />
        </div>
      </Row>
    </div>
  );
};
