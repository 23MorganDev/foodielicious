const configPath = {
  BACKEND_BASE_URL: "https://foodie-backend-2mh8.onrender.com",
  ENDPOINTS: {
    REGISTER:"/register",
    LOGIN: "/login",
    ME: "/me",
    ADDRECIPE: "/recipes/add",
    RECIPEDETAIL: (id) =>  `/recipes/${id}`,
    IMAGE: (image) => `https://foodie-backend-2mh8.onrender.com/${image}`
  },
};

export default configPath;
