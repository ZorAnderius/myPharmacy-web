import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import CreateShopForm from "../../shared/UI/Forms/CreateShopForm/CreateShopForm";
import EditShopForm from "../../shared/UI/Forms/EditShopForm/EditShopForm";
import ShopIllustration from "../../shared/UI/ShopIllustration/ShopIllustration";
import Button from "../../shared/UI/Button/Button";
import ShopsList from "./components/ShopsList/ShopsList";
import { createShopThunk, getUserShopsThunk, updateShopThunk } from "../../redux/shops/operations";
import { selectShops, selectIsShopsLoading } from "../../redux/shops/selectors";
import Loader from "../../features/Loader/Loader";
import styles from "./ShopPage.module.css";

const ShopPage = () => {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const isLoading = useSelector(selectIsShopsLoading);
  
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Check if user has shops
  const hasShops = shops && Array.isArray(shops) && shops.length > 0;

  // Load user shops on component mount
  useEffect(() => {
    dispatch(getUserShopsThunk())
      .unwrap()
      .catch((error) => {
        // Failed to load user shops
      });
  }, [dispatch]);

  const handleCreateShop = async (shopData) => {
    try {
      await dispatch(createShopThunk(shopData)).unwrap();
      setIsCreating(false);
      // Оновлюємо список магазинів після створення
      dispatch(getUserShopsThunk());
    } catch (error) {
      // Error creating shop
    }
  };

  const [selectedShop, setSelectedShop] = useState(null);

  const handleEditShop = (shop) => {
    setSelectedShop(shop);
    setIsEditing(true);
  };

  const handleUpdateShop = async (shopData) => {
    try {
      // Check if there are any changes
      if (Object.keys(shopData).length === 0) {
        // No changes detected, just close the form
        setIsEditing(false);
        return;
      }

      const result = await dispatch(updateShopThunk({ shopId: selectedShop.id, shopData })).unwrap();
      setIsEditing(false);
      setSelectedShop(null);
      // Оновлюємо список магазинів після редагування
      dispatch(getUserShopsThunk());
    } catch (error) {
      // Error updating shop
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedShop(null);
  };

  const handleViewProducts = (shop) => {
    // Navigate to medicine page for this shop
    window.location.href = `/medicine?shopId=${shop.id}`;
  };

  const handleCreateNewShop = () => {
    setIsCreating(true);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };


  return (
    <Section style="shop">
      <Container>
        <div className={styles.shopPage}>
          {/* Header with Create New Shop button */}
          {!isLoading && hasShops && !isCreating && !isEditing && (
            <div className={styles.shopHeader}>
              <h1 className={styles.pageTitle}>My Shops</h1>
              <Button 
                className={styles.createNewButton}
                onClick={handleCreateNewShop}
              >
                Create New Shop
              </Button>
            </div>
          )}

          {isLoading && (
            <div className={styles.loadingContainer}>
              <Loader />
            </div>
          )}
          
          {!isLoading && !hasShops && !isCreating && (
            <div className={styles.noShopContainer}>
              <div className={styles.noShopContent}>
                <h2 className={styles.noShopTitle}>No Shop Found</h2>
                <p className={styles.noShopDescription}>
                  You don't have a shop yet. Create one to start selling your products.
                </p>
                <Button 
                  className={styles.createButton}
                  onClick={handleCreateNewShop}
                >
                  Create Shop
                </Button>
              </div>
            </div>
          )}

          {isCreating && (
            <div className={styles.createContainer}>
              <div className={styles.createContent}>
                <CreateShopForm 
                  onSubmit={handleCreateShop}
                  onCancel={handleCancelCreate}
                  isLoading={isLoading}
                />
                <ShopIllustration />
              </div>
            </div>
          )}

          {isEditing && selectedShop && (
            <div className={styles.editContainer}>
              <div className={styles.editContent}>
                <EditShopForm 
                  shop={selectedShop}
                  onSubmit={handleUpdateShop}
                  onCancel={handleCancelEdit}
                  isLoading={isLoading}
                />
                <ShopIllustration />
              </div>
            </div>
          )}

          {shops && Array.isArray(shops) && shops.length > 0 && !isCreating && !isEditing && (
            <ShopsList 
              shops={shops}
              onEditShop={handleEditShop}
              onViewProducts={handleViewProducts}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default ShopPage;