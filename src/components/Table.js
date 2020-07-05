import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
import { BASE_URL }  from './constants'

const Table = (props) => {

    const [show, setShow] = useState(false);
    const [showTable, setTableShow] = useState(false);
    const [tableList, setTableList] = useState([])

    const ADD_TABLE_URL = "/add-table"
    const GET_ALL_TABLES = "/get/all"
    const DELETE_TABLE_URL = '/delete-table/'

    useEffect(() => {
        fetchTables()
    }, [])
    
    async function fetchTables() {
        let url = BASE_URL + 'table' + GET_ALL_TABLES
        let response = await Axios.get(url).then(res => {return res.data})
        setTableList(response)
    }

    async function handleSubmit(e){
        const resp = await props.handleSubmit(e, 'table', ADD_TABLE_URL)
        if(resp){
            fetchTables()
        }
    }

    async function handleDelete(id){
        let url = BASE_URL + 'table' + DELETE_TABLE_URL + id 
        const resp = await Axios.delete(url).then(res => {return res.status})
        if(resp == 202){
            fetchTables()
        }
    }

    const listTable = () => {
        let table = []
        tableList.forEach((ele,idx) => {
            table.push(
                <ul><li>{ele.org_table_name + " - "+ ele.table_qty}</li> <pre onClick={()=> handleDelete(ele.org_table_id)}>Delete</pre></ul>        
            )
        })
        return table
    }

    return(
        <div>
            <h2>Table</h2>
            <p>Add Table</p>
            <div class="card" style={{width: "18rem"}}>
                <i onClick={() => setShow(true)}>Add Table </i>
                {show ? <i onClick={() => setShow(false)}>Close</i>: ""}
            </div>
            <div class="card" style={{width: "18rem"}}>
                <i onClick={() => setTableShow(true)}>Show Table </i>
                {show ? <i onClick={() => setTableShow(false)}>Close</i>: ""}
            </div>
            {
                show ? 
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Table Name</label>
                        <input name="org_table_name" type="text" placeholder="Table 1" required onChange={(e) => props.handleChange('table', e)} defaultValue={props.table.org_table_name}></input>
                        <label>Org Table ID</label>
                        <input name="org_table_id" type="text" placeholder="t1" required onChange={(e) => props.handleChange('table', e)} required defaultValue={props.table.org_table_id}></input>
                        <label>Table Quantity</label>
                        <input name="table_qty" type="number" onInput={(e) => props.handleChange('table', e)} required defaultValue={props.table.table_qty}></input>
                        <button type="submit">Add</button>
                    </form>
                </div> : ""
            }
            {showTable ? listTable() : ""}
        </div>
    )
}

export default Table;