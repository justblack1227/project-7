import React, { Component } from 'react';
import apiKey from './config.js';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Nav from './components/Nav.js';
import SearchForm from './components/SearchForm.js';
import Photo from './components/Photo.js';


class App extends Component  {
  constructor() {
    super();
    this.state = {
      photos : [],
      loading: true,
      heading: "", 
      menu_1: "basketball",
      menu_2: "football",
      menu_3: "baseball"
    };
    // this.searched = "";
    // this.menu_1 = "basketball";
    // this.menu_2 = "football";
    // this.menu_3 = "baseball";
  }

  componentDidMount() {
    this.imageSearch()
  }

  componentWillUnmount() {
    this.imageSearch()
  }

  imageSearch = (query = "beautiful") => {
    fetch(`https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&tags=${query}&sort=interestingness-desc&per_page=12&format=json&nojsoncallback=1`)
    .then( response => response.json())
    .then( responseData => {
      this.setState( { 
        photos: responseData.photos.photo,
        loading: false,
        heading: query
      })
    })
    .catch( error => {
      console.log("Error fetching and parsing data", error )
    })
  }

  // renderTabData(menuItem) {
  //   this.imageSearch(menuItem)
  //   return <Photo data = { this.state.photos } />
  // }
  renderTabData(menuItem) {
    this.site = menuItem;
    if (this.state.loading) {
      return <p>Loading...</p> 
    } else {
      this.imageSearch(menuItem);
      console.log(this.state.photos)
      return <Photo data = { this.state.photos } heading = {this.state.heading} />
    }
  }

  render() {
    console.log(this.searched);
    console.log(window.location.pathname)
    return (
      <BrowserRouter>
      <div className = "container" >
        <SearchForm onSearch = { this.imageSearch } didSearch = {this.searched} />
        <Nav />
        <Switch> 
          <Route exact path={"/:result"} render={ () => this.renderTabData(window.location.pathname.substring(1))} />
          <Route exact path={"/"} render={ () => this.renderTabData()} />
          <Route path={`/${this.state.menu_1}`} render={ () => this.renderTabData(this.state.menu_1)} />
          <Route path={`/${this.state.menu_2}`} render={ () => this.renderTabData(this.state.menu_2) } />
          <Route path={`/${this.state.menu_3}`} render={ () => this.renderTabData(this.state.menu_3) } />
        </Switch>
      {/* {
        (this.state.loading) 
      ? <p>Loading...</p> : <Photo data = { this.state.photos } heading = {this.state.heading}  />
    } */}
    
      

      </div>
      </BrowserRouter>
    );
  }
}

export default App;
