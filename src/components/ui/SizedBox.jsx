import PropTypes from "prop-types";

const SizedBox = ({ width, height }) => {
  return <div style={{ height, width }} />;
};

SizedBox.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SizedBox;
