
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