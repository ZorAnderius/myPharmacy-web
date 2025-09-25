import { useState } from "react";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import CreateShopForm from "../../shared/UI/Forms/CreateShopForm/CreateShopForm";
import ShopInfo from "../../shared/UI/ShopInfo/ShopInfo";
import ShopIllustration from "../../shared/UI/ShopIllustration/ShopIllustration";
import Button from "../../shared/UI/Button/Button";
import styles from "./ShopPage.module.css";

const ShopPage = () => {
  const [shop, setShop] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateShop = async (shopData) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to create shop
      console.log("Creating shop:", shopData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set the created shop
      setShop(shopData);
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating shop:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditShop = () => {
    // TODO: Implement edit functionality
    console.log("Edit shop clicked");
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
          {!shop && !isCreating && (
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

          {shop && !isCreating && (
            <ShopInfo 
              shop={shop}
              onEdit={handleEditShop}
            />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default ShopPage;