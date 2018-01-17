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

    changeEditMode() {
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
                    console.log(error);
                    this.setState({postTitle: this.props.item.post.title, editing: !this.state.editing});
                });
        }
        else {
            this.setState({editing: !this.state.editing});
        }
    }

    handleTextChange(e) {
        this.setState({postTitle: e.target.value});
    }

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
    id: PropTypes.number,
    item: PropTypes.object,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func
};