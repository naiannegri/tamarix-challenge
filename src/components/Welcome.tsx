import React from "react";
import { useRedux } from "../hooks";
import Footer from "./Footer";
import background from "../assets/images/composed-bg/background.jpg";
import { Button } from "reactstrap";
import { Header } from "./Header";

export const Welcome = () => {
  const { dispatch, useAppSelector } = useRedux();

  return (
    <>
      <Header />
      <div className="rm-padding-wrapper">
        <div className="hero-wrapper bg-composed-wrapper min-vh-100 bg-premium-dark">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image  opacity-8"
              style={{ backgroundImage: "url(" + background + ")" }}
            ></div>
            <div className="bg-composed-wrapper--bg   opacity-5" />
            <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
              <div className="container align-self-center justify-self-center h-100 py-5">
                <div className="row">
                  <div className=" ">
                    <div className="text-center ">
                      {/* <Badge
                        pill
                        color="info"
                        className="px-4 text-uppercase h-auto py-1"
                        id="ProjVersion123">
                        FREE react UI Kit
                      </Badge>
                      <UncontrolledTooltip
                        placement="top"
                        target="ProjVersion123">
                        Version: 1.1.0
                      </UncontrolledTooltip> */}

                      <div className="px-4 px-sm-0 text-white ">
                        <h1 className="display-2 mb-5 font-weight-bold">
                          TAMARIX{" "}
                        </h1>
                        <p className="font-size-xl text-white-50 mb-3">
                          Cash Flow Forecaster{" "}
                        </p>
                        <p className="text-white font-size-lg">
                          Keep control of your investments
                        </p>
                        <div className="divider border-2 border-light my-5 border-light opacity-2 mx-auto rounded-circle w-50"></div>
                        <div>
                          <Button
                            tag="a"
                            size="lg"
                            color="success"
                            className="btn-pill d-block d-sm-inline-block px-5 py-3 ml-0 mt-3 mt-sm-0 ml-sm-3"
                            onClick={() =>
                              (window.location.href = "/dashboard")
                            }
                            target="_blank"
                          >
                            <span className="btn-wrapper--label">
                              Start Now
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
