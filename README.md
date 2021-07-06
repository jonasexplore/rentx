# Cadastro de carros

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros dispiníveis pelo nome da categoria.
Deve ser possível listar todos os carros dispiníveis pelo nome da marca.
Deve ser possível listar todos os carros dispiníveis pelo nome do carro.

**RN**
O usuário não precisa está logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastras uma especificação para um carro não cadastrado.
Não deve ser possível cadastras uma especificação já existe para o mesmo carro.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RN**
O usuário deve poder cadastrar mais de um imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração miníma de 24h.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o memso usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o memso carro.
