# projetoCalculadoraWin

Esse projeto é um desafio do curso [Javascript Completo 6 projetos da Hcode na Udemy](https://www.udemy.com/course/javascript-curso-completo/) que encontra-se no [repositório da Hcode](https://github.com/hcodebr/curso-javascript-projeto-calculadora-win).

O objetivo deste projeto é o estudo do design pattern MVC, lógica e javascript. Todo o código CSS e HTML - com exceção da atribuição dos atributos - não foi desenvolvido pelo autor deste projeto. 

## breve relatório do projeto

O grande desafio deste projeto foi a refatoração do código para uma melhor implementação do padrão MVC no código desenvolvido durante [a seção do curso para o projeto de calculadora](https://github.com/hcodebr/curso-javascript-projeto-calculadora-clone).

Neste projeto a classe controller ficou responsável apenas pelas regras de negócio: a coordenação e a centralização das chamadas das classes de view e service; enquanto que as classes view e service, respectivamente, ficaram responsáveis pela renderização do display da calculadora e a manipulação dos dados.

Ponderou-se pela criação de uma classe Model para guardar os dados, entretanto, a quantidade de dados nesse projeto não justifica a criação de uma classe Model para isso. Desta forma, optou-se pela concentração da responsabilidade de armazenar e organizar os dados na classe Service.

Ademais, além do objetivo de melhorar a divisão de responsabilidades , foi desenvolvidas features que não estão presentes no projeto original desenvolvido com o auxílio das aulas, são elas:

- [x] histórico;
- [x] número elevado ao quadrado;
- [x] raíz quadrada;
- [x] número recíproco;
- [x] alterar número positivo e negativo;
- [x] backspace.

Tais funcionalidades foram implementadas para aproximar-se as da calculadora do Windows, chegando próximo a uma réplica fidedigna a ela - com algumas poucas diferenças em relação a exibição do histórico. Em suma, a calculadora desenvolvida neste projeto é bastante fiel ao seu alvo se distinguindo em minuciosos detalhes que não comprometem a acessibilidade do usuário ou uso da calculadora em si.

A funcionalidade do botão % está ligeiramente diferente entre a da calculadora do Windows.
