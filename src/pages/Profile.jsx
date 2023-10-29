import React, { useEffect, useState } from 'react';
import './profile.scss';
import Menu from '../components/menu/Menu';
import { getUserProfile, updateUserProfile } from '../api/apex';
import { ResetPasswordForm } from '../components/Profile-password-reset/PasswordReset';
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/userSlice"

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log(user)

  // useEffect(() => {
  //   getProfile();
  // }, [isEditing]);

  useEffect(() => {
    setEditedProfile(user.userData || {});
  }, [user.userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateUserProfile(user.userData._id, editedProfile);
      setIsEditing(false);
      dispatch(updateProfile(editedProfile))
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the editedProfile to the original userProfile data
    setEditedProfile(user.userData || {});
  };

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-page">
          <div className="profile-card">
            <h1>User Profile</h1>
            <div className="profile-picture">
              <img src={user.userData.profilePicture} alt="Profile" />
            </div>
            {isEditing ? (
              <div className="edit-user-info">
                <div className="each-info">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editedProfile.username || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="each-info">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedProfile.firstName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="each-info">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedProfile.lastName || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="each-info">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="each-info">
                  <label>Memo</label>
                  <input
                    type="text"
                    name="userMemo"
                    value={user.userData.userMemo || ''}
                    readOnly
                  />
                </div>
                <div className="buttons">
                  <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              </div>
            ) : (
              <div className="user-info">
                <div className="info-wrapper">
                  <h2>
                    {user.userData.firstName} {user.userData.lastName}
                  </h2>
                  <p>Username: {user.userData.username}</p>
                  <p>Email: {user.userData.email}</p>
                  <p>First name: {user.userData.firstName}</p>
                  <p>Last name: {user.userData.lastName}</p>
                  <p>User Memo: {user.userData.userMemo}</p>
                </div>
                <div className="buttons">
                  <button onClick={handleEditClick}>Edit Profile</button>
                </div>
              </div>
            )}
          </div>
          <div className='profile-card'>
              <ResetPasswordForm/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
