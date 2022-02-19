import React from 'react'

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }
    
    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render () {
        return (
            <input
                className="form-control search-input"
                type = "text"
                placeholder = "Search ..."
                onChange = {this.onUpdateSearch}
                />
        )
    }
}
