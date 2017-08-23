import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';


class SearchBar extends Component {
    constructor(){
        super();
        this.searchApiEndpoint = 'https://api.giphy.com/v1/gifs/search?api_key=d83daa1b4ba04d678ec0fb3d259c0d12&limit=25&offset=0&rating=R&lang=en&q=';
        this.state = {value:''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event){
        event.preventDefault();
        fetch(this.searchApiEndpoint + this.state.value).then((response) => {return response.json()}).then((searchResults) => {
            if(searchResults && searchResults.data){
                if(typeof this.props.updateGifs === 'function'){
                    this.props.updateGifs(searchResults.data);
                }
            }
        })
    }

    onChange(event){
        this.setState({
            value: event.target.value
        })
    }

    render(){
        return (
           <div>
               <form onSubmit={this.onSubmit}>
                   <input type="text" value={this.state.value} onChange={this.onChange}/>
                   <button type="submit">Search</button>
               </form>
           </div>
        )
    }
}

export default SearchBar;
