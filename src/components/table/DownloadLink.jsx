import PropTypes from "prop-types";

const DownloadLink = ({ url, filename }) => {
  return (
    <a className="link" href={url} download>
      {filename}
    </a>
  );
};

DownloadLink.propTypes = {
  url: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
};

export default DownloadLink;
