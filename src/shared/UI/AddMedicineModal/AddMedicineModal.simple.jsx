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
  const [errors, setErrors] = useState({});

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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
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

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation (min 3, max 150)
    if (!formData.name.trim()) {
      newErrors.name = "Medicine name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name should have a minimum length of 3";
    } else if (formData.name.trim().length > 150) {
      newErrors.name = "Name should have a maximum length of 150";
    }
    
    // Price validation (positive number with 2 decimal places)
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = "Price should be a type of 'number'";
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    
    // Description validation (min 10, max 2000)
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description should have a minimum length of 10";
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = "Description should have a maximum length of 2000";
    }
    
    // Quantity validation (integer, min 0)
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(parseInt(formData.quantity))) {
      newErrors.quantity = "Quantity should be a type of 'number'";
    } else if (!Number.isInteger(parseFloat(formData.quantity))) {
      newErrors.quantity = "Quantity must be an integer";
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Quantity cannot be negative";
    }
    
    // Category validation (UUID)
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    // Status validation (UUID)
    if (!formData.statusId) {
      newErrors.statusId = "Status is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('description', formData.description);
      submitData.append('quantity', formData.quantity);
      submitData.append('category_id', formData.categoryId);
      submitData.append('status_id', formData.statusId);
      
      if (formData.image) {
        submitData.append('product_image', formData.image);
      }
      
      onSubmit(submitData);
    }
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
            <label className={styles.imagePreview}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              {formData.image ? (
                <img 
                  src={URL.createObjectURL(formData.image)} 
                  alt="Preview" 
                  className={styles.previewImage}
                />
              ) : (
                <div className={styles.placeholderImage}>
                  <div className={styles.pillIcon}>💊</div>
                  <div className={styles.uploadText}>Click to upload image</div>
                </div>
              )}
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
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                className={styles.fieldInput}
              />
              {errors.price && (
                <span className={styles.errorText}>{errors.price}</span>
              )}
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
              {errors.description && (
                <span className={styles.errorText}>{errors.description}</span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Quantity</label>
              <input
                type="number"
                min="0"
                step="1"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                className={styles.fieldInput}
              />
              {errors.quantity && (
                <span className={styles.errorText}>{errors.quantity}</span>
              )}
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
              {errors.categoryId && (
                <span className={styles.errorText}>{errors.categoryId}</span>
              )}
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
              {errors.statusId && (
                <span className={styles.errorText}>{errors.statusId}</span>
              )}
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
