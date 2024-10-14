// src/repository.js

class Repository {
    constructor() {
      this.data = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
    }
  
    getAllItems() {
      return this.data;
    }
  
    getItemById(id) {
      return this.data.find(item => item.id === id);
    }
  
    addItem(item) {
      this.data.push(item);
      return item;
    }
  
    // Tambahkan metode baru untuk menghapus item berdasarkan ID
    removeItemById(id) {
      const index = this.data.findIndex(item => item.id === id);
      if (index !== -1) {
        return this.data.splice(index, 1)[0]; // Menghapus item dan mengembalikan item yang dihapus
      }
      throw new Error('Item not found');
    }
  }
  
  module.exports = Repository;
  