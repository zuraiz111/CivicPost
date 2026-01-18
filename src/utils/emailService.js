import emailjs from '@emailjs/browser';

// Configuration - Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_5qmc0im', // Updated with your Service ID
  TEMPLATE_ID_REPORT: 'template_tw83mue', // Updated with your Template ID
  TEMPLATE_ID_ASSIGN: 'template_tw83mue', // Using the provided template ID for assignment as well
  TEMPLATE_ID_RESOLVE: 'template_tw83mue', // Using the provided template ID for resolution as well
  TEMPLATE_ID_FEEDBACK: 'template_tw83mue', // Using the provided template ID for feedback as well
  TEMPLATE_ID_NEWSLETTER: 'template_tw83mue', // Using the provided template ID for newsletter as well
  PUBLIC_KEY: 'your_public_key_here', // REPLACE THIS with your EmailJS Public Key
};

/**
 * Send a feedback email
 * @param {Object} feedbackData - The feedback details
 * @returns {Promise}
 */
export const sendFeedbackEmail = async (feedbackData) => {
  try {
    const templateParams = {
      from_name: feedbackData.name,
      from_email: feedbackData.email,
      message: feedbackData.message,
      date: new Date().toLocaleDateString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_FEEDBACK,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('EmailJS Error (Feedback):', error);
    throw error;
  }
};

/**
 * Send a report confirmation email
 * @param {Object} reportData - The report details
 * @returns {Promise}
 */
export const sendReportEmail = async (reportData) => {
  try {
    const templateParams = {
      user_name: reportData.user,
      report_id: reportData.id || 'Pending',
      category: reportData.category,
      urgency: reportData.urgency,
      description: reportData.description,
      date: reportData.date || new Date().toLocaleDateString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_REPORT,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('EmailJS Error (Report):', error);
    throw error;
  }
};

/**
 * Send an assignment notification email
 * @param {Object} reportData - The report details
 * @param {string} department - Assigned department
 * @param {string} comment - Admin comment
 * @returns {Promise}
 */
export const sendAssignmentEmail = async (reportData, department, comment) => {
  try {
    const templateParams = {
      user_name: reportData.user,
      report_id: reportData.id,
      category: reportData.category,
      department: department,
      admin_comment: comment || 'Your report has been assigned to a team.',
      status: 'Assigned',
      date: new Date().toLocaleDateString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_ASSIGN,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('EmailJS Error (Assignment):', error);
    throw error;
  }
};

/**
 * Send a resolution notification email
 * @param {Object} reportData - The report details
 * @param {string} comment - Resolution comment
 * @returns {Promise}
 */
export const sendResolutionEmail = async (reportData, comment) => {
  try {
    const templateParams = {
      user_name: reportData.user,
      report_id: reportData.id,
      category: reportData.category,
      resolution_comment: comment || 'Your report has been marked as resolved.',
      status: 'Completed',
      date: new Date().toLocaleDateString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_RESOLVE,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('EmailJS Error (Resolution):', error);
    throw error;
  }
};

/**
 * Send a newsletter subscription confirmation email
 * @param {string} email - The subscriber's email
 * @returns {Promise}
 */
export const sendNewsletterEmail = async (email) => {
  try {
    const templateParams = {
      subscriber_email: email,
      date: new Date().toLocaleDateString(),
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_NEWSLETTER,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('EmailJS Error (Newsletter):', error);
    throw error;
  }
};

export default EMAILJS_CONFIG;
