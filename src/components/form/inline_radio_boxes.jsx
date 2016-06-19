import React from 'react';
import RadioBoxStyles from '../../styles/radio_boxes.scss';

class RadioBox extends React.Component {
  render() {
    const style = this.props.selected ? RadioBoxStyles.selected : RadioBoxStyles.unselected;
    return(
      <div className={style} onClick={(evt) => this.props.onClick(this.props.value)}>
        {this.props.label}
        <input
          name={this.props.field}
          type="radio"
          value={this.props.value}
          checked={this.props.selected} />
      </div>
    );
  }
}

class InlineRadioBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.initialSelectedOption
    };
  }
  render() {
    const { field, options } = this.props;
    return (
      <div className={RadioBoxStyles.container}>
        {options.map((option) => (
          <RadioBox
            field={field}
            label={option.label}
            value={option.value}
            onClick={(value) => {
              this.props.selectionCB(value);
              this.setState({ selectedOption: value });
            }}
            selected={option.value === this.state.selectedOption} />
        ))}
      </div>
    );
  }
}

InlineRadioBoxes.defaultProps = {
  options: []
};

export default InlineRadioBoxes;
