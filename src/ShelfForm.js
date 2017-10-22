import React, { Component } from 'react';

class ShelfForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'none'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        console.log('The selected shelf is: ' + this.state.value);
        console.log('The selected shelf is: ' + event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render () {
        const { book, onUpdateShelf } = this.props
        return (
            <select
                value={this.state.value} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        )
    }



}
export default ShelfForm;