const configPath = {
  BACKEND_BASE_URL: "http://localhost:5000/backend",
  ENDPOINTS: {
    REGISTER:"/register",
    LOGIN: "/login",
    ME: "/me",
    ADDRECIPE: "/recipes/add",
    RECIPEDETAIL: (id) =>  `/recipes/${id}`,
    IMAGE: (image) => `http://localhost:5000/${image}`
  },
};

export default configPath;
