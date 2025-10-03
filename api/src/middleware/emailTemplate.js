// emailTemplate.js
function generateEmailTemplate({ 
    title = "Notification", 
    message = "", 
    resetToken = "", 
    logoUrl = "https://res.cloudinary.com/dy4nvvdwd/image/upload/v1759107463/zirss_veplvi.jpg" 
  }) {
    return `
      <div style="font-family: Arial, sans-serif; color: white; background: linear-gradient(90deg, #001F3E, #203DA3, #3752E9); padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
        <img style="width: 100px; height: 100px; border-radius: 50%;" src="${logoUrl}" alt="Logo">
        
        <h1 style="font-size: 24px; font-weight: bold; color: white; margin-top: 20px;">${title}</h1>
        
        <p style="color: white;">${message}</p>
        
        ${resetToken ? `
          <p>Kindly use the verification code provided below to complete your password reset request.</p>
          <p>This code will expire in 10 minutes.</p>
          <p style="font-weight: bold; font-size: 25px; color: white; text-align: center; margin-top: 20px; letter-spacing: 2px;">
            ${resetToken}
          </p>
        ` : ""}
        
        <div style="margin-top: 20px; text-align: center; padding: 20px; background: #001F3E; border-radius: 10px;">
          <p style="color: white;">If you did not request this, please ignore this email or contact support.</p>
        </div>
      </div>
    `;
  }
  
  module.exports = generateEmailTemplate;
  