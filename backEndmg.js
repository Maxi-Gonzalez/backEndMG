class ProductManager {
  constructor() {
    this.products = [];
  }

  getProduct = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let codExist = this.products.find((product) => product.code == code);

    if (codExist) {
      console.log("Codigo ya existente, debe ingresar otro");
    } else {
      return this.products.push({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
    }
  };

  getProductById = (code) => {
    let codExist = this.products.find((product) => product.code == code);

    if (codExist) {
      return codExist;
    } else {
      return "not found";
    }
  };
}


