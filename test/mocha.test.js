const describe = require('mocha').describe;

const request = require("supertest")("http://localhost:8081");
const expect = require("chai").expect;

const mochaProduct = {
  name: "mocha-product",
  description: "mocha - mocha - mocha",
  price: 500,
  thumbnail: "www.image.com/mocha",
  stock: 100,
  idP: 7
};

describe("Get products", async () => {
  let id;

  it("Al pedir los productos a la api se debería retornar una lista con todos los productos", async () => {
    let response = await request.get("/api/productos/all");
    //console.log(response.body);
    expect(response.status).to.eql(200);
  });

  it("Al agregar un producto la api debe devolver el mismo", async () => {
    let response = await request
      .post("/api/productos", mochaProduct)
      .send(mochaProduct);
    //console.log(response.body);
    id = response.body.idP;
    expect(response.status).to.eql(200);
    expect(id).not.to.undefined;
  });

  it("La api debe devolver un 200 con los cambios efectuados al producto", async () => {
    let response = await request
      .put(`/api/productos/${id}`)
      .send({ stock: 150 });
    const nuevoStock = response.body.stock;
    expect(response.status).to.eql(200);
    expect(nuevoStock).to.undefined;
  });

  it("La API debe devolver un 200 si el producto se elimina correctamente", async () => {
    let response = await request.delete(`/api/productos/${id}`);
    expect(response.status).to.eql(200);
  });
});