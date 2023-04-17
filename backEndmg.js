class ProductManager {
  constructor() {
    this.products = [];
  }

  getProduct = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let codExist = this.products.find((product) => product.code == code);

    if (codeExist) {
      console.log("Codigo ya existente, debe ingresar otro");
    } else {
      return this.prod.push({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
    }
  };

  getProductById = () => {};
}
