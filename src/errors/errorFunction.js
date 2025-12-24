export const handleErrors = (err) => {
  if (err.code === "ENOENT") {
    throw new Error("Not found file");
  }

  throw new Error("Error in the server");
};
