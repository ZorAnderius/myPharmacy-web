import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import Input from "../Forms/Input/Input";
import { getCategoriesThunk } from "../../redux/categories/operations";
import { getProductStatusesThunk } from "../../redux/productStatuses/operations";
import { selectCategories } from "../../redux/categories/selectors";
import { selectProductStatuses } from "../../redux/productStatuses/selectors";
import styles from "./AddMedicineModal.module.css";

const AddMedicineModal = ({ isOpen, onClose, onSubmit, shopId }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const productStatuses = useSelector(selectProductStatuses);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    categoryId: "",
    statusId: "",
    image: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      dispatch(getCategoriesThunk());
      dispatch(getProductStatusesThunk());
    }
  }, [isOpen, dispatch]);

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
    
    if (!formData.name.trim()) {
      newErrors.name = "Medicine name is required";
    }
    
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = "Price must be a valid number";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
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
      submitData.append('categoryId', formData.categoryId);
      submitData.append('statusId', formData.statusId);
      
      if (formData.image) {
        submitData.append('product_image', formData.image);
      }
      
      onSubmit(submitData);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      quantity: "",
      categoryId: "",
      statusId: "",
      image: null
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add medicine to store</h2>
          <button className={styles.closeButton} onClick={handleClose}>
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
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter text"
                className={styles.fieldInput}
                error={errors.name}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Price</label>
              <Input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter text"
                className={styles.fieldInput}
                error={errors.price}
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
              {errors.description && (
                <span className={styles.errorText}>{errors.description}</span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Quantity</label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                className={styles.fieldInput}
                error={errors.quantity}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Category</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className={styles.selectInput}
              >
                <option value="">Select category</option>
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
              >
                <option value="">Select status</option>
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
              onClick={handleClose}
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
