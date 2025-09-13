TASK #8 : MODULO DE USUARIOS 

Arquivos criados / modificados 

 apps/backend/src/modules/users/
├── controllers/UserController.ts
├── dtos/CreateUserDTO.ts
├── interfaces/IUserService.ts
├── routes/userRoutes.ts
└── services/UserService.ts

apps/backend/src/config/database.ts

* CreateUserDTO.ts
Define os campos obrigatórios para criação de usuário e aplica validações com class-validator.


* IUserService.ts 

Interface que define o contrato da camada de services.

* UserService.ts 

Lógica de acesso ao banco via Prisma e cache Redis.Aplica hash de senha com bcrypt.

* UserController.ts 

Recebe requisições HTTP, valida entrada e delega para o service.

* userRoutes.ts 

Define as rotas publicas do modulo de usuários.

* database.ts 

inicializa o Prisma Client para acesso ao banco. 


# Funcionalidades 

Método	Rota	    Função          Service usado
                    no Controller	

GET	    /users	    listUsers	   getAll()
GET	    /users/:id	getUserById	   getById(id)
POST  	/users	    createUser	   create(data)
PUT	    /users/:id	updateUser	   update(id, data)
DELETE  /users/:id	deleteUser 	   delete(id)



