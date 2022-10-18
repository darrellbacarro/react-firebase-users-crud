import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import UserFormDialog from "../components/dialogs/UserFormDialog";
import ActionLinks from "../components/table/ActionLinks";
import Table from "../components/table/Table";
import { deleteUser, getUsers } from "../redux/slices/users.slice";

const UserList = () => {
  const { users = [] } = useSelector((state) => state.users);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = useCallback(async () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id));
    }
  }, [userToDelete, dispatch]);

  const userColumns = useMemo(
    () => [
      {
        key: "fullname",
        label: "Name",
        width: "40%",
      },
      {
        key: "email",
        label: "User Email ID",
        width: "40%",
        className: "centered",
      },
      {
        key: "_id",
        label: " ",
        width: "20%",
        className: "centered",
        render: (_value, data) => (
          <ActionLinks>
            <label onClick={() => setUserToEdit(data)}>
              Edit
            </label>
            <label onClick={() => setUserToDelete(data)}>
              Delete
            </label>
          </ActionLinks>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ flexDirection: "column", width: '100vw' }}>
      <main>
        <div className="header">
          <h3>Users</h3>
          <button onClick={() => setAddOpen(true)}>Add User</button>
        </div>
        <Table
          columns={userColumns}
          data={users}
          minRows={17}
          height={"60vh"}
          activeKey="_id"
          activeValue={userToDelete?._id}
        />
      </main>

      <UserFormDialog
        open={addOpen || !!userToEdit}
        data={userToEdit}
        onClose={() => {
          setAddOpen(false);
          setUserToEdit(null);
        }}
      />

      <ConfirmDialog
        title={"Confirm User Deletion"}
        open={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UserList;
