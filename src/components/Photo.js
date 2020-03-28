import React from 'react';
import NotFound from '../components/NotFound.js';
import Image from '../components/Image.js';


function Photo(props) {
    let pics;
    let headingTitle = props.heading; 
    const results = props.data;

/**
*This conditional determines what to to display on the screen.
*/
    if (props.loading) {
        pics = <p style ={{textAlign : 'center', fontSize: '4em'}}>Loading...</p>
        headingTitle = " ";
    } else if (results.length > 0) {
      pics = results.map(photo  => 
        <Image 
          farm = { photo.farm } 
          server = { photo.server } 
          key = {photo.id}  
          secret = { photo.secret }
          id = {photo.id} 
          title = {photo.title}  />
      );
    } else if (results.length === 0 && !props.isSearch) {
        pics = <p style ={{textAlign : 'center', fontSize: '4em'}}>Loading...</p>
        headingTitle = " ";
    } else {
        headingTitle = " ";
        pics = <NotFound /> 
    }


    return (
        <div className="photo-container">
          <h2 id="results_title">{headingTitle}</h2>
          <ul>
            { pics }
          </ul>
        </div>
      );
  }

export default Photo;