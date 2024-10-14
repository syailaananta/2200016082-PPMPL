const sinon = require('sinon');
const { expect } = require('chai');
const Service = require('../src/service');
const PrimaryRepository = require('../src/repository');
const secondaryRepository = require('../src/secondaryRepository');

describe('Service Integration Tests with Multiple Stubs', () => {
  let service;
  let primaryRepositoryStub;
  let secondaryRepositoryStub;

  beforeEach(() => {
    primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
    secondaryRepositoryStub = sinon.createStubInstance(secondaryRepository);
    service = new Service();
    service.primaryRepository = primaryRepositoryStub;
    service.secondaryRepository = secondaryRepositoryStub;

    // Stub removeItemById untuk kedua repository
    primaryRepositoryStub.removeItemById = sinon.stub();
    secondaryRepositoryStub.removeItemById = sinon.stub();
  });

  it('should return item from primary repository if found', () => {
    const item = { id: 1, name: 'Item 1' };
    primaryRepositoryStub.getItemById.withArgs(1).returns(item);

    const result = service.getItemById(1);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.notCalled).to.be.true;
  });

  it('should return item from secondary repository if not found in primary', () => {
    primaryRepositoryStub.getItemById.withArgs(3).returns(null);
    const item = { id: 3, name: 'Item 3' };
    secondaryRepositoryStub.getItemById.withArgs(3).returns(item);

    const result = service.getItemById(3);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
  });

  it('should throw an error if item is not found in both repositories', () => {
    primaryRepositoryStub.getItemById.returns(null);
    secondaryRepositoryStub.getItemById.returns(null);

    expect(() => service.getItemById(5)).to.throw('Item not found in both repositories');
    expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
  });

  // Pengujian untuk menghapus item berdasarkan ID
  it('should remove an item from primary repository if found', () => {
    const item = { id: 1, name: 'Item 1' };
    primaryRepositoryStub.getItemById.withArgs(1).returns(item);
    primaryRepositoryStub.removeItemById.withArgs(1).returns(item);

    const result = service.removeItemById(1);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.removeItemById.calledOnceWith(1)).to.be.true;
    expect(secondaryRepositoryStub.removeItemById.notCalled).to.be.true;
  });

  it('should remove an item from secondary repository if not found in primary', () => {
    primaryRepositoryStub.getItemById.withArgs(3).returns(null);
    const item = { id: 3, name: 'Item 3' };
    secondaryRepositoryStub.getItemById.withArgs(3).returns(item);
    secondaryRepositoryStub.removeItemById.withArgs(3).returns(item);

    const result = service.removeItemById(3);

    expect(result).to.equal(item);
    expect(primaryRepositoryStub.removeItemById.notCalled).to.be.true;
    expect(secondaryRepositoryStub.removeItemById.calledOnceWith(3)).to.be.true;
  });

  it('should throw an error if item to be removed is not found in both repositories', () => {
    primaryRepositoryStub.getItemById.withArgs(5).returns(null);
    secondaryRepositoryStub.getItemById.withArgs(5).returns(null);

    expect(() => service.removeItemById(5)).to.throw('Item not found in both repositories');
    expect(primaryRepositoryStub.removeItemById.notCalled).to.be.true;
    expect(secondaryRepositoryStub.removeItemById.notCalled).to.be.true;
  });
});

