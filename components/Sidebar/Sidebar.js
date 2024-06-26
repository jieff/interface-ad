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
import { withRouter } from "next/router";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

function Sidebar({
  toggleSidenav,
  sidenavOpen,
  routes,
  logo,
  rtlActive,
  router,
}) {
  const [state, setState] = React.useState({});
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [navigatorPlatform, setNavigatorPlatform] = React.useState("");

  React.useEffect(() => {
    setState(getCollapseStates(routes));
    setWindowWidth(window.innerWidth);
    setNavigatorPlatform(navigator.platform);
    // eslint-disable-next-line
  }, []);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return router.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through props.routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (router.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSidenav = () => {
    if (windowWidth < 1200) {
      toggleSidenav();
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className={classnames({
                active: getCollapseInitialState(prop.views),
              })}
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {prop.icon ? (
                <>
                  <i style={{ color: "#FF623F" }} className={prop.icon} />
                  <span style={{ color: "#FF623F" }} className="nav-link-text">{prop.name}</span>
                </>
              ) : prop.miniName ? (
                <>
                  <span style={{ color: "#FF623F" }} className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span style={{ color: "#FF623F" }} className="sidenav-normal"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
            <Collapse isOpen={state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
          <Link href={prop.layout + prop.path}>
            <NavLink href="#pablo" onClick={closeSidenav}>
              {prop.icon !== undefined ? (
                <>
                  <i style={{ color: "#FF623F" }} className={prop.icon} />
                  <span style={{ color: "#FF623F" }} className="nav-link-text">{prop.name}</span>
                </>
              ) : prop.miniName !== undefined ? (
                <>
                  <span style={{ color: "#FF623F" }} className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span style={{ color: "#FF623F" }} className="sidenav-normal"> {prop.name} </span>
                </>
              ) : (
                prop.name
              )}
            </NavLink>
          </Link>
        </NavItem>
      );
    });
  };

  const scrollBarInner = (
    <div className="scrollbar-inner">
      <div className="sidenav-header d-flex align-items-center">
        {logo && logo.innerLink ? (
          <Link href={logo.innerLink}>
            <span>
              <NavbarBrand href="#pablo">
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img"
                  src={logo.imgSrc}
                />
              </NavbarBrand>
            </span>
          </Link>
        ) : null}
        {logo && logo.outterLink ? (
          <NavbarBrand href={logo.outterLink} target="_blank">
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        <div className="ml-auto">
          <div
            className={classnames("sidenav-toggler d-none d-xl-block", {
              active: sidenavOpen,
            })}
            onClick={toggleSidenav}
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>{createLinks(routes)}</Nav>
          <hr className="my-3" />
          {/* <h6 className="navbar-heading p-0 text-muted">
            <span className="docs-normal">Documentation</span>
            <span className="docs-mini">D</span>
          </h6> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink
                href="https://www.creative-tim.com/learning-lab/nextjs/overview/argon-dashboard?ref=njsadp-sidebar"
                target="_blank"
              >
                <i className="ni ni-spaceship" />
                <span className="nav-link-text">Getting started</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.creative-tim.com/learning-lab/nextjs/colors/argon-dashboard?ref=njsadp-sidebar"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Foundation</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.creative-tim.com/learning-lab/nextjs/alerts/argon-dashboard?ref=njsadp-sidebar"
                target="_blank"
              >
                <i className="ni ni-ui-04" />
                <span className="nav-link-text">Components</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://www.creative-tim.com/learning-lab/nextjs/react-chartjs-2/argon-dashboard?ref=njsadp-sidebar"
                target="_blank"
              >
                <i className="ni ni-chart-pie-35" />
                <span className="nav-link-text">Plugins</span>
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </div>
    </div>
  );

  return (
    <Navbar
      className={
        "sidenav navbar-vertical navbar-expand-xs navbar-light bg-white " +
        (rtlActive ? "" : "fixed-left")
      }
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      {navigatorPlatform && navigatorPlatform.indexOf("Win") > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}
    </Navbar>
  );
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => { },
  sidenavOpen: false,
  rtlActive: false,
};

Sidebar.propTypes = {
  // function used to make sidenav mini or normal
  toggleSidenav: PropTypes.func,
  // prop to know if the sidenav is mini or normal
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  // logo
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
  // rtl active, this will make the sidebar to stay on the right side
  rtlActive: PropTypes.bool,
};

export default withRouter(Sidebar);
