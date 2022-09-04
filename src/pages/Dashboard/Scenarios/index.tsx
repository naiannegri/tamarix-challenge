import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Input, Label, Row } from "reactstrap";
import DataCard from "../../../components/DataCard";
import { useRedux } from "../../../hooks";
import { FiFilter } from "react-icons/fi";
import { ChartLines, ChartPie, SliderRange } from "../../../components/Chart";
import { DashboardHeader } from "../DashboardHeader";
import { ResponsiveContainer } from "recharts";
import Select, { components } from "react-select";
import { getScenario } from "../../../redux/actions";
import { Controller, useForm } from "react-hook-form";
import RangeSlider from "react-bootstrap-range-slider";
import { setShowOptions, updateScenario } from "../../../redux/data/actions";
import { MdAssignmentReturned } from "react-icons/md"
import { FaTelegramPlane } from "react-icons/fa";
import {MdOutlineTrendingUp} from 'react-icons/md';
import Form from 'react-bootstrap/Form';

export const Scenarios = () => {
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
    showOptions,
    callSpeed,
    distributionSpeed,
    cmas,
    overrides,
  } = useAppSelector((state) => ({
    portfolio: state.Data.portfolios,
    selectedPortfolio: state.Data.selectedPortfolio,
    scenarios: state.Data.scenarios,
    selectedScenario: state.Data.selectedScenario,
    showOptions: state.Data.showOptions,
    callSpeed: state.Data.callsSpeed,
    distributionSpeed: state.Data.distributionSpeed,
    cmas: state.Data.cmas,
    overrides: state.Data.overrides,
  }));

  const options = ["Slow", "Average", "Fast"];
  const listFunds: number[] = []
  const [valueBuy, setValueBuy] = useState((cmas?.Buyout as any) * 100);
  const [valueGrow, setValueGrow] = useState((cmas?.Growth as any) * 100);
  const [valueVent, setValueVent] = useState((cmas?.Venture as any) * 100);
  const [valueInfra, setValueInfra] = useState((cmas?.Infrastructure as any) * 100);
  const [showOptionsStrategy, setShowOptionStrategy] = useState(true);
  const [showCashPace, setShowCashPace] = useState(true);
  const [showFundLevel, setShowFundLevel] = useState(true);
  const [selectedDistribution, setSelectedDistribution] = useState(distributionSpeed);
  const [selectedCalls, setSelectedCalls] = useState(callSpeed);
  const [valueFund,setValueFund]=useState<any>([])
  const [finalValueFund,setFinalValueFund]=useState<any>()

  useEffect(() => {
    setValueBuy((cmas?.Buyout as any) * 100)
    setValueGrow((cmas?.Growth as any) * 100)
    setValueVent((cmas?.Venture as any) * 100)
    setValueInfra((cmas?.Infrastructure as any) * 100)
  },[cmas])


  // useEffect(() => {
  //   const handleChangeInRange = () => {
  //     setLastValue(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleWindowResize);
  //   return () => window.removeEventListener("resize", handleWindowResize);
  // }, []);

  const onChangeSelect = (value: any) => {
    dispatch(
      getScenario(String(scenarios?.data?.portfolio_name), value?.label)
    );
    dispatch(setShowOptions(false));
  };

  const getFundValuesArr = useMemo(() => {
    if(overrides !== null){ 
      var array = Object.keys(
        overrides
      ).map(function (key) {
        return overrides[key];
      })
      return array;
    }
  },[overrides])

  const scenarioOptions = useMemo(() => {
    return scenarios?.data?.scenarios?.map?.((item: any) => ({
      value: item !== null && item,
      label: item !== null && item,
    }));
  }, [scenarios]);

  const callsDistOptions = useMemo(() => {
    return options?.map?.((item: any) => ({
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


  const onModifyScenario = () => {
    dispatch(updateScenario(String(selectedScenario?.data?.portfolio_name), String(selectedScenario?.data?.scenario_name).toLowerCase(), {
        ...selectedScenario,
        data:{
            ...scenarios?.data,
            scenario_data:{
                rates:{
                    "distribution speed":selectedDistribution ? selectedDistribution : distributionSpeed,
                    "call speed": selectedCalls ? selectedCalls : callSpeed
                },
                cmas:{
                    "Buyout": valueBuy,
                    "Growth": valueGrow,
                    "Venture": valueVent,
                    "Infrastructure": valueInfra
                },
                
                overrides:valueFund.length > 0 ? valueFund : overrides
            }
        }
    }))
  };


  // const finalFundValues = useMemo(() => {
  //   let newList = [{}]
  //   if(overrides && valueFund?.length>0){
  //     Object.entries(overrides)?.map?.(([key, subject], i) => {
  //       newList.push({
  //         key: listFunds[i] ? listFunds[i] : subject
  //       })
  //     })
  //     setFinalValueFund(newList as any)
  //     return newList
  //   }
  //   console.log('final',newList)
  //   console.log('final value fund',listFunds)

  // }, [overrides, valueFund, listFunds?.length])


  const handleChange = (e:any, i:any,name:any) => {
    const { value } = e.target;
    const newState = [...valueFund];
    newState[i] = {
      ...newState[i],
      [name]: value
    };
    setValueFund(newState);
  };

  return (
    <div className="p-5 align-items-center  justify-content-center align-content-center ">
      <DashboardHeader title="Existing Scenarios" />
      <Select
        isClearable={false}
        styles={customStyles}
        placeholder={<div className="font-label">Select a scenario</div>}
        options={scenarioOptions}
        className="font-label mt-3 align-content-start justify-content-start d-flex "
        onChange={(value) => onChangeSelect(value)}
        maxMenuHeight={200}
        menuPosition="fixed"
        menuShouldScrollIntoView={false}
      />
      

      {showOptions && (
        <>
          <Row>
        <div className="mt-3 ms-2" onClick={() => setShowCashPace(!showCashPace)}>
          <DashboardHeader iconSubtitle={<MdAssignmentReturned size={20}/>} className="pointer hover-yellow" subtitle="Expected Pace - Cash Flows" />
        </div>
        {
            showCashPace && 
<div  className=" d-flex ms-2 d-inline-flex flex-lg-wrap flex-lg-row flex-column flex-sm-column flex-xm-column flex-md-column gap-3 ">
            <Select
              isClearable={false}
              styles={customStyles}
              defaultValue={{
                value: distributionSpeed,
                label: distributionSpeed,
              }}
              placeholder={<div className="text-muted">Distributions</div>}
              options={callsDistOptions}
              className="font-label mt-3 align-content-start justify-content-start d-flex "
              onChange={(value) => setSelectedDistribution(value?.label as any)}
              maxMenuHeight={200}
              menuPosition="fixed"
              menuShouldScrollIntoView={false}
            />

            <Select
              isClearable={false}
              styles={customStyles}
              defaultValue={{ value: callSpeed, label: callSpeed }}
              placeholder={<div className="text-muted">Calls</div>}
              options={callsDistOptions}
              className="font-label mt-3 align-content-start justify-content-start d-flex "
              onChange={(value) => setSelectedCalls(value?.label as any)}
              maxMenuHeight={200}
              menuPosition="fixed"
              menuShouldScrollIntoView={false}
            />

          </div>
        }
      </Row>
          
          <Row >
            <div className="ms-2 " onClick={() => setShowOptionStrategy(!showOptionsStrategy)}>
          <DashboardHeader iconSubtitle={<FaTelegramPlane/>} className="pointer hover-yellow" subtitle="Expected IRRs - Strategy" />
          </div>
          { showOptionsStrategy && 
            <div className="bg-second rounded-3 m-3">
            <div className=" ms-3 mt-3 me-3" >  
            <Form>
           <Form.Label className="text-muted hover-green">Buyout (%)</Form.Label>
            <Form.Group as={Row}>
             <Col xs="6" sm='6' lg='10' xxl='11' md='9'>
                <RangeSlider
                  min={-100}
                  max={100}
                  size="sm"
                  variant="info"
                  tooltip="auto"
                  value={valueBuy}
                  onChange={(e) => setValueBuy(Number(e.target.value))}
                />
                </Col>
                <Col xs="6" sm='6' xxl='1' lg='2' md='3'>
               <Form.Control value={valueBuy} className="text-center"  style={{backgroundColor:"#333534", borderColor:"transparent",color:"gray",minWidth:'60px', maxWidth:'80px'}}   
                onChange={e => setValueBuy(Number(e.target.value))}
                />
               </Col>
              </Form.Group>
              </Form>

              </div>
              <div className=" ms-3 mt-3 me-3">
              <Form>

              <Form.Label className="text-muted hover-green">Growth (%)</Form.Label>
              <Form.Group as={Row}>
             <Col xs="6" sm='6' lg='10' xxl='11' md='9'>
                <RangeSlider
                  min={-100}
                  max={100}
                  size="sm"
                  variant="info"
                  tooltip="auto"
                  value={valueGrow}
                  onChange={(e) => setValueGrow(Number(e.target.value))}
                />
                </Col>
                <Col xs="6" sm='6' xxl='1' lg='2' md='3'>
               <Form.Control value={valueGrow} className="text-center"  style={{backgroundColor:"#333534", borderColor:"transparent",color:"gray",minWidth:'60px', maxWidth:'80px'}}   
                onChange={e => setValueGrow(Number(e.target.value))}
                />
               </Col>
              </Form.Group>
              </Form>

              </div>
              <div className=" ms-3 mt-3 me-3">
                <Form>
              <Form.Label className="text-muted hover-green">Venture (%)</Form.Label>
              <Form.Group as={Row}>
             <Col xs="6" sm='6' lg='10' xxl='11' md='9'>
                <RangeSlider
                  min={-100}
                  max={100}
                  size="sm"
                  variant="info"
                  tooltip="auto"
                  value={valueVent}
                  onChange={(e) => setValueVent(Number(e.target.value))}
                />
                 </Col>
                <Col xs="6" sm='6' xxl='1' lg='2' md='3'>
               <Form.Control value={valueVent} className="text-center"  style={{backgroundColor:"#333534", borderColor:"transparent",color:"gray",minWidth:'60px', maxWidth:'80px'}}   
                onChange={e => setValueVent(Number(e.target.value))}
                />
               </Col>
              </Form.Group>
                </Form>
              </div>
              <div className=" m-3 mt-3 me-3">
                <Form>
              <Form.Label className="text-muted hover-green">Infrastructure (%)</Form.Label>
              <Form.Group as={Row}>
             <Col xs="6" sm='6' lg='10' xxl='11' md='9'>
                <RangeSlider
                  min={-100}
                  max={100}
                  size="sm"
                  variant="info"
                  tooltip="auto"
                  value={valueInfra}
                  onChange={(e) => setValueInfra(Number(e.target.value))}
                />
                </Col>
                <Col xs="6" sm='6' xxl='1' lg='2' md='3'>
               <Form.Control value={valueInfra} className="text-center"  style={{backgroundColor:"#333534", borderColor:"transparent",color:"gray",minWidth:'60px', maxWidth:'80px'}}   
                onChange={e => setValueInfra(Number(e.target.value))}
                />
               </Col>
              </Form.Group>
                </Form>
              </div>
              </div>
          }
       
          </Row>
          <Row >
          <div className="ms-2 " onClick={() => setShowFundLevel(!showFundLevel)}>
          <DashboardHeader iconSubtitle={<MdOutlineTrendingUp size={20}/>} className="pointer hover-yellow" subtitle="Expected IRRs - Fund" />
          </div>
          { showFundLevel && 
            <div className="bg-second rounded-3 m-3">
            <div className=" ms-3 mt-3 me-3 mb-3" >  
            {overrides && Object.entries(overrides)?.map?.(([key, subject], i) => (
              <>
              <SliderRange
              key={Number(i as any)}
              min={-100}
              max={100} 
              step={0.5}
              size='sm'
              initialValue={Number(subject)}
              name={String(key)}
              tooltip="auto"
              variant="warning"
              label={`${key} (%)`}
              onAfterChange={(e:any) => {
                listFunds?.push?.(e.target.value)
                handleChange(e,i,key)
            }}
              />
                </>
            ))}

            </div>
            </div>
              
            
          }
          </Row>
          <Button
            className="bg-second border-second mt-3 ms-1 text-muted"
            onClick={onModifyScenario}
          >
            Modify Scenario
          </Button>
        </>
      )}
    </div>
  );
};
