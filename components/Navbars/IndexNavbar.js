/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Link from "next/link";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
} from "reactstrap";

function AdminNavbar() {
  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark bg-info"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <Link href="/">
            <span>
              <NavbarBrand href="#pablo">
                <img
                  alt="..."
                  src={require("assets/img/brand/nextjs_argon_white.png")}
                />
              </NavbarBrand>
            </span>
          </Link>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link href="/admin/dashboard">
                    <img alt="..." src={require("assets/img/brand/blue.png")} />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="mr-auto" navbar>
              {/*
              <NavItem>
                <Link href="/admin/dashboard">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </Link>
              </NavItem>
              */}
              <NavItem>
                <Link href="/auth/pricing">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Planos</span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/auth/checkout">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Checkout</span>
                  </NavLink>
                </Link>
              </NavItem>
              {/** 
              <NavItem>
                <Link href="/auth/login">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </Link>
              </NavItem>
              
              <NavItem>
                <Link href="/auth/register">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </Link>
              </NavItem>


              <NavItem>
                <Link href="/auth/lock">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Lock</span>
                  </NavLink>
                </Link>
              </NavItem>

              
              <NavItem>
                <Link href="/performance/appraisal-cycle-list">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Empresa</span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/employee/profile">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Colaborador</span>
                  </NavLink>
                </Link>
              </NavItem>
              */}
              <NavItem>
                <Link href="/auth/login">
                  <NavLink href="#pablo">
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
            <hr className="d-lg-none" />
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.facebook.com/creativetim?ref=creative-tim"
                  id="tooltip601201423"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none">
                    Facebook
                  </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip601201423">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.instagram.com/creativetimofficial?ref=creative-tim"
                  id="tooltip871243015"
                  target="_blank"
                >
                  <i className="fab fa-instagram" />
                  <span className="nav-link-inner--text d-lg-none">
                    Instagram
                  </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip871243015">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://twitter.com/creativetim?ref=creative-tim"
                  id="tooltip366258619"
                  target="_blank"
                >
                  <i className="fab fa-twitter-square" />
                  <span className="nav-link-inner--text d-lg-none">
                    Twitter
                  </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip366258619">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://github.com/creativetimofficial?ref=creative-tim"
                  id="tooltip931502898"
                  target="_blank"
                >
                  <i className="fab fa-github" />
                  <span className="nav-link-inner--text d-lg-none">Github</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip931502898">
                  Star us on Github
                </UncontrolledTooltip>
              </NavItem>
              {/*
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="https://www.creative-tim.com/product/nextjs-argon-dashboard-pro?ref=njsadp-index-navbar"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-shopping-cart mr-2" />
                  </span>
                  <span className="nav-link-inner--text">Purchase now</span>
                </Button>
              </NavItem>
            */}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
