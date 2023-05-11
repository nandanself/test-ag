import { useState } from "react";

import { getVehiclesMakeApi, getVehicleDetailsApi } from "../../api/vehicles";
import { useFetch } from "../../hooks";

import MultiSelectDropdown from "../MultiSelectDropDown/MultiSelectDropDown";
import DataTable from "../DataTable";

import "./style.css";

const Form = ({ vehiclesTypesData }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  const [selectedVehicleMake, setSelectVehicleMake] = useState([]);

  const [isUseYearChecked, setUseYearChecked] = useState(false);
  const [year, setYear] = useState("");

  const {
    data: vehiclesMakesData,
    loading: isVehiclesMakesLoading,
    fetch: getVehiclesMakes,
  } = useFetch({ immediate: false });

  const {
    data: vehiclesDetails,
    loading: isVehiclesDetailsLoading,
    fetch: getVehiclesDetails,
  } = useFetch({ immediate: false });

  const renderVehicleTypeSelectionElement = () => {
    const handleChange = (event) => {
      setSelectedVehicleType(event.target.value);
      setSelectVehicleMake([]);
      getVehiclesMakes(getVehiclesMakeApi(event.target.value));
    };

    return (
      <div className="vehicle-type-wrapper">
        <label>Type</label>
        <select
          className="vehicle-type-select"
          value={selectedVehicleType}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          {vehiclesTypesData?.map((item) => (
            <option key={item.Id} value={item.Name}>
              {item.Name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderVehicleMakeSelectionElement = () => {
    const toggleOption = ({ obj }) => {
      setSelectVehicleMake((prevSelected) => {
        const newArray = [...prevSelected];
        if (newArray.some((newItem) => newItem.MakeId === obj.MakeId)) {
          return newArray.filter((item) => item.MakeId !== obj.MakeId);
        } else {
          newArray.push(obj);
          return newArray;
        }
      });
    };

    return (
      <div className="multi-select-wrapper">
        <label>Make</label>
        {isVehiclesMakesLoading && <p>Loading Vehicle Makes</p>}
        {vehiclesMakesData?.Results.length > 0 && (
          <MultiSelectDropdown
            options={vehiclesMakesData?.Results}
            selected={selectedVehicleMake}
            toggleOption={toggleOption}
          />
        )}
      </div>
    );
  };

  const renderUseYearElement = () => {
    return (
      <div className="vehicle-year-wrapper">
        <label>Use Year ?</label>
        <div>
          <input
            type="checkbox"
            checked={isUseYearChecked}
            onChange={() => setUseYearChecked(!isUseYearChecked)}
          />
          <input value={year} onChange={(e) => setYear(e.target.value)} />
          {isUseYearChecked && <span>Only accept 4 digit number</span>}
        </div>
      </div>
    );
  };

  /*

  For making the search api call. I was confused and was not able to find the api which supported multiple `make` as parameter. The one which I found was only supporting one make at a time. 
  So to make the code work I just grab the first element from `selectedMake` list and made the api. 

  I could have used Promise.all to make multiple api and then combine the results and showed it to table. But there like hundred of make and it would have been ideal to make those many call.
  */

  const renderSearchButtonElement = () => {
    const handleSearchOnClick = () => {
      const url = isUseYearChecked
        ? getVehicleDetailsApi(
            selectedVehicleMake[0].MakeName.toLowerCase(),
            year
          )
        : getVehicleDetailsApi(selectedVehicleMake[0].MakeName.toLowerCase());
      getVehiclesDetails(url);
    };

    const isYearValid = isUseYearChecked ? /^\d{4}$/.test(year) : true;

    const disabled =
      selectedVehicleType === "" ||
      selectedVehicleMake.length === 0 ||
      !isYearValid ||
      isVehiclesDetailsLoading;

    return (
      <div className="search-button-wrapper">
        <button onClick={handleSearchOnClick} disabled={disabled}>
          Search
        </button>
      </div>
    );
  };

  const renderDataTable = () => {
    return <DataTable data={vehiclesDetails.Results} />;
  };

  return (
    <>
      {renderVehicleTypeSelectionElement()}

      {selectedVehicleType && (
        <>
          {renderVehicleMakeSelectionElement()}
          {renderUseYearElement()}
          {renderSearchButtonElement()}

          {vehiclesDetails?.Results.length > 0 && renderDataTable()}
        </>
      )}
    </>
  );
};

export default Form;
