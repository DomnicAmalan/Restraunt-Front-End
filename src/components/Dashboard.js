import React from 'react';
import Menu from './Menu'
import Order from './Order'
import Table from './Table'
import Axios from 'axios'
import { BASE_URL }  from './constants'
import { v4 as uuidv4 } from 'uuid';

export default class extends React.Component{

    constructor(props){
        super(props);
        

        this.state = {
            totalOrder: 0,
            totalTablesAvailable: 0,
            pendingOrders: 0,
            ongoingOrders: 0,
            completedOrder: 0,
            table: {
                org_table_id: "", org_table_name: "", table_qty: 0, is_full: false, current_qty: 0
            },
            order: {
                order_id: uuidv4(), table_id: "", persons: 0, order_status: "placed"
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const totalTablesAvailable = await Axios.get('http://0.0.0.0:8000/table/get/table/qty').then(res => {return res.data}).catch(error => {return error.response})
        const totalOrder = await Axios.get('http://0.0.0.0:8000/order/get/order/count').then(res => {return res.data})
        this.setState({
            totalTablesAvailable: totalTablesAvailable,
            totalOrder: totalOrder,
        })
    }

    handleChange = (name, e) => {
        console.log("yes")
        let target = e.target.name
        let value = e.target.value
        let state = this.state[name]
        state[target] = value
        this.setState({
            state: state
        })
    }
   
    async handleSubmit(e, name, relative_url){
        e.preventDefault()
        let url = BASE_URL + name + relative_url
        const Resp = await Axios.post(url, this.state[name]).then(res => {
            if(res.status == 200){
                return true
            }
            else{
                return false
            }
        })
    }

    render(){
       
        return( 
            <React.Fragment>
                <div>Dashboard</div>
                <Table table={this.state.table} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <Menu />
                <Order order={this.state.order} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            </React.Fragment>
            
        )
    }
}

