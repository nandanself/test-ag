import { useState } from "react";
import "./style.css";

const MultiSelectDropdown = ({ options, selected, toggleOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="multi-select-dropdown">
      <div className="multi-select-dropdown__selected">
        {selected.length === 0 && <p>Please select make of vehicles</p>}
        {selected.length > 0 &&
          selected.map((item) => (
            <div
              className="multi-select-dropdown_selected-item"
              key={item.MakeId}
            >
              <span>{item.MakeName}</span>
            </div>
          ))}
      </div>

      {isOpen && (
        <ul className="multi-select-dropdown__options">
          {options?.map((option) => {
            const isSelected = selected.some(
              (item) => item.MakeId === option.MakeId
            );
            return (
              <li
                className="multi-select-dropdown__option"
                key={option.MakeId}
                onClick={() => toggleOption({ obj: option })}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleOption({ obj: option })}
                  className="multi-select-dropdown__option-checkbox"
                />
                <span>{option.MakeName}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
