export const VEHICLES_TYPE_API =
  "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/vehicle%20type?format=json";

export const getVehiclesMakeApi = (vehiclesType) => {
  return `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${encodeURIComponent(
    vehiclesType
  )}?format=json`;
};

export const getVehicleDetailsApi = (makeName, year) => {
  if (year) {
    return `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${encodeURIComponent(
      makeName
    )}/modelyear/${encodeURIComponent(year)}?format=json`;
  } else {
    return `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(
      makeName
    )}?format=json`;
  }
};
