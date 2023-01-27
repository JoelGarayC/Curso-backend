class ProductManager {
  constructor() {
    this.products = [];
  }

  validateFields(product) {
    const requiredFields = [
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stock",
    ];
    for (const field of requiredFields) {
      if (!product[field]) throw new Error(`El campo "${field}" es requerido`);
    }
  }

  validateType(product) {
    const validateFieldsNumber = ["price", "stock"];
    const validateFieldsString = ["title", "description", "thumbnail", "code"];

    for (const field of validateFieldsNumber) {
      if (typeof product[field] !== "number") {
        throw new Error(`El campo "${field}" deber ser de tipo number`);
      }
    }
    if (product.price < 0) {
      throw new Error(`El campo "price" no puede ser un numero negativo`);
    }

    if (product.stock < 0 || product.stock % 1 !== 0) {
      throw new Error(
        `El campo "stock" deber ser un número entero o no puede ser un numero negativo`
      );
    }

    for (const field of validateFieldsString) {
      if (typeof product[field] !== "string")
        throw new Error(`El campo "${field}" deber ser de tipo string`);
    }
  }

  validateExist(product) {
    const codeExists = this.products.some((prod) => prod.code === product.code);
    if (codeExists)
      throw new Error(
        `El código "${product.code}" ya existe en la lista, escribe otro!`
      );
  }

  addProduct = ({ title, description, price, thumbnail, code, stock }) => {
    const product = { title, description, price, thumbnail, code, stock };

    try {
      // validacion de los campos y tipos
      this.validateFields(product);
      this.validateType(product);
      // validacion si existe el codigo en la lista
      this.validateExist(product);
    } catch (error) {
      console.log(error.message);
      return;
    }

    // creacion de un id autoincrementable para el producto
    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;

    // agrega el id y producto al arreglo de productos
    this.products.push({
      id,
      ...product,
    });
  };

  updateProduct(id, updates) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      console.log("El producto no pudo ser actualizado");
      return;
    }

    try {
      // validacion de los campos y tipos
      this.validateFields(updates);
      this.validateType(updates);
    } catch (error) {
      console.log(error.message);
      return;
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updates,
    };
    console.log("Producto actualizado");
  }

  getProducts = () => this.products;

  getProductById = (id) => {
    const product = this.products.find((product) => product.id === id);
    if (!product) return "Not Found!";

    return product;
  };
}

/*


// instancia de la clase de productManager
*/
const product = new ProductManager();

// agregando productos ...
product.addProduct({
  title: "producto 1",
  description: "example description",
  price: 100,
  thumbnail: "https://online.example.jpg",
  code: "99092",
  stock: 10,
});

product.addProduct({
  title: "producto 2",
  description: "example description",
  price: 199,
  thumbnail: "https://online.example.jpg",
  code: "9903s",
  stock: 99,
});

// lista de productos agregados mediante el metodo addProduct ,
// si existe un error en el llenado de productos se muestra en consola
console.log(product.getProducts());
console.log(`--------------------`);

// productos obtenidos con el id , si no existe devuelve un Not Found!
console.log(`Productos obtenidos con el ID:`);
console.log(product.getProductById(1));
console.log(product.getProductById(5));
console.log(`--------------------`);
// actualizacion del producto segun su id, si no encuentra devuelve un mensaje de error
product.updateProduct(1, {
  title: "producto modificado",
  description: "example description",
  price: 150.23,
  thumbnail: "https://online.example.jpg",
  code: "99092",
  stock: 19,
});

console.log(`Productos obtenidos despues de la actualización`);
console.log(product.getProducts());
