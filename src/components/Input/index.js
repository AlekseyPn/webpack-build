import React from 'react';


import './styles.css';

export default class Input extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    const { name, onChange } = this.props;
    onChange(name, e.target.value);
  }

  render() {
    const {
      name, label, value, className,
    } = this.props;

    return (
      <div className={`input ${className || ''}`}>
        <label htmlFor={name} className='input__label'>{label}</label>
        <input
          className='input__input'
          type='text'
          name={name}
          id={name}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
