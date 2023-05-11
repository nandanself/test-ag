import { useFetch } from "../../hooks";

import Form from "../../components/Form";

import { VEHICLES_TYPE_API } from "../../api/vehicles";

import "./style.css";

const CarSearch = () => {
  const {
    data: vehiclesTypesData,
    loading: isVehiclesTypeLoading,
    error: isVehiclesTypeError,
  } = useFetch({ fetchUrl: VEHICLES_TYPE_API });

  return (
    <div className="car-search-wrapper">
      {isVehiclesTypeLoading && <p>Loading</p>}
      {isVehiclesTypeError && <p>Please try again</p>}
      {vehiclesTypesData?.Results.length > 0 && (
        <Form vehiclesTypesData={vehiclesTypesData?.Results} />
      )}
    </div>
  );
};

export default CarSearch;
