export class localStorageUtil {
  static getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  static setStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static removeStorage(key: string) {
    localStorage.removeItem(key);
  }
}
