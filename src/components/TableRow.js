import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

export default class TableRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postTitle: props.item.post.title,
            editing: false
        };

        this.changeEditMode = this.changeEditMode.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    // changes editing mode from disabled to enabled, or vice-versa, depending upon which state it currently is in.
    changeEditMode() {
        // if editing is true, and is being changed to false, then send the new data to the API.
        if (!this.state.editing === false) {
            const postData = {
                id: this.props.item.post.id,
                title: this.state.postTitle
            };

            this.props.handleUpdate(postData)
                .then(() => {
                    this.setState({editing: !this.state.editing});
                })
                .catch((error) => {
                    // if an error happens, then set title back to the original value, and disable editing.
                    console.log(error);
                    this.setState({postTitle: this.props.item.post.title, editing: !this.state.editing});
                });
        }
        // editing is disabled and is going to be enabled
        else {
            this.setState({editing: !this.state.editing});
        }
    }

    // changes the value on the postTitle state variable as user inputs new text
    handleTextChange(e) {
        this.setState({postTitle: e.target.value});
    }

    // calls the handleDelete prop function with the row's ID, and all the row's data for deletion
    deleteRow() {
        this.props.handleDelete(this.props.id, {
            postId: this.props.item.post.id,
            albumId: this.props.item.album.id,
            userId: this.props.item.user.id,
        });
    }

    render() {
        return (
            <tr>
                <td>
                    {!this.state.editing ? this.state.postTitle :
                        <input
                            type="text"
                            value={this.state.postTitle}
                            onChange={this.handleTextChange}
                        />
                    }
                </td>
                <td>{this.props.item.album.title}</td>
                <td>{this.props.item.user.name}</td>
                <th><Button bsStyle="primary" onClick={this.changeEditMode}>Update</Button></th>
                <th><Button bsStyle="danger" onClick={this.deleteRow}>Delete</Button></th>
            </tr>
        );
    }
}

TableRow.propTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func
};