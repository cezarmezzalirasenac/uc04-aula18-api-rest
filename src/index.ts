import express, { Request, Response } from "express";

// Criando a instancia do servidor
const app = express();

// A API vai suportar o recebimento e envio de JSON
app.use(express.json());

const lanches = [
  {
    id: 1,
    nome: "X-Polenta Picanha",
    tamanho: "P",
    valor: 30,
  },
  {
    id: 2,
    nome: "X-Polenta Picanha",
    tamanho: "G",
    valor: 45,
  },
  {
    id: 3,
    nome: "X-Bacon",
    tamanho: "G",
    valor: 30,
  },
];

const pedidos = [];

// const resourceHello = (req: Request, res: Response) => {
//   console.log(req.ip);
//   res.send({ message: "Hello World" });
// }

function resourceHello(req: Request, res: Response) {
  console.log(req.ip);
  res.send({ message: "Hello World" });
}

// Recurso GET /hello
app.get("/hello", resourceHello);

// GET /lanches
app.get("/lanches", (req: Request, res: Response) => {
  res.send(lanches);
});

// POST /pedidos
app.post("/pedidos", (req: Request, res: Response) => {
  // resgatar as informações da requisição
  // RECOMENDADO, pois, você só usa o que precisa da requisição
  const { id_lanche, quantidade, nome_cliente, endereco, telefone } = req.body;

  // validar se o lanche com id existe na lista de lanches
  let lanche;

  for (const l of lanches) {
    if (l.id === id_lanche) {
      lanche = l;
      break;
    }
  }

  // Se não existir, retorna um erro dizendo que não existe
  if (!lanche) {
    res.status(404).send("Lanche não encontrado.");
    return;
  }

  // Se existir, segue a criação do pedido
  const nome_lanche = lanche.nome;

  const pedido = {
    id: pedidos.length + 1,
    status: "criado",
    id_lanche,
    nome_lanche,
    quantidade,
    nome_cliente,
    endereco,
    telefone,
  };

  // NÃO RECOMENDADO - Spread Operator
  // const pedido = {
  //   id: pedidos.length + 1,
  //   status: "criado",
  //   ...req.body,
  // };

  // adicionar um pedido a lista de pedidos
  pedidos.push(pedido);
  // retornar o pedido com o id
  res.send(pedido);
});

// Buscar um pedido pelo seu ID
// GET /pedidos/id/status
app.get("/pedidos/:id/status", (req: Request, res: Response) => {
  // como pegar o id do pedido na requisição?

  // Buscar o pedido com o id da requisição

  // Se o pedido não existir, retorna um erro

  // Se existir, retorna o pedido completo
});

// PATCH /pedidos/id -> endereço entrega

// PUT /pedidos/id -> alterar o lanche

// DELETE /pedidos/id -> cancelar um pedido

const PORT = 3000;

// Escutar chamadas no meu servidor
app.listen(PORT);
