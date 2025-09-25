import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import Button from "../../shared/UI/Button/Button";
import EditMedicineModal from "../../shared/UI/EditMedicineModal/EditMedicineModal";
import DeleteConfirmModal from "../../shared/UI/DeleteConfirmModal/DeleteConfirmModal";
import { getShopByIdThunk } from "../../redux/shops/operations";
import { updateProductThunk, deleteProductThunk } from "../../redux/products/operations";
import { selectCurrentShop, selectIsLoading } from "../../redux/shops/selectors";
import { selectIsLoading as selectGlobalIsLoading } from "../../redux/auth/selectors";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const shopId = searchParams.get('shopId');
  const productId = searchParams.get('productId');
  
  const shop = useSelector(selectCurrentShop);
  const isLoading = useSelector(selectIsLoading);
  const globalIsLoading = useSelector(selectGlobalIsLoading);
  
  const [product, setProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (shopId) {
      dispatch(getShopByIdThunk(shopId));
    }
  }, [shopId, dispatch]);

  useEffect(() => {
    if (shop && shop.products && productId) {
      const foundProduct = shop.products.find(p => p.id === productId);
      setProduct(foundProduct);
    }
  }, [shop, productId]);

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSubmitEditProduct = async (formData) => {
    try {
      const result = await dispatch(updateProductThunk({ 
        shopId, 
        productId, 
        productData: formData 
      })).unwrap();
      
      setIsEditModalOpen(false);
      
      // Update the product in local state immediately
      if (result && result.data) {
        setProduct(result.data);
      }
      
      // Also refresh shop data to ensure consistency
      if (shopId) {
        dispatch(getShopByIdThunk(shopId));
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteProductThunk({ 
        shopId, 
        productId 
      })).unwrap();
      
      setIsDeleteModalOpen(false);
      
      // Redirect to shop page
      navigate(`/medicine?shopId=${shopId}`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading || globalIsLoading) {
    return null; // GlobalLoader will handle the loading state
  }

  if (!productId) {
    return (
      <Section>
        <Container>
          <div className={styles.errorContainer}>
            <h2>No product ID provided</h2>
          </div>
        </Container>
      </Section>
    );
  }

  if (!product) {
    return (
      <Section>
        <Container>
          <div className={styles.errorContainer}>
            <h2>Product not found</h2>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className={styles.productPage}>
          <div className={styles.productCard}>
            <div className={styles.productImage}>
              <img 
                src={product.image_url || product.image || "/api/placeholder/300/300"} 
                alt={product.name}
                className={styles.image}
              />
              {product.status && (
                <div className={styles.statusBadge}>
                  {product.status.name}
                </div>
              )}
            </div>
            <div className={styles.productInfo}>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.productBrand}>{product.category?.name || 'Unknown'}</p>
              <div className={styles.productPrice}>${product.price}</div>
            </div>
            <div className={styles.productActions}>
              <Button 
                className={styles.editButton}
                onClick={handleEditProduct}
              >
                Edit
              </Button>
              <Button 
                className={styles.deleteButton}
                onClick={handleDeleteProduct}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className={styles.productDetails}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'description' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <div className={styles.description}>
                  <p className={styles.disclaimer}>
                    Although it's typically considered safe, excessive consumption can lead to side effects. 
                    Therefore, it's recommended to consult a healthcare professional before using this product, 
                    especially if you're pregnant, nursing, or taking other medications.
                  </p>
                  
                  <div className={styles.benefits}>
                    <h3>Product Information</h3>
                    <p><strong>Quantity:</strong> {product.quantity} units</p>
                    
                    <h3>Description</h3>
                    <p>{product.description}</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className={styles.reviews}>
                  <p>Reviews will be implemented later.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <EditMedicineModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSubmit={handleSubmitEditProduct}
          medicine={product}
        />
        
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          medicine={product}
        />
      </Container>
    </Section>
  );
};

export default ProductPage;
