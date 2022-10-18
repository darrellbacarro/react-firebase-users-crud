import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../../redux/slices/users.slice";
import { validateEmail } from "../../utils/helpers";
import FormInput from "../ui/FormInput";

const UserFormDialog = ({ open = false, data, onClose }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser({...data, password: ""});
  }, [data]);

  useEffect(() => {
    return () => {
      setUser(null);
    };
  }, [open]);

  const handleChange = useCallback((e) => {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        // check all fields in user object
        if (!user?.fullname) throw new Error("Your fullname is required.");
        if (!user?.email) throw new Error("Your email is required.");
        if (!validateEmail(user?.email)) throw new Error("Your email is invalid.");

        if (!user?.password && !data) throw new Error("Your password is required.");
        if (!user?.confirmPassword && !data)
          throw new Error("Please confirm your password");

        // check if password and confirmPassword match
        if (user.password !== user.confirmPassword && !data)
          throw new Error("Passwords do not match");

        const _user = {
          id: user?.id ?? nanoid(),
          fullname: user.fullname,
          email: user.email,
          password: user.password,
        };

        if (data) {
          await dispatch(editUser(_user)).unwrap();
        } else {
          await dispatch(addUser(_user)).unwrap();
        }
        onClose();
      } catch (err) {
        alert(err?.message ?? err);
      }
    },
    [user, data, dispatch]
  );

  return (
    <>
      <input
        checked={open}
        className="modal-state"
        type="checkbox"
        readOnly
      />
      <div className="modal">
        <label className="modal-bg" onClick={onClose}></label>
        <div className="modal-inner md">
          <label className="close modal-close" onClick={onClose}></label>
          <div className="modal-title">{ data ? 'Edit' : 'Add' } User</div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="modal-form">
              <FormInput
                value={user?.fullname ?? ""}
                onChange={handleChange}
                placeholder="Fullname"
                id="fullname"
                label="Fullname"
                autoFocus
              />
              <FormInput
                value={user?.email ?? ""}
                onChange={handleChange}
                placeholder="Email"
                id="email"
                label="Email"
              />
              <FormInput
                value={user?.password ?? ""}
                onChange={handleChange}
                placeholder="Password"
                id="password"
                label="Password"
                type="password"
              />
              <FormInput
                value={user?.confirmPassword ?? ""}
                onChange={handleChange}
                placeholder="Confirm Password"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <div className="input-group-grid">
                <span></span>
                <div
                  className="modal-footer form-dialog-footer"
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

UserFormDialog.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
};

export default UserFormDialog;
