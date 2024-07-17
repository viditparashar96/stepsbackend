export const zodErrorFormatter = (error: any) => {
  return error.errors.map((err: any) => {
    return {
      field: err.path.join("."),
      message: err.message,
    };
  });
};
