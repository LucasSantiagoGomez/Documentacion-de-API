import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.js";
import MessageManager from "../dao/dbManagers/messages.js";
import CartManager from "../dao/dbManagers/carts.js";
import { checkLogged, checkLogin } from "../middlewares/auth.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();
const messageManager = new MessageManager();

router.get("/", checkLogged, (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

router.get("/register", checkLogged, (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

router.get("/profile", checkLogin, (req, res) => {
  res.render("profile", {
    user: req.session.user,
    title: "Profile",
  });
});

router.get("/restore", (req, res) => {
  res.render("restore", {
    user: req.session.user,
    title: "Your Profile",
  });
});

router.get("/home",checkLogin, async (req, res) => {
  const options = {
    query: {},
    pagination: {
      limit: req.query.limit ?? 10,
      page: req.query.page ?? 1,
      lean: true,
      sort: {},
    },
  };

  if (req.query.category) {
    options.query.category = req.query.category;
  }

  if (req.query.status) {
    options.query.status = req.query.status;
  }

  if (req.query.sort) {
    options.pagination.sort.price = req.query.sort;
  }

  const {
    docs: products,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
  } = await productManager.getPaginatedProducts(options);

  const link = "/?page=";

  const prevLink = hasPrevPage ? link + prevPage : link + page;
  const nextLink = hasNextPage ? link + nextPage : link + page;

  return res.render("home", {
    products,
    totalPages,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink,
    nextLink,
    title: "Products",
  });
});

router.get("/product/:pid",checkLogin, async (req, res) => {
  const productId = req.params.pid;
  const product = await productManager.getProductById(productId);
  res.render("product", { title: "Product Details", product });
});

router.get("/cart",checkLogin, async (req, res) => {
  const cart = await cartManager.getCartById("6440b66102acad1337350cc8");
  res.render("cart", { products: cart.products, title: "Cart Items" });
});

router.get("/realtimeproducts",checkLogin, async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtimeproducts", {
    products,
    title: "Real Time Products",
  });
});

router.get("/chat", async (req, res) => {
  const messages = await messageManager.getMessages();
  return res.render("messages");
});

export default router;