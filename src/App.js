import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from './grid';
import SearchBar from './searchBar';
import OrderBy from './orderBy';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';

class App extends Component {

    constructor(){
        super();
        this.state = {
            gifs: null,
            orderBy: null,
            open:false,
            action:'',
            actionComponent: null
        };
        this.updateGifs = this.updateGifs.bind(this);
        this.orderBy = this.orderBy.bind(this);
    }

    updateGifs(endpoint){
      this.setState({
          endpoint,
          open: false
      });
    }

    orderBy(orderBy){
      this.setState({
          orderBy,
          open: false
      })
    }

    handleClose = () => {
        this.setState({
            open: false,
            action: '',
            actionComponent: null
        });
    };

    showAction(action){
        console.log(action)
        if(action === 'search'){
           this.setState({
               open: true,
               action: 'Search',
               actionComponent: (
                   <SearchBar updateGifs={this.updateGifs}/>
               )
           })
        }
        if(action === 'sort'){
            this.setState({
                open: true,
                action: 'Search',
                actionComponent: (
                    <OrderBy onChange={this.orderBy}/>
                )
            })
        }
    }

  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
              <Toolbar id="toolbar">
                  <ToolbarGroup>
                      <h1>Eazephy</h1>
                  </ToolbarGroup>
                  <ToolbarGroup className="desktop">
                      <SearchBar updateGifs={this.updateGifs}/>
                  </ToolbarGroup>
                  <ToolbarGroup className="desktop">
                      <OrderBy onChange={this.orderBy}/>
                  </ToolbarGroup>
                  <ToolbarGroup className="mobile">
                      <IconMenu
                          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                          targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                          <MenuItem primaryText="Search" onClick={this.showAction.bind(this, 'search')}/>
                          <MenuItem primaryText="Sort" onClick={this.showAction.bind(this, 'sort')} />
                      </IconMenu>
                  </ToolbarGroup>
              </Toolbar>

              <Dialog
                  title={this.state.action}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}>
                  {this.state.actionComponent}
              </Dialog>
            <Grid
                orderBy={this.state.orderBy}
                endpoint={this.state.endpoint}
            />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
