const API_BASE_URL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';
// process.env.VUE_APP_BASE_URL

// Get your API URL from environment variables (e.g., http://localhost:3000)

export const mediaPrefixer = {
  // Base folder routes matching your Express static setup
  folders: {
    userProfile: '/users/profiles/',
    userCover: '/users/covers/',

    education: '/education/',
    accommodation: '/accommodation/',
    transportation: '/transportation/',
  },

  /**
   * Generates a full, usable URL for any media asset
   * @param {string} fileName - The filename stored in the DB (e.g., 'avatar-123.jpg')
   * @param {string} type - The key from the folders object above
   * @returns {string} The complete URL
   */
  getUrl(fileName, type) {
    if (!fileName) {
      // Return a fallback placeholder image if no file exists
      return '/svgs/image-placeholder.svg';
    }
    
    // If the path is already a full URL (like an external cloud link), just return it
    if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
      return fileName;
    }

    const folderPrefix = this.folders[type] || '/';
    
    // Concatenate the base API URL, the folder prefix, and the filename
    return `${API_BASE_URL}${folderPrefix}${fileName}`;
  }
};
