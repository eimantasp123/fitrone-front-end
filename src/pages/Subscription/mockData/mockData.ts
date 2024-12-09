export const tablePlans = [
  {
    key: "basic-plan",
    features: {
      ingredients_limit: 5,
      meals_limit: 10,
      meal_week_types_limit: 20,
      clients_limit: 50,
      ai_search: false,
      business_page: false,
      order_management: false,
      client_request_form: false,
      weekly_reports: false,
    },
  },
  {
    key: "pro-plan",
    features: {
      ingredients_limit: 10,
      meals_limit: 20,
      meal_week_types_limit: 40,
      clients_limit: 100,
      ai_search: true,
      business_page: true,
      order_management: true,
      client_request_form: false,
      weekly_reports: false,
    },
  },
  {
    key: "premium-plan",
    features: {
      ingredients_limit: -1,
      meals_limit: -1,
      meal_week_types_limit: -1,
      clients_limit: -1,
      ai_search: true,
      business_page: true,
      order_management: true,
      client_request_form: true,
      weekly_reports: true,
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
    key: "meal_week_types_limit",
  },
  {
    key: "clients_limit",
  },
  {
    key: "ai_search",
  },
  {
    key: "business_page",
  },
  {
    key: "order_management",
  },
  {
    key: "client_request_form",
  },
  {
    key: "weekly_reports",
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
