import express from "express";
import winston from "winston";

const app = express();

app.use(express.json());

app.use(express.static("public"));
app.use("/imagens", express.static("public"));

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "grades-control-api.log" }),
  ],
  format: combine(
    label({ label: "grades-control-api" }),
    timestamp(),
    myFormat
  ),
});

logger.error("Error log");
logger.warn("Warn log");
logger.info("Info lIg");
logger.verbose("Verbose log");
logger.debug("Debug log");
logger.silly("Silly log");
logger.log("info", " Hello with parameter!");

app.listen(3000, async () => {
  console.log("API started!");
});


// ============= Seção Rotas aula04 ===============


app.all("/testAll", (req, res) => {
  res.send(req.method); // retorna método que foi utilizado para requisição
});

app.get("/teste?", (_, res) => {
  res.send("/teste?"); // retorna com '/teste' e '/test'
});

app.get("/buzz+", (_, res) => {
  res.send("/buzz+"); // retorna com '/buzz' e '/buzzzzzz'
});

app.get("/one*Blue", (_, res) => {
  res.send("/one*Blue"); // retorna com '/oneBlue' e '/onePencilBlue'
});

app.post("/test(ing)?", (_, res) => {
  res.send("/test(ing)?"); // 'ing' é opcional 
});

app.get(/.*Red$/, (_, res) => {
  res.send("/.*Red$/"); // retorna qualquer rota com 'Red'
});

app.get("/testParam/:id", (req, res) => {
  res.send(req.params.id); // retorna determinado id
});

app.get(
  "/testMultipleHandlers",
  (_, res, next) => {
    console.log("First method");
    next();
  },
  (_, res) => {
    console.log("Second method");
    res.end();
  }
  // '_' substitui req, que nao é necessario
);

const callback1 = (req, res, next) => {
  console.log("Callback 1");
  next();
};

const callback2 = (req, res, next) => {
  console.log("Callback 2");
  res.end();
};

app.get("/testMultipleHandlersArray", [callback1, callback2]);


// agrupamento de requisições com método Route
app
  .route("/testRoute")
  .get((req, res) => {
    res.end();
  })
  .post((req, res) => {
    res.end();
  })
  .delete((req, res) => {
    res.end();
  });


// ============= Seção Middlewares aula05 =============

// next procura requisição com '/caminho' passado

// app.use -> endpoint executa com qualquer método
app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use("/testMiddleware", (req, res, next) => {
  console.log("/testMiddleware");
  if (req.method === "GET") {
    next();
  } else {
    res.end();
  }
});

app.get("/testMiddleware", (req, res) => {
  res.send("GET /testMiddleware");
});


// ============= Tratamento de erros aula06 =============


// Padrão express
app.get("/", function (req, res) {
  throw new Error("Error");
  // res.end();
});

// Tratamento de erro padrão assíncrono.
app.post("/", async (req, res, next) => {
  try {
    throw new Error("Error message");
  } catch (err) {
    next(err);
  }
});

// Tratamento próprio de erro
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('An erro ocurred!')
});

// Tratamento de erro em várias funções.
app.use(function (err, req, res, next) {
  console.log("Error 1");
  next(err);
});

app.use((err, req, res, next) => {
  console.log("Error 2");
  res.status(500).send("An error occurred!");
});