import React from "react";

export default function ApplicantPage() {
  return (
    <div className="rounded-sm p-2 bg-red-700">
      <div className="flex justify-between">
        <button className="btn mb-2">Add</button>
        <label className="input bg-transparent text-white border-white">
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div>
      <div className="overflow-x-auto bg-white rounded-sm shadow-md">
        <table className="table table-xs p-2">
          <thead>
            <tr className="text-red-700">
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
