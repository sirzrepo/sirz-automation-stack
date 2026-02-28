import moment from "moment";

export const BASE_URL = `https://api.sirz.co.uk`;
// export const BASE_URL = `http://localhost:5000`; 

export const formatDate = (date: string) => {
    const formattedDate = moment(date).format('MMMM D, YYYY');
    return formattedDate
}

export const formatDateTime = (date: string | Date) => {
    const formattedDate = moment(date).format('ddd MMM D YYYY, HH:mm:ss');
    return formattedDate
};

export const socialLinks = {
    Facebook: "",
    Instagram: "",
    Whatsapp: ``,
    TikTok: ""
};

  // Format date
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };


export const calendyLink = `https://calendly.com/sirz-support/1-hour-business-solutions-consult?month=2025-03`

export const isYouTubeUrl = (url: string): boolean => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  return youtubeRegex.test(url);
};

export const extractYouTubeId = (url: string): string => {
  const match = url.match(/[?&]v=([^#\&\?]*)/) || url.match(/youtu\.be\/([^#\&\?]*)/);
  return match ? match[1] : url;
};