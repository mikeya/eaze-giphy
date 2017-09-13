import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Bricks from 'bricks.js';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

const sizes = [
    { columns: 2, gutter: 10 },
    { mq: '768px', columns: 3, gutter: 25 },
    { mq: '1024px', columns: 6, gutter: 25 }
]

class Grid extends Component {
    constructor(props){
        super(props);
        this.endpoint = 'https://api.giphy.com/v1/gifs/trending?api_key=18b7516e93ce48519ad9eadd57771a3b&limit=25&rating=R';
        this.offset = 0;
        this.gifs = [];
        this.state = {
            gifs: [],
            addingGifs: true,
            selectedGif: {},
            open: false
        };

        this.fetchGifs = this.fetchGifs.bind(this);
        this.setGifs = this.setGifs.bind(this);
        this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
        this.updateMasonry = this.updateMasonry.bind(this);


    }

    componentDidMount(){
        this.fetchGifs();
        window.addEventListener('mousewheel', this.handleScroll.bind(this))

        this.masonry = Bricks({
            container: '#masonry',
            packed: 'packed',
            sizes,
            position: false
        });

        this.masonry.pack();

        this.masonry.on('pack', () => {
            this.setState({
                addingGifs: false
            })});
        this.masonry.on('update', () => {
            this.setState({
                addingGifs: false
            })});

    }

    handleScroll(){
        if(this.container.getBoundingClientRect().bottom - window.innerHeight < 200){
            this.handleInfiniteLoad();
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.endpoint){
            this.offset = 0;
            this.endpoint = newProps.endpoint;
            this.fetchGifs();
        }
        if(newProps.orderBy && newProps.orderBy !== this.props.orderBy){
            this.orderBy(newProps.orderBy);
        }

    }

    updateMasonry(added){
        setTimeout(()=>{
            if(added){
                this.masonry.update();
            }else{
                this.masonry.pack();
            }
        }, 3000)



    }

    orderBy(orderBy){
        this.setState({
            addingGifs: true
        });
        this.gifs.sort((gif1, gif2) => {
            let gif1Date = new Date(gif1.import_datetime);
            let gif2Date = new Date(gif2.import_datetime);
            if(orderBy === 'posted-descending'){
                if (gif1Date > gif2Date) {
                    return -1;
                } else if (gif1Date === gif2Date) {
                    return 0;
                } else {
                    return 1;
                }
            }else if(orderBy === 'posted-ascending'){
                if (gif1Date < gif2Date) {
                    return -1;
                } else if (gif1Date === gif2Date) {
                    return 0;
                } else {
                    return 1;
                }
            }
            return 0

        });
        this.setGifs(this.gifs);

    }


    setGifs(gifs, concat){
        if(concat){
            this.gifs = this.gifs.concat(gifs);
        }else{
            this.gifs = gifs;
        }

        this.setState({
            gifs: this.gifs
        });
        this.updateMasonry(concat);
    }

    fetchGifs(offset=0){
        this.setState({
            addingGifs: true
        });

        fetch(this.endpoint + "&offset=" + offset).then((response) => {return response.json()}).then((gifs) => {
            if(gifs){
                if(gifs.data){
                    this.setGifs(gifs.data, !!offset);
                }
            }

        })
    }

    handleInfiniteLoad(){
        if(!this.state.addingGifs){
            this.offset += 25;
            this.fetchGifs(this.offset);
        }

    }

    onClick(selectedGif){
        this.setState({
            open:true,
            selectedGif
        })
    }

    handleClose(){
        this.setState({
            open: false,
            selectedGif: {}
        });
    };

    render(){
        return (
            <div ref={(container)=>{this.container = container}}>
                <Dialog
                    title="Gif Details"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                    repositionOnUpdate={true}>
                    <img src={this.state.selectedGif.images ? this.state.selectedGif.images.fixed_height.url : ''}
                         style={{width:'100%'}}
                         alt={this.state.selectedGif.tags}/>
                    <h3>User: {this.state.selectedGif.user ? this.state.selectedGif.user.display_name : 'Unknown'}</h3>
                    <p>Rating: {this.state.selectedGif.rating}</p>
                </Dialog>
                <div id="masonry">
                    {this.state.gifs.map((gif, i) => {
                        return (
                            <img key={gif.id}
                                 src={gif.images.fixed_width.url}
                                 style={{
                                     width: `200px`,
                                     height: `auto`,
                                     display: 'block',
                                     opacity: `${this.state.addingGifs && i >= this.offset ? '0' : '1'}`,
                                     transition: 'opacity 1s'

                                 }}
                                 onClick={this.onClick.bind(this, gif)}
                                 alt={gif.tags}/>
                        )
                    })}
                </div>
                <CircularProgress size={80} thickness={5} innerStyle={{display:`${this.state.addingGifs ? 'block' : 'none'}`}}/>
            </div>

        )
    }
}

export default Grid;