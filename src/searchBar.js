import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {cyan500} from 'material-ui/styles/colors';
import Search from 'material-ui/svg-icons/action/search';

class SearchBar extends Component {
    constructor(){
        super();
        this.searchApiEndpoint = 'https://api.giphy.com/v1/gifs/search?api_key=18b7516e93ce48519ad9eadd57771a3b&limit=25&rating=R&lang=en&q=';
        this.state = {value:''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        if(typeof this.props.updateGifs === 'function') {
            this.props.updateGifs(this.searchApiEndpoint + this.state.value);
        }
    }

    onChange(event){
        this.setState({
            value: event.target.value
        })
    }

    render(){
        return (
           <form onSubmit={this.onSubmit}>
               <TextField
                   hintText="Search Giphs"
                   value={this.state.value} onChange={this.onChange}
                   className="search-text-field"
               />
               <IconButton onClick={this.onSubmit.bind(this)} >
                   <Search color={cyan500}/>
               </IconButton>
           </form>
        )
    }
}

export default SearchBar;
