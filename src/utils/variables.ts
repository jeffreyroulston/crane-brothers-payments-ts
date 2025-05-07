export function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}

export function capitalizeFirstLetter(val:string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}