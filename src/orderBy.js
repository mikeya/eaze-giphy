import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

export default class OrderBy extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: "posted-descending"
        }
    }

   onChangeHandler = (event, index, value) => {
       this.setState({
           value
       });

        if(typeof(this.props.onChange) === 'function'){
            this.props.onChange(value)
        }


    };

    render(){
        return (
            <DropDownMenu value={this.state.value} onChange={this.onChangeHandler}>
                <MenuItem value={"posted-descending"} primaryText="Recently Posted"/>
                <MenuItem value={"posted-ascending"} primaryText="Oldest First"/>
            </DropDownMenu>
        )
    }
 }
