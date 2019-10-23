import React from "react";

export default props => (
  <table className="table">
    <thead>
      <tr >
        <th
          onClick={() => {
            props.onSort("id");
          }}
        >
          ID {props.sortField === "id" ? <small>{props.sort==="asc"?<img src='https:icon.now.sh/chevron/up' alt='chevron icon' />: <img src='https:icon.now.sh/chevron/down' alt='chevron icon' />}</small> : null}
        </th>
        <th
          onClick={() => {
            props.onSort("firstName");
          }}
        >
          First Name{" "}
          {props.sortField === "firstName" ? <small>{props.sort==="asc"?<img src='https:icon.now.sh/chevron/up' alt='chevron icon' />: <img src='https:icon.now.sh/chevron/down' alt='chevron icon' />}</small> : null}
        </th>
        <th
          onClick={() => {
            props.onSort("lastName");
          }}
        >
          Last Name{" "}
          {props.sortField === "lastName" ? <small>{props.sort==="asc"?<img src='https:icon.now.sh/chevron/up' alt='chevron icon' />: <img src='https:icon.now.sh/chevron/down' alt='chevron icon' />}</small> : null}
        </th>
        <th
          onClick={() => {
            props.onSort("email");
          }}
        >
          E-mail
          {props.sortField === "email" ? <small>{props.sort==="asc"?<img src='https:icon.now.sh/chevron/up' alt='chevron icon' />: <img src='https:icon.now.sh/chevron/down' alt='chevron icon' />}</small> : null}
        </th>
        <th
          onClick={() => {
            props.onSort("phone");
          }}
        >
          Phone{" "}
          {props.sortField === "phone" ? <small>{props.sort==="asc"?<img src='https:icon.now.sh/chevron/up' alt='chevron icon' />: <img src='https:icon.now.sh/chevron/down' alt='chevron icon' />}</small> : null}
        </th>
      </tr>
    </thead>
    <tbody>
      {props.data.map(item => (
        <tr onClick={()=>{props.onRowSelect(item)}} key={item.id + item.phone}>
          <td
            onClick={() => {
              props.onSort("id");
            }}
          >
            {item.id}
          </td>
          <td
            onClick={() => {
              props.onSort("firstName");
            }}
          >
            {item.firstName}
          </td>
          <td
            onClick={() => {
              props.onSort("lastName");
            }}
          >
            {item.lastName}
          </td>
          <td
            onClick={() => {
              props.onSort("email");
            }}
          >
            {item.email}
          </td>
          <td
            onClick={() => {
              props.onSort("phone");
            }}
          >
            {item.phone}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
