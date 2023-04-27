const fs = require(`fs`);
let readFile = fs.readFileSync(`backEnd/products.json`, { encoding: `utf-8` });

console.log(readFile);

class ProductManager {
  constructor() {
    this.path = "backEnd/products.json";
    this.products = [];
  }

  async getProducts() {
    try {
      const data = fs.readFile(this.path);
      this.products = JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        this.products = [];
      } else {
        throw err;
      }
    }
    return this.products;
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let codExist = this.products.find((product) => product.code == code);

    if (codExist) {
      let x = Math.floor(Math.random() * 100);
      let id = code + x;
      console.log(
        `Codigo ya existente, le asignaremos uno no utilizado y el codigo es ${id}`
      );

      this.products.push({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: id,
        stock: stock,
      });
      fs.writeFileSync(`backEnd/products.json`, JSON.stringify(this.products), {
        encoding: `utf-8`,
      });
    } else {
      this.products.push({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
      fs.writeFileSync(`backEnd/products.json`, JSON.stringify(this.products), {
        encoding: `utf-8`,
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

  async updateProduct(id, update) {
    await this.getProducts();
    const productExist = this.products.findIndex(
      (product) => product.id === id
    );
    if (productExist === -1) {
      console.log(`No existe producto con el id ${id}`);
    }
    const updatedProduct = Object.assign(
      {},
      this.products[productExist],
      update
    );
    this.products[productExist] = updatedProduct;
    await fs.writeFile("backEnd/products.json", JSON.stringify(this.products), {
      encoding: `utf-8`,
    });
  }

  async deleteProduct(id) {
    await this.getProducts();
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      console.log(`Product with id ${id} not found`);
    }
    this.products.splice(productIndex, 1);
    await fs.writeFile("backEnd/products.json", JSON.stringify(this.products), {
      encoding: `utf-8`,
    });
  }
}


