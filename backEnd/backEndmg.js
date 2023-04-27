const fs = require(`fs`)
let readFile =fs.readFileSync(`backEnd/text.txt`, {encoding:`utf-8`})

console.log(readFile)


class ProductManager {
  constructor() {
    this.path = "./products.json"
    this.products = [];
  }

  async getProducts() {
    try {
      const data =  fs.readFile(this.path);
      this.products = JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        // Si el archivo no existe, no hay productos todavía
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
     fs.writeFileSync(`backEnd/products.json`, JSON.stringify(this.products),{encoding:`utf-8`})
  } else {
     this.products.push({
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    });
    fs.writeFileSync(`backEnd/products.json`, JSON.stringify(this.products),{encoding:`utf-8`})
 
  }

}
getProductById = (code) => {
    let codExist = this.products.find((product) => product.code == code);

    if (codExist) {
      return codExist;
    } else {
      return "not found";
    }
  };
}





let producto = new ProductManager()

producto.addProduct('Pollo','Ave',100,'Sin imagen','a1',20)
producto.addProduct('gallina','Ave',100,'Sin imagen','a13',20)

console.log(producto.getProductById("a13"))
