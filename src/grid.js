import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Grid extends Component {
    constructor(props){
        super();
        this.trendingApiEndpoint = 'https://api.giphy.com/v1/gifs/trending?api_key=d83daa1b4ba04d678ec0fb3d259c0d12&limit=25&rating=R'
        this.state = {
            gifs: null
        };

        if(!props.gifs){
            this.fetchTrendingGifs();
        }else{
            this.setGifs(props.gifs);
        }

    }

    componentWillReceiveProps(newProps){
        if(newProps.gifs){
            this.setGifs(newProps.gifs);
        }
    }

    setGifs(gifs){
        this.setState({
            gifs: gifs.map((trendingGif) => {
                return (
                    <img key={trendingGif.id}
                         src={trendingGif.images.downsized.url}
                         alt={trendingGif.tags}/>
                )
            })
        })
    }

    fetchTrendingGifs(){
        fetch(this.trendingApiEndpoint).then((response) => {return response.json()}).then((trendingGifs) => {
            if(trendingGifs){
                if(trendingGifs.data){
                    this.setGifs((trendingGifs.data));
                }
            }

        })
    }


    render(){
        return (
            <div>
                {this.state.gifs}
            </div>
        )
    }
}

export default Grid;