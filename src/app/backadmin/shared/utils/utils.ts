export function objectToFormData(obj: Record<string, any>, formData = new FormData()): FormData {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const propName = key;
      if (value instanceof File) {
        formData.append(propName, value);
      }
      else if (value instanceof Array) {
        for (let i = 0; i < value.length; i++) {
          const arrayKey = `${propName}[${i}]`;
          formData.append(arrayKey, value[i]);
        }
      }
      else {
        formData.append(propName, value);
      }
    }
  }
  return formData;
}
export function getFileNameFromPath(filePath: string): string {
  return filePath.split('\\').pop()?.split('/').pop() || '';
}
export function stringToSlug(str :string) {
  str = str.replace(/\s+/g, '-').toLowerCase();
  str = str.replace(/[^\w-]+/g, '');
  return str;
}