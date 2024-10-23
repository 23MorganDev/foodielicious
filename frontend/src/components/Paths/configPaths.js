const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000/backend";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:3000";

const configPath = {
  BACKEND_BASE_URL,
  IMAGE_BASE_URL,
  ENDPOINTS: {
    REGISTER: `${BACKEND_BASE_URL}/users/register`,
    LOGIN: `${BACKEND_BASE_URL}/users/login`,
    ME: `${BACKEND_BASE_URL}/users/me`,
    ADDRECIPE: `${BACKEND_BASE_URL}/recipes/add`,
    RECIPEDETAIL: (id) => `${BACKEND_BASE_URL}/recipes/${id}`,
    IMAGE: (image) => `${IMAGE_BASE_URL}/${image.replace(/\\/g, "/")}`,
  },
};

export default configPath;
