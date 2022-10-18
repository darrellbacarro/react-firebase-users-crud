import { useEffect, useState, useCallback, useContext } from "react";
import AppContext from "../../context/AppContext";
import { updateUpload } from "../../utils/api";
import PropTypes from "prop-types";
import FormInput from "../ui/FormInput";

const EditDialog = ({ data, onClose, onComplete }) => {
  const [description, setDesc] = useState(data?.description ?? "");
  const { loader } = useContext(AppContext);

  useEffect(() => {
    setDesc(data?.description ?? "");
  }, [data]);

  const handleDescChange = useCallback((e) => {
    setDesc(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (!description) throw "Please add a description";

        loader.show();

        const res = await updateUpload(data._id, { description });
        if (!res.success) throw res.message;

        if (onComplete) await onComplete();
        onClose();
      } catch (err) {
        alert(err);
        return;
      } finally {
        loader.hide();
      }
    },
    [description, data]
  );

  return (
    <>
      <input
        checked={!!data}
        className="modal-state"
        type="checkbox"
        readOnly
      />
      <div className="modal">
        <label className="modal-bg" onClick={onClose}></label>
        <div className="modal-inner md">
          <label className="close modal-close" onClick={onClose}></label>
          <div className="modal-title">Edit</div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="modal-form">
              <FormInput
                value={description}
                onChange={handleDescChange}
                placeholder="File Description"
                id="file-desc"
                label="File Description"
                autoFocus
              />
              <div className="input-group-grid">
                <span></span>
                <div
                  className="modal-footer"
                  style={{
                    justifyContent: "flex-start",
                    padding: "12px 0 48px 0",
                  }}
                >
                  <button className="sm dark" type="submit">
                    Save
                  </button>
                  <button className="sm dark" type="button" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

EditDialog.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
};

export default EditDialog;
