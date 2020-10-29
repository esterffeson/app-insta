const express   = require('express');
const mongoose  = require('mongoose');
const path      = require('path');
const cors      = require('cors');
//IMPORTAÇÃO DAS DEPENDENCIAS PARA CONFIGURAR, O MAIS IMPORTANTE É O EXPRESS

const app = express();

//AQUI É DIVIDIDO O SERVIDOR, POSSIBILITANDO O ACESSO VIA HTTP E WEBSECKET, QUE PERMITE O ACESSO EM TEMPO REAL DA APLICAÇÃO
const server = require('http').Server(app);
const io = require('socket.io')(server);

//AQUI É FEITO A CONEXÃO COM O BANCO DE DADOS
mongoose.connect('mongodb+srv://semana:semana@cluster0-eu6uo.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true,
});


//PERMITE, REPASSAR A INFORMAÇÃO DO IO QUE PERMITE ENVIAR INFORMAÇÃO EM TEMPO REAL PARA O FRONT END PARA TODAS AS ROTAS
app.use((req, res, next) => {
    req.io = io;

    next();
})

//UTILIZA O CORS PARA PERMITIR TODOS OS ENDEREÇOS POSSAM ACESSAR O BACK END
app.use(cors());

//ROTA PARA ACESSAR ARQUIVO ESTATICOS QUE SÃO AS IMAGENS QUE FORAM FEITAS O UPLODAS
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));


//CRIA UM ARQUIVO SEPARADO DE ROTAS PARA DECLARAR AS ROTAS DA APLICAÇÃO
app.use(require('./routes'));

server.listen(3333);



