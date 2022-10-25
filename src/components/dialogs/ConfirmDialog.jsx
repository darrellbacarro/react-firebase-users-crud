import PropTypes from "prop-types";
import icon from "../../assets/question-mark.png";

const ConfirmDialog = ({
  title,
  open = false,
  onClose,
  onConfirm = () => {},
}) => {
  return (
    <>
      <input checked={open} className="modal-state" type="checkbox" readOnly />
      <div className="modal">
        <label className="modal-bg" onClick={onClose}></label>
        <div className="modal-inner">
          <label className="close modal-close" onClick={onClose}></label>
          <div className="modal-title">{title ?? "Dialog"}</div>
          <div className="modal-body">
            <div className="modal-message">
              <img src={icon} alt="Dialog Icon Question" width="42" />
              <p>
                <strong>Are you Sure?</strong>
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
              className="sm"
            >
              ok
            </button>
            <button onClick={onClose} className="sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
};

export default ConfirmDialog;
