import React, {useState} from 'react'

export default props => {
    const [value, setValue] = useState('')
    const valueChangeHandler = event => {
        setValue(event.target.value)
      }
    const search=() =>{
        props.onSearch(value)
        setValue("")
    }
    return (
      <>
        <div className="input-group mb-3 mt-3">
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              onClick={search}
            >
              Search
            </button>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={valueChangeHandler}
            value={value}
          />
        </div>

        <p className="text-center">
          The search will show any matching values. If there is no match,
          then all the data.
        </p>
        <p className="text-center">To sort, click on the title.</p>
        <p className="text-center">Click on each row - view details</p>
      </>
    );
}
