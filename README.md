# SegundoCiclo

Atividade para avaliação da matéria de Web2 para o curso de Engenharia de Software da Universidade Tecnológica Federal do Paraná

# Especificação do 2º. Ciclo

## Sistema web

Nesta segunda etapa do projeto, o objetivo é criar o sistema dinâmico integrado com
um banco de dados (relacional ou NoSQL), por meio de uma API web (back-end) e um
cliente web (front-web) que irá consumir a API desenvolvida.
Como requisito principal, o sistema deve permitr a realização de 2 cadastros
(operações de CRUD completa), tal que, estes itens apresentem entre si um
relacionamento de um-para-muitos ou muitos-para-muitos, de acordo com a livre
escolha de cada aluno/dupla. As operações de inserção, alteração e exclusão devem
ser restritas para o usuário autenticado no sistema. As operações de listar e buscar
pelo identificador único são permitidos também para os usuários não logados no
sistema.
Neste ciclo, será necessário fazer com que o front-end da aplicação consuma a API
desenvolvida. E realize a validação dos dados fornecidos pelo usuário, além de realizar
o tratamento dos erros e mensagens geradas pela API. Neste cenário, será permitido
criar uma aplicação diferente para o front-end da aplicação, desde que a mesma seja
adequadamente integrada com a solução desenvolvida no primeiro ciclo.
Com relação a API desenvolvida, a mesma também deverá realizar a validação dos
campos, considerando que os dados podem vir de uma fonte diferente do cliente
desenvolvido. Além disso, mensagens de erros e sucessos deverão ser enviados
juntamente com as respostas. Os métodos HTTP GET, POST, PUT e DELETE devem
ser empregados de acordo com a operação a ser executada. Quanto ao banco de
dados, será de livre escolha de cada aluno/dupla, podendo ser um banco de dados
relacional (ex. MySQL ou PostgreSQL) ou um banco de dados NoSQL (ex. MongoDB).

- [ ] Implementar uma API REST
- [ ] Consumir os dados da API de forma assíncrona
- [ ] Listar os dados da coleção/tabela 1 e 2
- [ ] Mostrar os detalhes de um registro de cada coleção/tabela
- [ ] Inserir novos registros para cada coleção/tabela
- [ ] Alterar um registro para cada coleção/tabela
- [ ] Excluir um registro de cada coleção/tabela
- [ ] Desenvolver um relacionamento (1-N ou N-M) entre estas coleções/tabelas, tal
que em um dos formulários de cadastros tenha que se escolher um ou muitos
itens relacionado ao outro tipo
- ✅ Implementar o controle de acesso de acordo com usuários logados e não
logados (API e cliente)
- [ ] Fazer a validação de entradas de dados no cliente e no servidor
- [ ] Fazer tratamento de erros no cliente e no servidor
- ✅ Atualizar o arquivo de configuração com os detalhes de acesso ao banco de
dados
- [ ] Criar um Docker-compose para suportar a execução da API, do banco de dados
e opcionalmente da aplicação front-end
- [ ] Realizar uma carga automática dos dados, tal que, cada coleção/tabela tenha ao
menos 5 registros prévios
