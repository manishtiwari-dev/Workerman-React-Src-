import React from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import ColorIcon from "assets/img/colorpicker.png";

class ColorPic extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange("color", color.hex);
  };

  renderModal = () => {
    const { color } = this.props.currentState;
    return (
      <div onClick={this.stopPropagation}>
        <SketchPicker
          color={color}
          onChangeComplete={this.onChange}
        />
      </div>
    );
  };
  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker">
        <div onClick={onExpandEvent}>
          <img
            src={ColorIcon}
            height={20}
            width={20}
            alt=""
          />
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default ColorPic;
