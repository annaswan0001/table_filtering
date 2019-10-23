import React from "react";
import Loader from "./Loader";
import Table from "./Table";
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

    pageChangeHandler = ({selected}) => (
      this.setState({currentPage: selected})
    )

    render() {
        const { row, loader, data, isModeSelected } = this.state;
        const pageSize= 10
        const displayData = _.chunk(data, pageSize)[this.state.currentPage]
        return (
            <div className="container">
                {!isModeSelected ? (
                    <ModeSelector onSelect={this.onSelect} />
                ) : loader ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        <ModeSelector onSelect={this.onSelect} />
                        <Table
                            onSort={this.onSort}
                            data={displayData}
                            sort={this.state.sort}
                            sortField={this.state.sortField}
                            onRowSelect={this.onRowSelect}
                        />
                        <DetaiRowView person={row} />

                        {data.length > pageSize ?
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={data.length/pageSize}
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
                        /> : ""}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default App;
