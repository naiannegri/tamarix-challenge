import React, { useEffect, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import { useForm } from "react-hook-form";
import { Col, Input, Row } from "reactstrap";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useRedux } from "../hooks";
import Form from "react-bootstrap/Form";

interface ChartLineProps {
  data: any;
  YDataName: string;
  XDataName: string;
  YDataKey: string;
  XDataKey: string;
  YColor: string;
  XColor: string;
}

export const ChartLines: React.FC<ChartLineProps> = ({
  data,
  YDataName,
  XDataName,
  YDataKey,
  XDataKey,
  YColor,
  XColor,
}) => {
  const { useAppSelector } = useRedux();

  return (
    <ResponsiveContainer
      className="background-button-color rounded py-1"
      width="100%"
      height="100%"
    >
      <AreaChart
        data={data}
        margin={{
          top: 15,
          bottom: 15,
          right: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={XDataName} />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "bg-second",
            borderRadius: "10px",
            border: "none",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey={XDataKey}
          stroke={XColor}
          fill={XColor}
          fillOpacity={0.3}
          activeDot={{ r: 8 }}
          dot={true}
        />
        <Area
          type="monotone"
          dataKey={YDataKey}
          stroke={YColor}
          fill={YColor}
          fillOpacity={0.3}
          activeDot={{ r: 8 }}
          dot={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

interface ChartPieProps {
  data: any;
  innerRadius: number | string;
  outerRadius: number | string;
  paddingAngle: number;
  dataKey: string;
  colors: string[];
  nameKey: string;
}

export const ChartPie: React.FC<ChartPieProps> = ({
  data,
  innerRadius,
  outerRadius,
  dataKey,
  colors,
  nameKey,
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={100} height={100}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data?.map?.((entry: any, index: any) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            border: "none",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

interface SliderRangeProps {
  min: number;
  max: number;
  step: number;
  name: string;
  initialValue: number;
  onClick?: () => void;
  label?: string;
  variant:
    | "primary"
    | "secondary"
    | "info"
    | "warning"
    | "success"
    | "dark"
    | "light"
    | "danger";
  tooltip: "on" | "off" | "auto";
  size: "sm" | "lg";
  onAfterChange?:(e:any) => void;
}

export const SliderRange: React.FC<SliderRangeProps> = ({
  min,
  max,
  step,
  name,
  onClick,
  initialValue,
  label,
  size,
  tooltip,
  variant,
  onAfterChange,
}) => {
  const methods = useForm();
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const [rangeValue, setRangeValue] = useState(initialValue);

  const onChangeRange = (value: any) => {
    setRangeValue(Number(value));
  };

  return (
    <>
      <Form>
        <Form.Label className="text-muted hover-green">{label}</Form.Label>
        <Form.Group as={Row}>
          <Col xs="6" sm="6" lg="10" xxl="11" md="9">
          <RangeSlider
          key={name}
            min={min}
            max={max}
            variant={variant}
            tooltip={tooltip}
            value={rangeValue}
            onChange={(e: any) => setRangeValue(Number(e.target.value))}
            onAfterChange={onAfterChange}
          />
          </Col>
          <Col xs="6" sm="6" xxl="1" lg="2" md="3">
            <Form.Control
              key={name}
              value={rangeValue}
              className="text-center"
              style={{
                backgroundColor: "#333534",
                borderColor: "transparent",
                color: "gray",
                minWidth: "60px",
                maxWidth: "80px",
              }}
              onChange={(e) => setRangeValue(Number(e.target.value))}
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
