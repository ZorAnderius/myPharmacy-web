import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { othersServices } from "../../../app/providers/othersService";
import styles from "./AddMedicineModal.module.css";

const AddMedicineModal = ({ isOpen, onClose, onSubmit, shopId }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    categoryId: "",
    statusId: "",
    image: null
  });

  const [categories, setCategories] = useState([]);
  const [productStatuses, setProductStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCategoriesAndStatuses();
    }
  }, [isOpen]);

  const loadCategoriesAndStatuses = async () => {
    setIsLoading(true);
    try {
      const [categoriesResponse, statusesResponse] = await Promise.all([
        othersServices.getCategories(),
        othersServices.getProductStatuses()
      ]);
      
      setCategories(categoriesResponse.data || []);
      setProductStatuses(statusesResponse.data || []);
    } catch (error) {
      console.error("Error loading categories and statuses:", error);
      // Set empty arrays on error to prevent crashes
      setCategories([]);
      setProductStatuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('price', formData.price);
    submitData.append('description', formData.description);
    submitData.append('quantity', formData.quantity);
    submitData.append('categoryId', formData.categoryId);
    submitData.append('statusId', formData.statusId);
    
    if (formData.image) {
      submitData.append('product_image', formData.image);
    }
    
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add medicine to store</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.imageUploadSection}>
            <div className={styles.imagePreview}>
              {formData.image ? (
                <img 
                  src={URL.createObjectURL(formData.image)} 
                  alt="Preview" 
                  className={styles.previewImage}
                />
              ) : (
                <div className={styles.placeholderImage}>
                  <div className={styles.pillIcon}>💊</div>
                </div>
              )}
            </div>
            <label className={styles.uploadButton}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              📎 Upload image
            </label>
          </div>

          <div className={styles.formFields}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Medicine Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter text"
                className={styles.fieldInput}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter text"
                className={styles.fieldInput}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter text"
                className={styles.textareaInput}
                rows="3"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                className={styles.fieldInput}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className={styles.selectInput}
                disabled={isLoading}
              >
                <option value="">
                  {isLoading ? "Loading categories..." : "Select category"}
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Status</label>
              <select
                name="statusId"
                value={formData.statusId}
                onChange={handleInputChange}
                className={styles.selectInput}
                disabled={isLoading}
              >
                <option value="">
                  {isLoading ? "Loading statuses..." : "Select status"}
                </option>
                {productStatuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.modalActions}>
            <Button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={styles.submitButton}
            >
              Add medicine
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;
