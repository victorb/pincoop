import React from 'react';
import 'styles/core.scss';
import Navigation from '../views/Navigation'

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }

  constructor () {
    super();
  }

  render () {
    return (
      <div className='page-container'>
				<Navigation/>
        <div className='view-container'>
          {this.props.children}
        </div>
				<div className="scroller"/>
      </div>
    );
  }
}
