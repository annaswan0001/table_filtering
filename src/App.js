import React from "react";
import Loader from "./Loader";
import Table from "./Table";
import TableSearch from './TableSearch'
import DetaiRowView from "./DetailRowView";
import _ from "lodash";
import "./index.css";
import ModeSelector from "./ModeSelector";
import ReactPaginate from "react-paginate";

class App extends React.Component {
    state = {
        isModeSelected: false,
        loader: false,
        data: [],
        sort: "asc",
        sortField: "id",
        row: "",
        currentPage: 0,
      
        
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

    pageChangeHandler = ({ selected }) =>
        this.setState({ currentPage: selected });

        
    getFilteredData() {
        const { data, search } = this.state;
        console.log(data)

        if (!search) {
            return data;
        }
        let result = data.filter(item => {
            return (
                item.firstName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                item.lastName.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.id.toString().includes(search)
            );
        });
        if (!result) {
            result = [];
        }

        return result;
    }

    onInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    searchHandler = search => {
        this.setState({search, currentPage: 0})
      }

    render() {
        const { row, inputValue, loader, data, isModeSelected } = this.state;
        const filteredData = this.getFilteredData();
        const pageSize = 10;
        const pageCount = Math.ceil(filteredData.length / pageSize);
        const displayData = _.chunk(filteredData, pageSize)[
            this.state.currentPage
        ]
            ? _.chunk(filteredData, pageSize)[this.state.currentPage]
            : [];

        return (
            <div className="container">
                {!isModeSelected ? (
                    <ModeSelector onSelect={this.onSelect} />
                ) : loader ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        <ModeSelector onSelect={this.onSelect} />
                        <TableSearch onSearch={this.searchHandler}/>

                        <Table
                            onSort={this.onSort}
                            data={displayData}
                            sort={this.state.sort}
                            sortField={this.state.sortField}
                            onRowSelect={this.onRowSelect}
                        />
                        <DetaiRowView person={row} />

                        {data.length > pageSize ? (
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={3}
                                pageRangeDisplayed={3}
                                onPageChange={this.pageChangeHandler}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                nextClassName="page-item"
                                previousLinkClassName="page-link"
                                nextLinkClassName="page-link"
                            />
                        ) : (
                            ""
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default App;
