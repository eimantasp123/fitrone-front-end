export const tablePlans = [
  {
    key: "basic-plan",
    features: {
      ingredients_limit: 200,
      meals_limit: 50,
      weekly_menus_limit: 30,
      week_plan_menu_limit: 3,
      clients_limit: 10,
      ai_search: false,
      client_request_form: false,
      order_management: true,
    },
  },
  {
    key: "pro-plan",
    features: {
      ingredients_limit: 500,
      meals_limit: 350,
      weekly_menus_limit: 100,
      week_plan_menu_limit: 10,
      clients_limit: 50,
      ai_search: true,
      client_request_form: true,
      order_management: true,
    },
  },
  {
    key: "premium-plan",
    features: {
      ingredients_limit: -1,
      meals_limit: -1,
      weekly_menus_limit: -1,
      week_plan_menu_limit: -1,
      clients_limit: -1,
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
    price: "€19",
    priceId: "price_1Q3SEZAVASYOGHJkuKEtFelC",
  },
  {
    key: "pro-plan",
    price: "€49",
    priceId: "price_1Q3SF1AVASYOGHJkEpwY1xlm",
  },
  {
    key: "premium-plan",
    price: "€99",
    priceId: "price_1Q3SFiAVASYOGHJkUPUY9y7u",
  },
];
