import React,{Component} from 'react'
import ReactToPrint from 'react-to-print';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
class Reports extends Component{
render() {
  return (
    <div>
        <ReactToPrint
          trigger={() => {
           
            return <Button variant="contained"><PrintIcon/>&nbsp;Print Report</Button>;
          
          }}
          content={() => this.componentRef}
          documentTitle="Deliorder Restaurant Orders Report"
          pageStyle="print"
        />
        <div ref={el => (this.componentRef = el)} >
      <table className="table table-bordered mt-4" >
<thead>
    <tr>
        <th>No</th>
        <th>Date</th>
        <th>Restaurant Name</th>
        <th>Food Items</th>
        <th>Customer Name</th>
        <th>Customer Address</th>
        <th>Delivery boy name</th>
        <th>Delivery boy phone number</th>
    </tr>
</thead>
<tbody className="text-center" style={{ paddingTop: "2%" }}>
<tr >
    <td >1</td>
    <td>23/09/2022</td>
    <td>Paragon</td>
    <td>Chicken biriyani, pizza</td>
    <td>anooja</td>
    <td>kozhikode</td>
    <td>Hari</td>
    <td>7867564545</td>
    </tr>
    <tr >
    <td>1</td>
    <td>23/09/2022</td>
    <td>Paragon</td>
    <td>Chicken biriyani, pizza</td>
    <td>anooja</td>
    <td>kozhikode</td>
    <td>Hari</td>
    <td>7867564545</td>
    </tr>
    </tbody>
      </table>
      </div>
    </div>
  )
}
}
export default Reports
