import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import CreateShopForm from "../../shared/UI/Forms/CreateShopForm/CreateShopForm";
import EditShopForm from "../../shared/UI/Forms/EditShopForm/EditShopForm";
import ShopInfo from "../../shared/UI/ShopInfo/ShopInfo";
import ShopIllustration from "../../shared/UI/ShopIllustration/ShopIllustration";
import Button from "../../shared/UI/Button/Button";
import { createShopThunk, getUserShopsThunk, updateShopThunk } from "../../redux/shops/operations";
import { selectShops, selectCurrentShop, selectIsShopsLoading } from "../../redux/shops/selectors";
import styles from "./ShopPage.module.css";

const ShopPage = () => {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const currentShop = useSelector(selectCurrentShop);
  const isLoading = useSelector(selectIsShopsLoading);
  
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Get user's shop (first shop from the list)
  const userShop = shops.length > 0 ? shops[0] : null;

  // Load user shops on component mount
  useEffect(() => {
    dispatch(getUserShopsThunk())
      .unwrap()
      .then((result) => {
        // User shops loaded successfully
      })
      .catch((error) => {
        console.error('Failed to load user shops:', error);
      });
  }, [dispatch]);

  const handleCreateShop = async (shopData) => {
    try {
      await dispatch(createShopThunk(shopData)).unwrap();
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating shop:", error);
    }
  };

  const handleEditShop = () => {
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

      const result = await dispatch(updateShopThunk({ shopId: userShop.id, shopData })).unwrap();
      setIsEditing(false);
      // Optionally show success message
    } catch (error) {
      console.error("Error updating shop:", error);
      // Optionally show error message to user
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleViewProducts = () => {
    // Navigate to medicine page for this shop
    window.location.href = `/medicine?shopId=${userShop.id}`;
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
          {!isLoading && userShop && !isCreating && !isEditing && (
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
              <p>Loading shops...</p>
            </div>
          )}
          
          {!isLoading && !userShop && !isCreating && (
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

          {isEditing && userShop && (
            <div className={styles.editContainer}>
              <div className={styles.editContent}>
                <EditShopForm 
                  shop={userShop}
                  onSubmit={handleUpdateShop}
                  onCancel={handleCancelEdit}
                  isLoading={isLoading}
                />
                <ShopIllustration />
              </div>
            </div>
          )}

          {userShop && !isCreating && !isEditing && (
            <ShopInfo 
              shop={userShop}
              onEdit={handleEditShop}
              onViewProducts={handleViewProducts}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default ShopPage;