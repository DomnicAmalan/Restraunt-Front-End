import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {BASE_URL} from './constants'

const Order = (props) => {

    const [show, setShow] = useState(false);
    const [showOrders, setShowOrder] = useState(false)
    const [listOrders, setOrderList] = useState([])

    const ADD_ORDER_URL = '/add-order'
    const GET_ORDER_URL = '/get/order/all'

    async function handleSubmit(e){
        const resp = await props.handleSubmit(e, 'order', ADD_ORDER_URL)
        if(resp == 200){

        }
    }
    useEffect(() => {
        fetchOrders()
    }, [])

    

    async function fetchOrders(){
        let url = BASE_URL + 'order' + GET_ORDER_URL
        const ordeList = await Axios.get(url).then(res => {return res.data})
        setOrderList(ordeList);
    }

    async function handleSubmit(e){
        const resp = await handleSubmit(e, 'order', ADD_ORDER_URL)
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
                        <input name="persons" type="number" placeholder="1" required onChange={(e) => props.handleChange('order', e)} required value={props.order.org_table_id}></input>
                        <label for="cars">Choose a car:</label>
                        <select name="order_status" onChange={(e)=>props.handleChange('order', e)} value={props.order.order_status} required>
                            <option value="placed">Placed</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>
            </div> : ""
            }
       </React.Fragment>
    )
}

export default Order