import { FastField, Form, Formik } from "formik";
import Input from "../Input/Input";
import Button from "../../Button/Button";
import styles from "./EditShopForm.module.css";
import createShopValidationSchema from "../../../../utils/validationForm/createShop";

const EditShopForm = ({ shop, onSubmit, onCancel, isLoading }) => {
  const initialValues = {
    name: shop?.name || "",
    ownerName: shop?.ownerName || "",
    email: shop?.email || "",
    phone: shop?.phone || "",
    street: shop?.address?.street || "",
    city: shop?.address?.city || "",
    apartment: shop?.address?.apartment || "",
    zipCode: shop?.address?.zipCode || "",
    hasDelivery: shop?.hasDelivery || false,
  };

  const handleSubmit = (values) => {
    // Get original shop data
    const originalData = {
      name: shop?.name || "",
      ownerName: shop?.ownerName || "",
      email: shop?.email || "",
      phone: shop?.phone || "",
      street: shop?.address?.street || "",
      city: shop?.address?.city || "",
      apartment: shop?.address?.apartment || "",
      zipCode: shop?.address?.zipCode || "",
      hasDelivery: shop?.hasDelivery || false,
    };

    // Find only changed fields
    const changedFields = {};
    Object.keys(values).forEach(key => {
      if (values[key] !== originalData[key]) {
        changedFields[key] = values[key];
      }
    });

    // Only send changed fields
    if (Object.keys(changedFields).length > 0) {
      onSubmit(changedFields);
    } else {
      // No changes detected
      onSubmit({});
    }
  };

  return (
    <div className={styles.editShopFormContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Edit Shop Information</h2>
        <p className={styles.formDescription}>
          Update your shop information. This information will be displayed publicly.
        </p>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={createShopValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.editShopForm}>
            <div className={styles.formGrid}>
              <FastField name="name">
                {({ field, meta }) => (
                  <Input
                    id="name"
                    label="Shop Name"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="ownerName">
                {({ field, meta }) => (
                  <Input
                    id="ownerName"
                    label="Shop Owner Name"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="email">
                {({ field, meta }) => (
                  <Input
                    id="email"
                    label="Email address"
                    type="email"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="phone">
                {({ field, meta }) => (
                  <Input
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="street">
                {({ field, meta }) => (
                  <Input
                    id="street"
                    label="Street address"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="city">
                {({ field, meta }) => (
                  <Input
                    id="city"
                    label="City"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="apartment">
                {({ field, meta }) => (
                  <Input
                    id="apartment"
                    label="Apartment"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="zipCode">
                {({ field, meta }) => (
                  <Input
                    id="zipCode"
                    label="Zip / Postal"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
            </div>
            
            <div className={styles.deliverySection}>
              <h3 className={styles.deliveryTitle}>Has own Delivery System?</h3>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hasDelivery"
                    value="true"
                    checked={values.hasDelivery === true}
                    onChange={() => setFieldValue("hasDelivery", true)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom}></span>
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hasDelivery"
                    value="false"
                    checked={values.hasDelivery === false}
                    onChange={() => setFieldValue("hasDelivery", false)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom}></span>
                  No
                </label>
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <Button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Shop"}
              </Button>
              
              <Button 
                type="button" 
                className={styles.cancelButton}
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditShopForm;
