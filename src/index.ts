import express, { Request, Response } from "express";

// Criando a instancia do servidor
const app = express();

// A API vai suportar o recebimento e envio de JSON
app.use(express.json());

const resourceHello = (req: Request, res: Response) => {
  console.log(req.ip);
  res.send({ message: "Hello World" });
}
  
// Chamada do tipo GET para o recurso /hello
app.get("/hello", resourceHello);

const PORT = 3000;

// Escutar chamadas no meu servidor
app.listen(PORT);
