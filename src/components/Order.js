import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {BASE_URL} from './constants'

const Order = (props) => {

    const [show, setShow] = useState(false);
    const [showOrders, setShowOrder] = useState(false)
    const [listOrders, setOrderList] = useState([])
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null)

    const ADD_ORDER_URL = '/add-order'
    const GET_ORDER_URL = '/get/order/all'
    const EDIT_ORDER_URL = '/change/order-status/<order_id>'

    async function handleSubmit(e, update=false){
        let url= ADD_ORDER_URL
        if(update){
            url = '/change/order-status/' + editId.toString()
        }
        const resp = await props.handleSubmit(e, 'order', url, update)
        console.log(resp)
        if(resp){
            setEdit(false)
            setEditId(null)
            fetchOrders()
        }
    }


    useEffect(() => {
        fetchOrders()
    }, [])

    
    async function handleEdit(data){
        setEdit(true)
        setEditId(data.order_id)
    }

    async function fetchOrders(){
        let url = BASE_URL + 'order' + GET_ORDER_URL
        const ordeList = await Axios.get(url).then(res => {return res.data})
        setOrderList(ordeList);
    }

    const listTable = () => {
        let table = []
        listOrders.forEach((ele,idx) => {
            if(edit && ele.order_id == editId){
                table.push(
                    <div>
                        <form onSubmit={(e)=>handleSubmit(e, true)}>
                            <li>{editId}</li>
                            <select name="order_status" onChange={(e)=>props.handleChange('order', e, true, editId, 'order_id')} value={ele.order_status} required>
                                <option value="placed">Placed</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                )
            }
            else{
                table.push(
                    <ul><li>{ele.order_id + " - "+ ele.order_status}</li> <pre onClick={()=> handleEdit(ele)}>Edit</pre></ul>        
                )
            }
            
        })
        return table
    }

    return(
        <React.Fragment>
            <h3>Order</h3>            
            <div class="card" style={{width: "18rem"}}>
                <i onClick={() => setShow(true)}>Add order </i>
                {show ? <i onClick={() => setShow(false)}>Close</i>: ""}
            </div>
            <div class="card" style={{width: "18rem"}}>
                <i onClick={() => setShowOrder(true)}>Show Orders </i>
                {show ? <i onClick={() => setShowOrder(false)}>Close</i>: ""}
            </div>
            {
                show ? 
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Number of Presons</label>
                        <input value={props.order.order_id} disabled></input>
                        <input name="persons" type="number" placeholder="1" required onChange={(e) => props.handleChange('order', e)} required value={props.order.persons}></input>
                        <label for="status">Choose Status:</label>
                        <select name="order_status" onChange={(e)=>props.handleChange('order', e)} value={props.order.order_status} required>
                            <option value="placed">Placed</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>
            </div> : ""
            }
            {showOrders ? listTable() : ""}
       </React.Fragment>
    )
}

export default Order