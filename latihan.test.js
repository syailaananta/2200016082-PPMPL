const { expect } = require('chai');
const { kurang, bagi, tambah, kali } = require('./math');

//latihan 1
describe('Pengujian Fungsi pengurangan dan pembagian yang menguji negative case', function() {
 
  it('seharusnya mengembalikan -2 saat mengurangkan angka negatif', function() {
    expect(kurang(-5, -3)).to.equal(-2);
});
  it('seharusnya mengembalikan -2 saat membagi -20 / 10', function() {
    expect(bagi(-20, 10)).to.equal(-2);
});
  it('seharusnya mengembalikan error saat membagi dengan 0', function() {
    expect(() => bagi(6, 0)).to.throw('Tidak bisa membagi dengan nol');
}); });

//latihan 2
describe('Pengujian Fungsi Matematika dengan Kasus Negatif', function() {
    it('seharusnya mengembalikan error saat parameter bukan angka', function() {
      expect(() => tambah('a', 8)).to.throw('Masukkan angka');
      expect(() => tambah(8, 'c')).to.throw('Masukkan angka');
      expect(() => tambah('b', 'm')).to.throw('Masukkan angka');
  });

    it('seharusnya mengembalikan error jika salah satu input adalah null', function() {
      expect(() => tambah(5, null)).to.throw('Masukkan angka');
      expect(() => tambah(null, 5)).to.throw('Masukkan angka');
      expect(() => tambah(null, null)).to.throw('Masukkan angka');
    });
  });

  describe('Fungsi Kali', function() {
      it('seharusnya mengembalikan 14 saat mangkalikan -7 * -2', function() {
          expect(kali(-7, -2)).to.equal(14);
      });

      it('seharusnya mengembalikan -56 saat mengkalikan -8 * 7', function() {
          expect(kali(-8, 7)).to.equal(-56);
      });

      it('seharusnya mengembalikan -104 saat mengkalikan 13 * -8', function() {
          expect(kali(13, -8)).to.equal(-104);
      });
  });
