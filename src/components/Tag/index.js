import React from 'react';

import './styles.css';


export default class Tag extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };

    this.onChange = this.onChange.bind(this);
  }


  onChange() {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
  }

  render() {
    const { checked } = this.state;
    const { name, label, className } = this.props;

    return (
      <label htmlFor={name} className={`tag ${className || ''} ${checked ? 'tag_checked' : ''}`}>
        <div className='tag__label'>{label}</div>
        <input
          checked={checked}
          type='checkbox'
          id={name}
          name={name}
          className='tag__input'
          onChange={this.onChange}
        />
      </label>
    );
  }
}
