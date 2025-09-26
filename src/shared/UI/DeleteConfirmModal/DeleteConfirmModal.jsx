import Button from "../Button/Button";
import styles from "./DeleteConfirmModal.module.css";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, medicine }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Delete medicine</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.productImage}>
            <img 
              src={medicine?.image_url || medicine?.image || "/no_product_image.avif"} 
              alt={medicine?.name}
              className={styles.image}
              onError={(e) => {
                e.target.src = "/no_product_image.avif";
              }}
            />
          </div>
          <p className={styles.warningText}>
            Are you sure you want to delete <strong>"{medicine?.name}"</strong>?
          </p>
          <p className={styles.subText}>
            This action cannot be undone. The medicine will be permanently removed from your store.
          </p>
        </div>

        <div className={styles.modalActions}>
          <Button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className={styles.deleteButton}
          >
            Delete medicine
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
