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
                order_id: null, table_id: "", persons: 0, order_status: "placed"
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

    handleChange = (name, e, edit=false, id=null, update_primary_constaraint=null) => {
        let state = this.state[name]
        let target = e.target.name
        let value = e.target.value
        if(edit && id && update_primary_constaraint){
            state[update_primary_constaraint] = id
        }
        else{
            state["order_id"] = uuidv4()
        }
        state[target] = value
        
        this.setState({
            state: state
        })
    }
   
    async handleSubmit(e, name, relative_url, update=false){
        e.preventDefault()
        let url = BASE_URL + name + relative_url
        let method = update ? 'put' :'post'
        const Resp = await Axios[method](url, this.state[name]).then(res => {
            if(res.status == 200 || 204){
                return true
            }
            else{
                return false
            }
        })
        return Resp
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

