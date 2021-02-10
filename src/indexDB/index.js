import { openDB } from 'idb';

const dataStoreName = 'lizapp'

//sets up database
export const dbPromise = openDB('app-store', 1, {
  upgrade(db) {
    db.createObjectStore(dataStoreName);
  },
});
 
export const idbKeyval = {
  async get(key) {
    return (await dbPromise).get(dataStoreName, key);
  },
  async set(key, val) {
    return (await dbPromise).put(dataStoreName, val, key);
  },
  async delete(key) {
    return (await dbPromise).delete(dataStoreName, key);
  },
  async clear() {
    return (await dbPromise).clear(dataStoreName);
  },
  async keys() {
    return (await dbPromise).getAllKeys(dataStoreName);
  },
};