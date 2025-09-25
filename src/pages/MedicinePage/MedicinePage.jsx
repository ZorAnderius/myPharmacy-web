import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../shared/UI/Container/Container";
import Section from "../../shared/UI/Section/Section";
import Button from "../../shared/UI/Button/Button";
import MedicineCard from "../../shared/UI/MedicineCard/MedicineCard";
import { getShopByIdThunk } from "../../redux/shops/operations";
import { selectCurrentShop, selectIsLoading } from "../../redux/shops/selectors";
import { selectIsLoading as selectGlobalIsLoading } from "../../redux/auth/selectors";
import styles from "./MedicinePage.module.css";

const MedicinePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shopId = searchParams.get('shopId');
  
  const shop = useSelector(selectCurrentShop);
  const isLoading = useSelector(selectIsLoading);
  const globalIsLoading = useSelector(selectGlobalIsLoading);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    if (shopId) {
      console.log('Dispatching getShopByIdThunk with shopId:', shopId);
      dispatch(getShopByIdThunk(shopId));
    } else {
      console.log('No shopId provided');
    }
  }, [shopId, dispatch]);

  useEffect(() => {
    if (shop && shop.products) {
      console.log('Setting medicines from shop data:', shop.products);
      setMedicines(shop.products);
    }
  }, [shop]);

  console.log('MedicinePage render - shop:', shop, 'isLoading:', isLoading, 'shopId:', shopId);

  const handleBackToShops = () => {
    navigate('/shop');
  };

  const handleAddMedicine = () => {
    // TODO: Implement add medicine functionality
    console.log('Add medicine clicked');
  };

  const handleEditMedicine = (medicine) => {
    // TODO: Implement edit medicine functionality
    console.log('Edit medicine:', medicine);
  };

  const handleDeleteMedicine = (medicine) => {
    // TODO: Implement delete medicine functionality
    console.log('Delete medicine:', medicine);
  };

  if (isLoading || globalIsLoading) {
    return null; // GlobalLoader will handle the loading state
  }

  if (!shopId) {
    return (
      <Section style="medicine">
        <Container>
          <div className={styles.errorContainer}>
            <h2>No shop ID provided</h2>
            <Button onClick={handleBackToShops}>
              Back to Shops
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  if (!shop) {
    return (
      <Section style="medicine">
        <Container>
          <div className={styles.errorContainer}>
            <h2>Shop not found</h2>
            <Button onClick={handleBackToShops}>
              Back to Shops
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section style="medicine">
      <Container>
        <div className={styles.medicinePage}>
          {/* Back Button */}
          <div className={styles.backSection}>
            <Button 
              className={styles.backButton}
              onClick={handleBackToShops}
            >
              Back to Shops
            </Button>
          </div>

          {/* Header */}
          <div className={styles.shopHeader}>
            <div className={styles.shopInfo}>
              <h1 className={styles.shopName}>{shop.title}</h1>
              <div className={styles.shopDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Location:</span>
                  <span className={styles.detailValue}>{shop.address?.street}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Phone:</span>
                  <span className={styles.detailValue}>{shop.phone}</span>
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <Button 
                className={styles.addMedicineButton}
                onClick={handleAddMedicine}
              >
                Add medicine
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.navigationTabs}>
            <div className={`${styles.tab} ${styles.activeTab}`}>
              Drug store
            </div>
            <div className={styles.tab}>
              All medicine
            </div>
          </div>

          {/* Medicines List */}
          <div className={styles.medicinesSection}>
            {medicines.length === 0 ? (
              <div className={styles.noMedicinesContainer}>
                <h3>No medicines found</h3>
                <p>This shop doesn't have any medicines yet.</p>
                <Button 
                  className={styles.addMedicineButton}
                  onClick={handleAddMedicine}
                >
                  Add medicine
                </Button>
              </div>
            ) : (
              <div className={styles.medicinesGrid}>
                {medicines.map((medicine) => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    onEdit={handleEditMedicine}
                    onDelete={handleDeleteMedicine}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MedicinePage;