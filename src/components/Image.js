import React from 'react';

function Image(props) {
    return (
      <li>
        <img src={'https://farm' + props.farm + ".staticflickr.com/" + props.server + "/" + props.id + "_" + props.secret + '.jpg'} alt= { props.title } />
      </li>
    );
  }

export default Image;