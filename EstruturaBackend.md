# BackEnd:

O backend usa o Appolo Server para rodar o graphql, que serve como porta para as requisições com o frontend. Vale resaltar que o apollo por padrão faz com que todas as urls dentro do servidor, direcionem para a mesma URL.

## GraphQL:

O graphQL é uma Query Language, serve para fazer requisições através de um único endPoint. Alguns pontos a entender do graphql:

* Query: Qualquer chamada que não altere o banco, comparando ao rest, são os gets.

* Mutation: Qualquer coisa que altere o banco, alterar, deletar, adicionar (put, delete, post).

* Types: Existe os tipos nativos de retorno do graphql, como Int, String, mas você pode criar os seus próprios tipos, como no backend tem o Usuario, Perfil.

* Input: São entradas, você pode criar entradas personalizadas para as mutations ou querys, criando inputs, lembrando que inputs não podem ter types como tipos internos, apenas outros inputs. Exemplo é o array de perfis recebendo "[PerfilFiltro]" no UsuarioInput.

* Enum: Tem também os Enum, que você pode criar uma lista de valores que podem ser aceitos, em um determinado campo.

### Parâmentros

* parent: O primeiro paramentro passado, ele é o objeto que contém o resultado retornado do resolvedor no campo pai ou, no caso de um Querycampo de nível superior , o rootValue passado da configuração do servidor. Esse argumento ativa a natureza aninhada das consultas do GraphQL. (normalmente não é usado)

* args: Um objeto com os argumentos passados ​​para o campo na consulta. Por exemplo, se o campo foi chamado com query{ key(arg: "you meant") }o args objeto seria: { "arg": "you meant" }.

* context: Este é um objeto compartilhado por todos os resolvedores em uma consulta específica e é usado para conter o estado por solicitação, incluindo informações de autenticação, instâncias do carregador de dados e qualquer outra coisa que deve ser levada em consideração ao resolver a consulta.

* info: Este argumento contém informações sobre o estado de execução da consulta, incluindo o nome do campo, o caminho para o campo a partir da raiz e muito mais. Ele está documentado apenas no código-fonte GraphQL.js , mas é estendido com funcionalidades adicionais por outros módulos, como apollo-cache-control.

## Estrutura de pastas

* config: Cria configurações gerais, nesse caso tem o arquivo que contém a lógica do context e simularUsuarioLogado que tem uma simulação para testes.

* data: tudo relacionado ao banco esta aqui

* resolvers e schemas: O backend esta montado separando schemas em uma pasta e resolvers em outra, você cria um schema e tem que ter um resolver. Os schemas e resolvers estão distribuídos em arquivos e todos sendo importados no arquivo index da pasta. E depois tem sua referência no index.js principal, para adicionar no Apollo.

* / : os arquivos principais, index é o que vai ser chamado ao iniciar, package.json tem as dependencias, .env fica as configurações do banco

