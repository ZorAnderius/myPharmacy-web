import React, { useEffect } from "react";
import Button from "../Button/Button";
import styles from "./AboutModal.module.css";

const AboutModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body and html scroll when modal is open
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
      document.body.classList.add('no-scroll');
    } else {
      // Restore body and html scroll when modal is closed
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>About myPharmacy</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.aboutSection}>
            <h3 className={styles.sectionTitle}>What is myPharmacy?</h3>
            <p className={styles.sectionText}>
              myPharmacy is a comprehensive digital healthcare platform designed to revolutionize 
              how you manage your medications and pharmacy needs. We provide a seamless, secure, 
              and user-friendly experience for both patients and healthcare providers.
            </p>
          </div>

          <div className={styles.aboutSection}>
            <h3 className={styles.sectionTitle}>Key Features</h3>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <strong>Digital Pharmacy Management:</strong> Create and manage your own pharmacy store with ease
              </li>
              <li className={styles.featureItem}>
                <strong>Product Catalog:</strong> Add, edit, and organize your medication inventory
              </li>
              <li className={styles.featureItem}>
                <strong>Secure Authentication:</strong> Google OAuth integration for safe and quick access
              </li>
              <li className={styles.featureItem}>
                <strong>Real-time Updates:</strong> Instant synchronization across all your devices
              </li>
              <li className={styles.featureItem}>
                <strong>User Reviews:</strong> Customer feedback system for better service
              </li>
              <li className={styles.featureItem}>
                <strong>Responsive Design:</strong> Works perfectly on desktop, tablet, and mobile
              </li>
            </ul>
          </div>

          <div className={styles.aboutSection}>
            <h3 className={styles.sectionTitle}>How It Works</h3>
            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4>Sign Up</h4>
                  <p>Create your account using Google authentication for instant access</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4>Create Your Store</h4>
                  <p>Set up your digital pharmacy with store details and contact information</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4>Add Products</h4>
                  <p>Upload your medication inventory with detailed descriptions and pricing</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h4>Manage & Grow</h4>
                  <p>Monitor your store, update products, and engage with customer reviews</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.aboutSection}>
            <h3 className={styles.sectionTitle}>Benefits</h3>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🏥</div>
                <h4>Healthcare Focus</h4>
                <p>Designed specifically for pharmacy and healthcare professionals</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🔒</div>
                <h4>Secure & Private</h4>
                <p>Enterprise-grade security to protect your data and customer information</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📱</div>
                <h4>Mobile Ready</h4>
                <p>Access your pharmacy management tools from anywhere, anytime</p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>⚡</div>
                <h4>Fast & Efficient</h4>
                <p>Streamlined workflows to save time and improve productivity</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <Button
            type="button"
            onClick={onClose}
            className={styles.closeModalButton}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
