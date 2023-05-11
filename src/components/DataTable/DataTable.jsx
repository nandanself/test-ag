import { memo } from "react";

import "./style.css";

const Table = ({ data }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Make ID</th>
            <th>Make Name</th>
            <th>Model ID</th>
            <th>Model Name</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.Model_ID}>
              <th>{item.Make_ID}</th>
              <th>{item.Make_Name}</th>
              <th>{item.Model_ID}</th>
              <th>{item.Model_Name}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DataTable = memo(Table);
