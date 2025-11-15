import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllprofileUpdateError,
  updatePassword,
} from "../Store/slice/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../Store/slice/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassowrd] = useState(false);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const handleChangePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllprofileUpdateError());
    }
    if (isUpdated) {
      toast.success("Password Updated");
      dispatch(getUser());
      dispatch(clearAllprofileUpdateError());
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="account_components">
        <h3>Update Password</h3>
        <div>
          <label>Old Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassowrd(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassowrd(!showPassword)}
            />
          )}
        </div>
        <div>
          <label>New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassowrd(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassowrd(!showPassword)}
            />
          )}
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassowrd(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassowrd(!showPassword)}
            />
          )}
        </div>
        <div className="save_change_btn_wrapper">
          <button
            className="btn"
            onClick={handleChangePassword}
            disabled={loading}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
