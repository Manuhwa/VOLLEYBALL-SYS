// Replace with your Google Apps Script Web App URLs after deployment (see SETUP.md)
var CONFIG = {
  // URL for submitting the form (Apps Script doPost)
  SUBMIT_URL: '',
  // URL for viewing submissions (Apps Script doGet) - same script with GET
  VIEW_URL: '',
  // Public form URL to share (use full URL when hosted, e.g. https://yoursite.com/form/)
  FORM_URL: typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''
};
