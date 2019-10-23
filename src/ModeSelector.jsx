import React from 'react';

export default props =>{

    const selectAmount=(amount)=>{
        const url = `http://www.filltext.com/?rows=${amount}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
        props.onSelect(url)
    }
    
    return (
        <div className="d-flex" >
            <button  onClick={()=>selectAmount(32)} className="m-2 btn btn-success">32 элемента</button>
            <button onClick={()=>selectAmount(1000)} className="m-2 btn btn-danger">1000 элементов</button>
        </div>
    )
}