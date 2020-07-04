import React from 'react';
import Menu from './Menu'
import Order from './Order'
import Table from './Order'
import Axios from 'axios'

export default class extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            totalOrder: 0,
            totalTablesAvailable: 0,
            pendingOrders: 0,
            ongoingOrders: 0,
            completedOrder: 0
        }
    }

    async componentDidMount(){
        const totalTablesAvailable = await Axios.get('http://0.0.0.0:8000/table/get/table/qty').then(res => {console.log(res.data)}).catch(error => {return error.response})
        const totalOrder = await Axios.get('http://0.0.0.0:8000/order/get/order/count').then(res => {return res.data})
        const pendingOrder = aw
        // this.setState((prevState, props) => {
        //     let totalTablesAvailable = prevState.totalTablesAvailable
            
        // })
        
        // const totalOrder = 
        console.log(totalOrder, totalTablesAvailable)
    }



    render(){
        return(
            <React.Fragment>
                <div>Dashboard</div>
                <Menu />
                <Table />
                <Order />
            </React.Fragment>
            
        )
    }
}