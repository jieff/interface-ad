// /*!

// =========================================================
// * NextJS Argon Dashboard PRO - v1.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
// * Copyright 2021 Creative Tim (https://www.creative-tim.com)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

const routes = [
  {
    collapse: true,
    name: "Registros",
    icon: "ni ni-archive-2 text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/admin",
        name: "Administradores",
        miniName: "A",
        layout: "/report",
      },
      {
        path: "/client",
        name: "Cliente",
        miniName: "C",
        layout: "/report",
      },
      // {
      //   path: "/client",
      //   name: "Clientes",
      //   miniName: "A",
      //   layout: "/report",
      // },
      {
        path: "/contact-persons",
        name: "Contatos",
        miniName: "A",
        layout: "/report",
      },
      {
        path: "/plans",
        name: "Planos",
        miniName: "A",
        layout: "/report",
      },
      //{
      //  path: "/login",
      //  name: "Login",
      //  miniName: "L",
      //  layout: "/auth",
      //},
      //{
      //  path: "/register",
      //  name: "Register",
      //  miniName: "R",
      //  layout: "/auth",
      //},
      //{
      //  path: "/lock",
      //  name: "Lock",
      //  miniName: "L",
      //  layout: "/auth",
      //},
      //{
      //  path: "/timeline",
      //  name: "Timeline",
      //  miniName: "T",
      //  layout: "/admin",
      //},
      //{
      //  path: "/profile",
      //  name: "Profile",
      //  miniName: "P",
      //  layout: "/admin",
      //},
      //{
      //  path: "/rtl-support",
      //  name: "RTL Support",
      //  miniName: "RS",
      //  layout: "/rtl",
      //},
    ],
  },
  {
    collapse: true,
    name: "Cadastro",
    icon: "ni ni-single-copy-04 text-blue",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/admin",
        name: "Administrador",
        miniName: "A",
        layout: "/register",
      },
      {
        path: "/plans",
        name: "Plano",
        miniName: "P",
        layout: "/register",
      },
      // {
      //   path: "/profile",
      //   name: "Profile",
      //   miniName: "A",
      //   layout: "/employee",
      // },
      // {
      //   path: "/employee",
      //   name: "Colaborador",
      //   miniName: "F",
      //   layout: "/register",
      // },
      {
        path: "/departments",
        name: "Departamentos",
        miniName: "D",
        layout: "/register",
      },
      {
        path: "/roles",
        name: "Cargos",
        miniName: "C",
        layout: "/register",
      },
      {
        path: "/employees",
        name: "Colaboradores",
        miniName: "C",
        layout: "/register",
      },
    ],
  },
  
  {
    collapse: true,
    name: "Desempenho",
    icon: "ni ni-paper-diploma text-orange",
    state: "appraisalsCollapse",
    views: [
      {
        path: "/appraisal-cycle-list",
        name: "Avaliações",
        miniName: "A",
        layout: "/performance",
      },
      // {
      //   path: "/add-appraisal",
      //   name: "Adicionar Avaliação",
      //   miniName: "AD",
      //   layout: "/performance",
      // },
    ],
  },
  // {
  //   collapse: true,
  //   name: "Components",
  //   icon: "ni ni-ui-04 text-info",
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       miniName: "B",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/cards",
  //       name: "Cards",
  //       miniName: "C",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/grid",
  //       name: "Grid",
  //       miniName: "G",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       miniName: "N",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       miniName: "I",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       miniName: "T",
  //       layout: "/admin",
  //     },
  //     {
  //       collapse: true,
  //       name: "Multi Level",
  //       miniName: "M",
  //       state: "multiCollapse",
  //       views: [
  //         {
  //           path: "#pablo",
  //           name: "Third level menu",
  //           layout: "/",
  //         },
  //         {
  //           path: "#pablo",
  //           name: "Just another link",
  //           layout: "/",
  //         },
  //         {
  //           path: "#pablo",
  //           name: "One last link",
  //           layout: "/",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Forms",
  //   icon: "ni ni-single-copy-04 text-pink",
  //   state: "formsCollapse",
  //   views: [
  //     {
  //       path: "/elements",
  //       name: "Elements",
  //       miniName: "E",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/components",
  //       name: "Components",
  //       miniName: "C",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/validation",
  //       name: "Validation",
  //       miniName: "V",
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Tables",
  //   icon: "ni ni-align-left-2 text-default",
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/tables",
  //       name: "Tables",
  //       miniName: "T",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/sortable",
  //       name: "Sortable",
  //       miniName: "S",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/react-bs-tables",
  //       name: "React BS Tables",
  //       miniName: "RBT",
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Maps",
  //   icon: "ni ni-map-big text-primary",
  //   state: "mapsCollapse",
  //   views: [
  //     {
  //       path: "/google",
  //       name: "Google",
  //       miniName: "G",
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/vector",
  //       name: "Vector",
  //       miniName: "V",
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   icon: "ni ni-archive-2 text-green",
  //   layout: "/admin",
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: "ni ni-chart-pie-35 text-info",
  //   layout: "/admin",
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   icon: "ni ni-calendar-grid-58 text-red",
  //   layout: "/admin",
  // },
];

export default routes;
