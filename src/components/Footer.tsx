import React, { Fragment, Component } from 'react';
import {FaInstagramSquare} from 'react-icons/fa'
import {FaFacebookSquare} from 'react-icons/fa'
import {FaTwitterSquare} from 'react-icons/fa'
import {FaDiscord} from 'react-icons/fa'
import {FaGithubAlt} from 'react-icons/fa'

import {
  Row,
  Col,
  CardBody,
  Card,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';

export const Footer = () => {
  return (
        <div className=" mt-1" style={{zIndex:'3'}}>
          <div className="bg-first py-5">
            <div className="container pt-sm-0 pt-md-5">
              <div className="px-0 col-lg-6 col-md-8 col-sm-12 mx-auto text-center">
                <h1 className="display-3 mb-4 text-white font-size-24 font-weight-bold">
                  Stay up to date
                </h1>
                <p className="font-size-lg text-white-50">
                  Follow us on any of our social media accounts to find out when
                  we release new products or updates.
                </p>
              </div>
              <div className="divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-2 mx-auto mb-4 mt-5 w-50" />
              <Nav className="nav-transparent justify-content-center">
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href=""
                    rel="nofollow"
                    target="_blank"
                    id="btnFacebookTooltip">
                    <span className="btn-wrapper--icon">
                    <FaFacebookSquare size={30}/>
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnFacebookTooltip">
                    Facebook
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href=""
                    rel="nofollow"
                    target="_blank"
                    id="btnTwitterTooltip">
                    <span className="btn-wrapper--icon">
                    <FaTwitterSquare size={30}/>
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnTwitterTooltip">
                    Twitter
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href=""
                    rel="nofollow"
                    target="_blank"
                    id="btnInstagramTooltip">
                    <span className="btn-wrapper--icon">
                    <FaInstagramSquare size={30}/>

                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnInstagramTooltip">
                    Instagram
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href=""
                    rel="nofollow"
                    target="_blank"
                    id="btnDiscordTooltip">
                    <span className="btn-wrapper--icon">
                    <FaDiscord size={30}/>
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnDiscordTooltip">
                    Discord
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href=""
                    rel="nofollow"
                    target="_blank"
                    id="btnGithubTooltip">
                    <span className="btn-wrapper--icon">
                      <FaGithubAlt size={30}/>
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnGithubTooltip">
                    Github
                  </UncontrolledTooltip>
                </NavItem>
              </Nav>
              <div className="divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-2 mx-auto my-4 w-50" />
              <div className="px-0 col-lg-6 col-md-8 col-sm-12 mx-auto text-center">
                <Card className="border-0 mt-5 card-box">
                  <CardBody>
                    <div className="text-black">
                      <h1 className="display-4 mb-3 font-weight-bold">
                        Newsletter updates
                      </h1>
                      <p className="font-size-md mb-4 text-black-50">
                        Subscribe to our newsletter to be the first to find out
                        when we offer promotions or discounts for our products.
                      </p>
                      <div id="mc_embed_signup">
                        <form
                          action="#"
                          className="validate"
                          id="mc-embedded-subscribe-form"
                          method="post"
                          name="mc-embedded-subscribe-form"
                          noValidate
                          target="_blank">
                          <Row>
                            <Col md="8" className="pr-md-0">
                              <div id="mc_embed_signup_scroll">
                                <div className="mc-field-group">
                                  <input
                                    className="form-control required email"
                                    id="mce-EMAIL"
                                    name="EMAIL"
                                    placeholder="Your email address..."
                                    type="email"
                                  />
                                </div>
                                <div className="clear" id="mce-responses">
                                  <div
                                    className="response"
                                    id="mce-Errorresponse"
                                    style={{ display: 'none' }}
                                  />
                                  <div
                                    className="response"
                                    id="mce-success-response"
                                    style={{ display: 'none' }}
                                  />
                                </div>
                                <div
                                  aria-hidden="true"
                                  style={{
                                    position: 'absolute',
                                    left: '-5000px'
                                  }}>
                                  <input
                                    name="b_3ebc33a3d37f2278158d74721_a122e673aa"
                                    tabIndex={-1}
                                    type="text"
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col md="4" className="mt-3 mt-md-0">
                              <Button
                                block
                                className="w-100"
                                color="first"
                                id="mc-embedded-subscribe"
                                name="subscribe"
                                type="submit">
                                <span className="btn-wrapper--label">
                                  Sign up
                                </span>
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </div>
                      <small className="text-black-50 d-block pt-3">
                        We promise not to spam your inbox. We also hate spam!
                      </small>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="mt-5">
                <small className="text-center d-block text-white-50">
                  Copyright &copy; 2020 -{' '}
                  <a
                    className="text-white"
                    href="https://tamarix.com"
                    title="Tamarix">
                    Tamarix.com
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
    );
  }


export default Footer;
