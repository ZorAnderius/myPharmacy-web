import * as Yup from 'yup';

// UK phone number regex (07XXXXXXXXX)
const phoneRegexp = /^07\d{9}$/;

// Email regex
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// UK postcode regex
const zipCodeRegexp = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i;

const createShopValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long')
    .required('Name is required'),
  
  ownerName: Yup.string()
    .min(3, 'Owner Name must be at least 3 characters long')
    .max(50, 'Owner Name must be at most 50 characters long')
    .required('Owner Name is required'),
  
  phone: Yup.string()
    .matches(phoneRegexp, 'Phone must be a valid UK phone number as 07XXXXXXXXX')
    .required('Phone is required'),
  
  email: Yup.string()
    .matches(emailRegexp, 'Email must be a valid email address as example@example.com')
    .required('Email is required'),
  
  street: Yup.string()
    .min(3, 'Street should have a minimum length of 3')
    .max(100, 'Street should have a maximum length of 100')
    .required('Street is required'),
  
  city: Yup.string()
    .min(2, 'City should have a minimum length of 2')
    .max(100, 'City should have a maximum length of 100')
    .required('City is required'),
  
  apartment: Yup.string()
    .min(3, 'Apartment should have a minimum length of 3')
    .max(100, 'Apartment should have a maximum length of 100')
    .required('Apartment is required'),
  
  zipCode: Yup.string()
    .matches(zipCodeRegexp, 'Zip Code must be a valid UK postcode')
    .required('Zip Code is required'),
  
  hasDelivery: Yup.boolean()
    .required('Has Delivery is required'),
});

export default createShopValidationSchema;
