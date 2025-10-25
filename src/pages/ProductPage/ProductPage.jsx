import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import Button from "../../shared/UI/Button/Button";
import EditMedicineModal from "../../shared/UI/EditMedicineModal/EditMedicineModal";
import DeleteConfirmModal from "../../shared/UI/DeleteConfirmModal/DeleteConfirmModal";
import ProductCard from "./components/ProductCard/ProductCard";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { getShopByIdThunk } from "../../redux/shops/operations";
import {
  updateProductThunk,
  deleteProductThunk,
} from "../../redux/products/operations";
import { getProductReviewsThunk } from "../../redux/reviews/operations";
import {
  selectCurrentShop,
  selectIsLoading,
} from "../../redux/shops/selectors";
import { selectIsLoading as selectGlobalIsLoading } from "../../redux/auth/selectors";
import {
  selectReviews,
  selectIsLoading as selectReviewsIsLoading,
} from "../../redux/reviews/selectors";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shopId = searchParams.get("shopId");
  const productId = searchParams.get("productId");

  const shop = useSelector(selectCurrentShop);
  const isLoading = useSelector(selectIsLoading);
  const globalIsLoading = useSelector(selectGlobalIsLoading);
  const reviews = useSelector(selectReviews);
  const reviewsIsLoading = useSelector(selectReviewsIsLoading);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Get product from Redux instead of local state
  const product = shop?.products?.find((p) => p.id === productId) || null;

  useEffect(() => {
    if (shopId) {
      dispatch(getShopByIdThunk(shopId));
    }
  }, [shopId, dispatch]);

  useEffect(() => {
    if (shopId && productId) {
      dispatch(getProductReviewsThunk({ shopId, productId }));
    }
  }, [shopId, productId, dispatch]);

  const handleEditProduct = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSubmitEditProduct = async (formData) => {
    try {
      await dispatch(
        updateProductThunk({
          shopId,
          productId,
          productData: formData,
        })
      ).unwrap();

      setIsEditModalOpen(false);
      
      // Refresh shop data to get updated product from server
      if (shopId) {
        dispatch(getShopByIdThunk(shopId));
      }
    } catch (error) {
      // Error updating product
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
      await dispatch(
        deleteProductThunk({
          shopId,
          productId,
        })
      ).unwrap();

      setIsDeleteModalOpen(false);

      // Redirect to shop page
      navigate(`/medicine?shopId=${shopId}`);
    } catch (error) {
      // Error deleting product
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
        <div className={styles.backSection}>
          <Button
            className={styles.backButton}
            onClick={() => navigate(`/medicine?shopId=${shopId}`)}
          >
            ← Back to Catalog
          </Button>
        </div>
        <div className={styles.productPage}>
          <ProductCard
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />

          <ProductDetails
            product={product}
            reviews={reviews}
            isLoadingReviews={reviewsIsLoading}
          />
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
