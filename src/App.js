/* Treehouse FSJS Techdegree
 * Project 7 - Create React App
 * By Justin Black
 
 Going for Exceeds Expectations but okay with meeting expecatations
 */

import React, { PureComponent } from 'react';
import apiKey from './config.js';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Nav from './components/Nav.js';
import SearchForm from './components/SearchForm.js';
import Photo from './components/Photo.js';
import NoPage from './components/NoPage.js';

class App extends PureComponent  {
    constructor() {
        super();
        this.state = {
          photos : [],
          loading: true,
          heading: "", 
          menu_1: "Basketball",
          menu_2: "Football",
          menu_3: "Baseball",
          bbPhotos: [],
          fbPhotos: [],
          basePhotos: [],
          searchResult: "",
          isSearch: true
        };

    }

    componentDidMount(){
        if (window.location.pathname.substring(2) === "") {
            this.imageSearch("sports")
        } else if (window.location.pathname.substring(1).includes("search/") && window.location.pathname.substring(8)) {
            this.imageSearch(window.location.pathname.substring(8))
        }
        

        fetch(`https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=American%20basketball&sort=interestingness-desc&per_page=24&format=json&nojsoncallback=1`)
        .then( response => response.json())
        .then( responseData => {
          this.setState( { 
            bbPhotos: responseData.photos.photo
          });
        })

        fetch(`https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=American%20football&sort=interestingness-desc&per_page=24&format=json&nojsoncallback=1`)
        .then( response => response.json())
        .then( responseData => {
          this.setState( { 
            fbPhotos: responseData.photos.photo
          });
        })

        fetch(`https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=American%20baseball&sort=interestingness-desc&per_page=24&format=json&nojsoncallback=1`)
        .then( response => response.json())
        .then( responseData => {
          this.setState( { 
            basePhotos: responseData.photos.photo
          });
        })

        window.onpopstate = this.urlChanged;
    }

    /**
* Fetches data after browser changes
* @param {event} result - Browser button
*/
    urlChanged = (e) => {
        const str = window.location.pathname.substring(8);
        if (window.location.pathname.substring(2) === "") {
            this.imageSearch("sports")
        } else if (window.location.pathname.substring(1).includes("search/") && window.location.pathname.substring(8)) {
            this.imageSearch(str)
        }
    }

/**
* Fetches Data 
* @param {string} - This is a search result
* Fetches data (specifically for search  result)
*/
    imageSearch = (query = "beautiful") => {
        fetch(`https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=${query}&sort=interestingness-desc&per_page=24&format=json&nojsoncallback=1`)
        .then( response => response.json())
        .then( responseData => {
            this.setState( { 
            photos: responseData.photos.photo,
            loading: false,
            heading: query,
            searchResult: query
            });
        })
    }

/**
* Checks if page is loading. 
* @param {boolean} result - If true page is loading, if not, page is not loading. 
*/
    isLoading = (bool) => {
        this.setState({
            loading: bool
        })
    }

  render() {
    return (
    <BrowserRouter>
      <div className = "container" >
        <SearchForm isLoading = {this.isLoading} onSearch = { this.imageSearch } searchResult = {this.searchResult} />
        <Nav menu_1= {this.state.menu_1} menu_2= {this.state.menu_2} menu_3= {this.state.menu_3} />
        <Switch> 
          <Route exact path='/search/:name' render={ () => <Photo searchResultSearch= {this.imageSearch} isSearch= {this.state.isSearch} loading = {this.state.loading}  data = { this.state.photos } heading = {this.state.searchResult}  />} />
          <Route exact path="/" render={ () => <Photo data = { this.state.photos } heading = {this.state.heading}  />} />
          <Route exact path={`/${this.state.menu_1}`} render={ () => <Photo data = { this.state.bbPhotos } heading = {this.state.menu_1}  />} />
          <Route exact path={`/${this.state.menu_2}`} render={ () => <Photo data = { this.state.fbPhotos } heading = {this.state.menu_2}  />} />
          <Route exact path={`/${this.state.menu_3}`} render={ () => <Photo data = { this.state.basePhotos } heading = {this.state.menu_3}  />} />
          <Route render={ () => <NoPage />} />
        </Switch>
        
      </div>
    </BrowserRouter>
    );
  }
}

export default App;