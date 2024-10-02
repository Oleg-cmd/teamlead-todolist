// Function to retrieve the JWT token from the context
export const getToken = () => {
  return new Promise((resolve, reject) => {
    AP.context.getToken((token) => {
      // Resolve with token or reject with an error
      token ? resolve(token) : reject(new Error("There is no JWT token"));
    });
  });
};
