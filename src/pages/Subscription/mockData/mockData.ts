export const tablePlans = [
  {
    key: "basic-plan",
    features: {
      ingredients_limit: 500,
      meals_limit: 100,
      weekly_menus_limit: 20,
      week_plan_menu_limit: 5,
      clients_limit: 50,
      ai_search: false,
      client_request_form: false,
      order_management: true,
    },
  },
  {
    key: "pro-plan",
    features: {
      ingredients_limit: 2000,
      meals_limit: 500,
      weekly_menus_limit: 50,
      week_plan_menu_limit: 15,
      clients_limit: 100,
      ai_search: true,
      client_request_form: true,
      order_management: true,
    },
  },
  {
    key: "premium-plan",
    features: {
      ingredients_limit: 5000,
      meals_limit: 1500,
      weekly_menus_limit: 150,
      week_plan_menu_limit: 30,
      clients_limit: 300,
      ai_search: true,
      client_request_form: true,
      order_management: true,
    },
  },
];

export const featuresList = [
  {
    key: "ingredients_limit",
  },
  {
    key: "meals_limit",
  },
  {
    key: "weekly_menus_limit",
  },
  {
    key: "week_plan_menu_limit",
  },
  {
    key: "clients_limit",
  },
  {
    key: "ai_search",
  },
  {
    key: "client_request_form",
  },
  {
    key: "order_management",
  },
];

export const plans = [
  {
    key: "basic-plan",
    price: "€49",
    priceId: "price_1Q3SEZAVASYOGHJkuKEtFelC",
  },
  {
    key: "pro-plan",
    price: "€99",
    priceId: "price_1Q3SF1AVASYOGHJkEpwY1xlm",
  },
  {
    key: "premium-plan",
    price: "€199",
    priceId: "price_1Q3SFiAVASYOGHJkUPUY9y7u",
  },
];

export const plansProduction = [
  {
    key: "basic-plan",
    price: "€29",
    priceId: "price_1RNArHAVASYOGHJkRFKUILRk",
  },
  {
    key: "pro-plan",
    price: "€49",
    priceId: "price_1RNArmAVASYOGHJkScDis5hO",
  },
  {
    key: "premium-plan",
    price: "€99",
    priceId: "price_1RNAsAAVASYOGHJkK537dweM",
  },
];
