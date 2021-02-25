import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
   constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeFristNameHandler = this.changeFristNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);        
    }

    componentDidMount() {

        if (this.state.id == -1) {
            return;
        }

        EmployeeService.getEmployeeById(this.state.id).then(res => {
            let employee = res.data;
            this.setState({firstName: employee.firstName, 
                lastName: employee.lastName, emailId: employee.emailId});
        });
    }

    changeFristNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName : this.state.firstName, lastName : this.state.lastName, emailId : this.state.emailId};
        // console.log("Employee => " + JSON.stringify(employee));

        if (this.state.id === '_add') {
            EmployeeService.saveEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
        
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            this.getTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input className="form-control" placeholder="First Name" name="firstName" 
                                        value={this.state.firstName} onChange={this.changeFristNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input className="form-control" placeholder="Last Name" name="lastName" 
                                        value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Email Id:</label>
                                    <input className="form-control" placeholder="Email" name="emailId" 
                                        value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                </div>
                                <button className="btn btn-success" onClick={this.saveEmployee}>Save</button> 
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent;