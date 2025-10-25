import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsLoading } from "../../../redux/auth/selectors";
import { updateAvatarThunk } from "../../../redux/auth/operations";
import Button from "../Button/Button";
import styles from "./UserProfileModal.module.css";

const UserProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const [newAvatarUrl, setNewAvatarUrl] = useState(user?.avatarUrl || "");
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = '';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (user?.avatarUrl) {
      setNewAvatarUrl(user.avatarUrl);
    }
  }, [user?.avatarUrl]);

  // Update preview when Redux user state changes
  useEffect(() => {
    if (user?.avatarUrl && user.avatarUrl !== newAvatarUrl) {
      setNewAvatarUrl(user.avatarUrl);
      setIsImageLoading(false);
    }
  }, [user?.avatarUrl, newAvatarUrl]);

  // Get user initials
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      const firstInitial = user.firstName.trim()[0];
      const lastInitial = user.lastName.trim()[0];
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName.trim()[0].toUpperCase();
    }
    if (user?.name) {
      const nameParts = user.name.trim().split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
      }
      return user.name.trim()[0].toUpperCase();
    }
    return 'U';
  };

  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.firstName || user?.name || 'User';

  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        setIsImageLoading(true);
        try {
          // Upload to backend and update Redux state
          const resultAction = await dispatch(updateAvatarThunk(file));
          
          if (updateAvatarThunk.fulfilled.match(resultAction)) {
            // The new avatar URL comes from backend and updates user in Redux
            const updatedUser = resultAction.payload.user;
            if (updatedUser && updatedUser.avatarUrl) {
              setNewAvatarUrl(updatedUser.avatarUrl);
            }
          }
        } catch (error) {
          // Failed to update avatar
        } finally {
          setIsImageLoading(false);
        }
      }
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>User Profile</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.profileContainer}>
            {/* Profile Picture */}
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer} onClick={handleAvatarClick}>
                {newAvatarUrl ? (
                  <img 
                    src={newAvatarUrl} 
                    alt={displayName}
                    className={styles.avatarImage}
                  />
                ) : (
                  <div className={styles.avatarInitials}>
                    {getInitials()}
                  </div>
                )}
                <div className={styles.avatarOverlay}>
                  <div className={styles.editIcon}>+</div>
                </div>
                {isImageLoading && (
                  <div className={styles.loadingSpinner}>Loading...</div>
                )}
              </div>
            </div>

            {/* User Information */}
            <div className={styles.infoSection}>
              <h3 className={styles.userName}>{displayName.toUpperCase()}</h3>
              
              <div className={styles.infoField}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{user?.email || "Not specified"}</span>
              </div>
              
              <div className={styles.infoField}>
                <span className={styles.label}>First Name:</span>
                <span className={styles.value}>{user?.firstName || "Not specified"}</span>
              </div>
              
              <div className={styles.infoField}>
                <span className={styles.label}>Last Name:</span>
                <span className={styles.value}>{user?.lastName || "Not specified"}</span>
              </div>
              
              <div className={styles.infoField}>
                <span className={styles.label}>Phone Number:</span>
                <span className={styles.value}>{user?.phoneNumber || "Not specified"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <Button
            type="button"
            onClick={onClose}
            className={styles.closeModalButton}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
