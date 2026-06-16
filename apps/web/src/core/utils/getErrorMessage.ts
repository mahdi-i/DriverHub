export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "errors" in error) {
    return (error as { errors: string }).errors;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "خطا در ارتباط با سرور";
}
