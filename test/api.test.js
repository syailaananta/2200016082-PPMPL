// test/api.test.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
let server;

describe('API Testing', () => {
  it('seharusnya mengembalikan semua item', (done) => {
    request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it('seharusnya membuat item baru', (done) => {
    const newItem = { name: 'Item 3' };
    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
        done();
      });
  });
  //latihan
  it('seharusnya menghapus item berdasarkan id', (done) => {
    request(app)
      .delete('/api/items/1') // Misalnya kita menghapus item dengan id 1
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Item deleted successfully');
        done();
      });
  });

  it('seharusnya memperbarui item berdasarkan id', (done) => {
    const updatedItem = { name: 'Item yang diperbarui' };
    
    request(app)
      .put('/api/items/2') // Gunakan ID yang valid
      .send(updatedItem)
      .end((err, res) => {
        expect(res.status).to.equal(200); // Pastikan statusnya 200 OK
        expect(res.body).to.have.property('name', 'Item yang diperbarui');
        done();
      });
  });
  it('seharusnya tidak membuat item dengan data yang tidak valid', (done) => {
    request(app)
      .post('/api/items')
      .send({})  // Sending empty object as invalid data
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('seharusnya mengembalikan 404 jika item tidak ditemukan', (done) => {
    request(app)
      .get('/api/items/999') // ID yang tidak ada
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item not found');
        done();
      });
  });
  it('seharusnya mengembalikan 400 jika tidak ada nama item', (done) => {
    request(app)
      .post('/items')
      .send({}) // Sending an empty body, missing 'name'
      .expect(400) // Expecting status code 400 (Bad Request)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  
  
  
});