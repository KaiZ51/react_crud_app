import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import TableRow from "./TableRow";
import APIUtil from "../utils/APIUtil";

export default class DataList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: []
        };

        this.printRows = this.printRows.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    // initializes the 'api' class variable, and immediately starts loading data from the API
    componentDidMount() {
        this.api = new APIUtil();

        this.api.loadData()
            .then((data) => {
                this.setState({rows: this.printRows(data)});
            });
    }

    // returns an array with <TableRows> for the <Table>
    printRows(data) {
        return data.map((item, index) => {
            return (
                <TableRow
                    key={index}
                    id={index}
                    item={item}
                    handleUpdate={this.updateRow}
                    handleDelete={this.deleteRow}
                />
            );
        });
    }

    // passes the HTTP PUT result from the 'api' class variable back to the <TableRow>
    async updateRow(postData) {
        return await this.api.updateData(postData);
    }

    // sends an HTTP DELETE through the 'api' class variable, and if successful,
    // it will delete that row's data locally and remotely.
    //
    // otherwise, it won't do anything besides outputting the error to the console.
    deleteRow(rowId, resourceIds) {
        this.api.deleteData(resourceIds.postId, resourceIds.albumId, resourceIds.userId)
            .then(() => {
                const newRows = this.state.rows.filter((row) => {
                    return row.props.id !== rowId;
                });

                this.setState({rows: newRows});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Post Title</th>
                    <th>Album Title</th>
                    <th>User Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {this.state.rows}
                </tbody>
            </Table>
        );
    }
}