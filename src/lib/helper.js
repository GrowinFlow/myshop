import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL
export const SUPER_ADMIN_KEY = process.env.REACT_APP_SUPER_ADMIN_KEY;
export const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;
export const MANAGER_KEY = process.env.REACT_APP_MANAGER_KEY;
export const VENDOR_KEY = process.env.REACT_APP_VENDOR_KEY;
export const CUSTOMER_KEY = process.env.REACT_APP_CUSTOMER_KEY;
export const MARKETING_KEY = process.env.REACT_APP_MARKETING_KEY;
export const LOGISTICS_KEY = process.env.REACT_APP_LOGISTICS_KEY;
export const GUEST_KEY = process.env.REACT_APP_GUEST_KEY;



export async function callApi({ endpoint, method, data = {}, params = {}}) {
  return axios({
      method: method,
      url: `${baseUrl}/${endpoint}`,
      data: data,
      params: params,
      headers: {
        'Accept': 'application/json'
    }
  }) 
  .then(response => {
    console.log(data, response.data)
    return response.data
  })
  .catch(error => {
      console.error('API call failed:', error);
      throw error;
  });
}



 
export function activeUser(){

  const getlocalUser = localStorage.getItem("user")
  const userObj = JSON.parse(getlocalUser); 
  const userRole = (userObj.user_role.type);
// showToast('Product updated successfully!', 'success');

  return userRole
 
}
// Example usage:
// console.log(`The user's role is: ${userRoleName}`); // Output: The user's role is: Manager

        








export const formatPrice = (price) => {
    if (typeof price === 'object' && price["$numberDecimal"]) {
      return parseFloat(price["$numberDecimal"]).toFixed(2);
    }
    return parseFloat(price).toFixed(2);
  };
  

    // Helper function to format date to "15 May 1990"
export  function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
}

export const formatDateToInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

export const highlightText = (text, query) => {
  if (!query) return text; // Return original text if query is empty

  // Escape special characters in query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create case-insensitive regex with global flag
  const regex = new RegExp(`(${escapedQuery})`, 'gi');

  // Replace matched text with highlighted HTML
  return text.replace(regex, match => `<span class="bg-yellow-300 text-black uppercase">${match}</span>`);
};

//   dangerouslySetInnerHTML={{ __html: highlightText(product.title, query) }}



export const isImageUrl = (url) => {
  return /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
};

export function closeOnKey(func){

  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      func();
    }
  };

  window.addEventListener('keydown', handleEsc);

  return () => {
    window.removeEventListener('keydown', handleEsc);
  };
}


export function replaceSpacesAndHyphens(inputString) {
  // Check if inputString is a valid string
  if (typeof inputString !== 'string') {
      console.error('Invalid input: inputString must be a string');
      return '';
  }
  // Replace spaces and hyphens with underscores
  let result = inputString.replace(/[\s-]/g, '_');
  return result;
}

export function replaceUnderscoresWithSpaces(inputString) {
  // Check if inputString is a valid string
  if (typeof inputString !== 'string') {
    console.error('Invalid input: inputString must be a string');
    return '';
  }
  // Replace underscores with spaces
  let result = inputString.replace(/_/g, ' ');
  return result;
}
