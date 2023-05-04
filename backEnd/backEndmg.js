const fs = require(`fs`);

let readFile = fs.readFileSync(`backEnd/products.json`, { encoding: `utf-8` });

//console.log(readFile); //Esto trae el listado de productos del json

class ProductManager {
  constructor() {
    this.path = "backEnd/products.json";
    this.products = [];
  }

  async getProducts() {
      await fs.readFile(this.path, 'utf8', (err,data)=> { // este callback hace que la asincronia se respete FUNDAMENTAL
           if(err){
            console.log('error al leer archivo', err)
          }else{
            this.products = JSON.parse(data);
            console.log(data)
          }
      });

    return this.products;
  }

  async deleteProduct(id) {
    await this.getProducts();
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    this.products.splice(productIndex, 1);
    //await fs.writeFile(this.path, JSON.stringify(this.products), "utf-8");

    fs.writeFileSync(this.path, JSON.stringify(this.products), function (err) {
        if (err) {console.log(`error`, err);
      }  
  });
  }

  

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let codExist = this.products.find((product) => product.code == code);

    let id=0

    if (codExist) {
      let x = Math.floor(Math.random() * 100);
      id = code + x;
      console.log(
        `Codigo ya existente, le asignaremos uno no utilizado y el codigo es ${id}`
      );

      this.products.push({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: id,
        id:id,
        stock: stock,
      });
       fs.writeFileSync(
        `backEnd/products.json`,
        JSON.stringify(this.products),
        function (err, result) {
          if (err) console.log(`error`, err);
        }
      );
    } else {
      this.products.push({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        id:code,
        stock: stock,
      });
      fs.writeFileSync(`backEnd/products.json`, JSON.stringify(this.products), {
        encoding: `utf-8`,
      });
    }
  };

  getProductById = (id) => {
    let codExist = this.products.find((product) => product.id == id);

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
    }else{ 
    const updatedProduct = Object.assign(this.products[productExist], update);
    this.products[productExist] = updatedProduct;
    await fs.writeFile(
      "backEnd/products.json",
      JSON.stringify(this.products),
      `utf-8`
    );
    }
  }


}

module.exports = ProductManager;

let producto = new ProductManager();

producto.addProduct("Pollo", "Ave", 100, "Sin imagen", "a1", 20);
producto.addProduct("gallina", "Ave", 100, "Sin imagen", "a13", 20);
producto.addProduct("fideos", "comida", 345345, "Sin imagen", "a21", 5);
producto.addProduct("carne", "comida", 345345, "Sin imagen", "a56", 5);
producto.getProducts();

