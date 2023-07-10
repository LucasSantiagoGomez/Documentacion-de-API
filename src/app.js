import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import database from "./db.js";
import socket from "./socket.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./routes/session.routes.js"
import initializePassport from "./auth/passport.js";
import swaggerJSDoc from "swagger-jsdoc";
import  SwaggerUiExpress  from "swagger-ui-express";

// Initialization

const app = express();




app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${__dirname}/public`));
  app.use(morgan("dev"));
  initializePassport();
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl:  `mongodb+srv://lucas00gomez:jhVWUong4BKakOhh@clustercoderhouseecomme.itfiapq.mongodb.net/?retryWrites=true&w=majority`,
         ttl: 180,
      }),
      resave: true,
      saveUninitialized: false,
      secret: "asdf123%%",
    })
  );

  const swaggerOptions={
    definition :{
      oprenapi:"3.0.1",
      info:{
        title:"Tienda API",
        description:"Documentacion que soporta al sistema Tienda API"
      }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
  }
  const spec = swaggerJSDoc(swaggerOptions)  

  
// Settings
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));

// Database connection
database.connect();

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/apidocs", SwaggerUiExpress.serve, SwaggerUiExpress.setup(spec))
app.use("/", viewsRouter);



app.get("/loggerTest", (req, res) => {
  logger.debug("This is a debug log");
  logger.http("This is an HTTP log");
  logger.info("This is an info log");
  logger.warning("This is a warning log");
  logger.error("This is an error log");
  logger.fatal("This is a fatal log");

  res.send("Logger test completed");
});

const httpServer = app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});

socket.connect(httpServer);





