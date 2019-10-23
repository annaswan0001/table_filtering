import React from "react";
import Loader from "./Loader";
import Table from "./Table";
import DetaiRowView from "./DetailRowView";
import _ from "lodash";
import "./index.css";

class App extends React.Component {
  state = {
    loader: true,
    data: [],
    sort: "asc",
    sortField: "id",
    row: ""
  };

  onSort = sortField => {
    const cloneData = this.state.data.concat(); //clone data
    const sortType = this.state.sort === "asc" ? "desc" : "asc"; //sort direction
    const orderedData = _.orderBy(cloneData, sortField, sortType);

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    });
  };

  onRowSelect = row => {
    this.setState({
      row
    });
  };
  async componentDidMount() {
    try {
      const res = await fetch(
        ` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
      );
      const data = await res.json();
      this.setState({
        loader: false,
        data: _.orderBy(data, this.state.sortField, this.state.sort)
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { row, loader, data } = this.state;
    return (
      <div className="container">
        <h1>Simple sorting</h1>
        {loader ? (
          <Loader />
        ) : (
          <Table
            onSort={this.onSort}
            data={data}
            sort={this.state.sort}
            sortField={this.state.sortField}
            onRowSelect={this.onRowSelect}
          />
        )}
        <DetaiRowView person={row} />
      </div>
    );
  }
}

export default App;
