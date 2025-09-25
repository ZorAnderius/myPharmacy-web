import * as Yup from 'yup';

const createShopValidationSchema = Yup.object({
  shopName: Yup.string()
    .min(2, 'Shop name must be at least 2 characters')
    .max(50, 'Shop name must be less than 50 characters')
    .required('Shop name is required'),
  
  ownerName: Yup.string()
    .min(2, 'Owner name must be at least 2 characters')
    .max(50, 'Owner name must be less than 50 characters')
    .required('Owner name is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  phoneNumber: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format')
    .required('Phone number is required'),
  
  streetAddress: Yup.string()
    .min(5, 'Street address must be at least 5 characters')
    .max(100, 'Street address must be less than 100 characters')
    .required('Street address is required'),
  
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .required('City is required'),
  
  zipCode: Yup.string()
    .matches(/^[0-9]{5}(-[0-9]{4})?$/, 'Invalid zip code format')
    .required('Zip code is required'),
  
  hasDeliverySystem: Yup.boolean()
    .required('Please select delivery system option'),
});

export default createShopValidationSchema;
