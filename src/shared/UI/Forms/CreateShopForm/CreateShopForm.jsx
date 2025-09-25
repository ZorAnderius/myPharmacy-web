import { FastField, Form, Formik } from "formik";
import Input from "../Input/Input";
import Button from "../../Button/Button";
import styles from "./CreateShopForm.module.css";
import createShopValidationSchema from "../../../../utils/validationForm/createShop";

const initialValues = {
  shopName: "",
  ownerName: "",
  email: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  zipCode: "",
  hasDeliverySystem: false,
};

const CreateShopForm = ({ onSubmit, onCancel, isLoading }) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div className={styles.createShopFormContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create your Shop</h2>
        <p className={styles.formDescription}>
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={createShopValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.createShopForm}>
            <div className={styles.formGrid}>
              <FastField name="shopName">
                {({ field, meta }) => (
                  <Input
                    id="shop_name"
                    label="Shop Name"
                    field={field}
                    meta={meta}
                  />
                )}
              </FastField>
              
              <FastField name="ownerName">
                {({ field, meta }) => (
                  <Input
                    id="owner_name"
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
              
              <FastField name="phoneNumber">
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
              
              <FastField name="streetAddress">
                {({ field, meta }) => (
                  <Input
                    id="street_address"
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
              
              <FastField name="zipCode">
                {({ field, meta }) => (
                  <Input
                    id="zip_code"
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
                    name="hasDeliverySystem"
                    value="true"
                    checked={values.hasDeliverySystem === true}
                    onChange={() => setFieldValue("hasDeliverySystem", true)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioCustom}></span>
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hasDeliverySystem"
                    value="false"
                    checked={values.hasDeliverySystem === false}
                    onChange={() => setFieldValue("hasDeliverySystem", false)}
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
                {isLoading ? "Creating..." : "Create account"}
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

export default CreateShopForm;
