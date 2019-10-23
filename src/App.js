import React from "react";
import Loader from "./Loader";
import Table from "./Table";
import DetaiRowView from "./DetailRowView";
import _ from "lodash";
import "./index.css";
import ModeSelector from "./ModeSelector";
import ReactPaginate from 'react-paginate'; 

class App extends React.Component {
    state = {
        isModeSelected: false,
        loader: false,
        data: [],
        sort: "asc",
        sortField: "id",
        row: ""
    };

    onSort = sortField => {
        const cloneData = this.state.data.concat(); //clone data
        const sort = this.state.sort === "asc" ? "desc" : "asc"; //sort direction
        const data = _.orderBy(cloneData, sortField, sort);

        this.setState({
            data,
            sort,
            sortField
        });
    };

    onRowSelect = row => {
        this.setState({
            row
        });
    };

    onSelect = url => {
        this.setState({
            loader: true,
            isModeSelected: true
        });
        this.fetchData(url);
    };

    async fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
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
                {!this.state.isModeSelected ? (
                    <ModeSelector onSelect={this.onSelect} />
                ) : loader ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        <ModeSelector onSelect={this.onSelect} />
                        <Table
                            onSort={this.onSort}
                            data={data}
                            sort={this.state.sort}
                            sortField={this.state.sortField}
                            onRowSelect={this.onRowSelect}
                        />
                    </React.Fragment>
                )}
                <DetaiRowView person={row} />
            </div>
        );
    }
}

export default App;
