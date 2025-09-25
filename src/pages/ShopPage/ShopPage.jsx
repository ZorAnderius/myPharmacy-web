import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import CreateShopForm from "../../shared/UI/Forms/CreateShopForm/CreateShopForm";
import ShopInfo from "../../shared/UI/ShopInfo/ShopInfo";
import ShopIllustration from "../../shared/UI/ShopIllustration/ShopIllustration";
import Button from "../../shared/UI/Button/Button";
import { createShopThunk, getUserShopsThunk } from "../../redux/shops/operations";
import { selectShops, selectCurrentShop, selectIsShopsLoading } from "../../redux/shops/selectors";
import styles from "./ShopPage.module.css";

const ShopPage = () => {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const currentShop = useSelector(selectCurrentShop);
  const isLoading = useSelector(selectIsShopsLoading);
  
  const [isCreating, setIsCreating] = useState(false);
  
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
    // TODO: Implement edit functionality
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
          {!isLoading && userShop && !isCreating && (
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

          {userShop && !isCreating && (
            <ShopInfo 
              shop={userShop}
              onEdit={handleEditShop}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default ShopPage;