const filterDietFormData = (data) => {
  const filterData = Object.keys(data).reduce((acc, key) => {
    if (data[key] !== "") {
      if (key === "age") {
        acc[key] = data[key] + " years";
        return acc;
      } else if (key === "height") {
        acc[key] = data[key] + " cm";
        return acc;
      } else if (key === "weight" || key === "weightGoals") {
        acc[key] = data[key] + " kg";
        return acc;
      } else if (key === "hydration") {
        acc[key] = data[key] + " cups/day";
        return acc;
      } else if (key === "foodBudget") {
        acc[key] = "$" + data[key] + " /week";
        return acc;
      } else if (key === "mealsPerDay") {
        acc[key] = data[key] + " meals/day";
        return acc;
      } else if (key === "snacksPerDay") {
        acc[key] = data[key] + " snacks/day";
        return acc;
      }
      acc[key] = data[key];
    }
    return acc;
  }, {});

  return filterData;
};

export default filterDietFormData;
