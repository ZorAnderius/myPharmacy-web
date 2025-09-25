import Button from "../Button/Button";
import styles from "./MedicineCard.module.css";

const MedicineCard = ({ medicine, onEdit, onDelete, onView }) => {
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/200/150";
  };

  return (
    <div className={styles.medicineCard}>
      <div className={styles.medicineImage}>
        <img 
          src={medicine.image_url || medicine.image || "/api/placeholder/200/150"} 
          alt={medicine.name}
          onError={handleImageError}
        />
      </div>
      <div className={styles.medicineInfo}>
        <h3 className={styles.medicineName} onClick={() => onView(medicine)}>
          {medicine.name}
        </h3>
        <p className={styles.medicinePrice}>{medicine.price}</p>
        <p className={styles.medicineDescription}>{medicine.description}</p>
      </div>
      <div className={styles.medicineActions}>
        <Button className={styles.editButton} onClick={() => onEdit(medicine)}>
          Edit
        </Button>
        <Button className={styles.deleteButton} onClick={() => onDelete(medicine)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MedicineCard;
