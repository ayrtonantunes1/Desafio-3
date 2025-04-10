// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
  // Obtém o formulário de inscrição pelo ID
  const form = document.getElementById("formulario-inscricao");

  // Adiciona um listener para o evento de submit do formulário
  form.addEventListener("submit", function (event) {
      // Previne o comportamento padrão de submit do formulário
      event.preventDefault();
  
      // Variável para controlar se o formulário é válido
      let valido = true;
  
      // Limpa todas as mensagens de erro existentes
      document.querySelectorAll(".mensagem-erro").forEach((erro) => erro.textContent = "");
  
      // Função auxiliar para exibir mensagens de erro
      function mostrarErro(id, mensagem) {
          const span = document.getElementById(id);
          if (span) {
              span.textContent = mensagem;
              valido = false; // Marca o formulário como inválido
          }
      }
  
      // Obtém e limpa os valores de todos os campos do formulário
      const nome = document.getElementById("nome").value.trim();
      const dataNascimento = document.getElementById("data-nascimento").value.trim();
      const cpf = document.getElementById("cpf").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const sexo = document.getElementById("sexo").value;
      const cep = document.getElementById("cep").value.trim();
      const rua = document.getElementById("rua").value.trim();
      const numero = document.getElementById("numero").value.trim();
      const cidade = document.getElementById("cidade").value.trim();
      const estado = document.getElementById("estado").value.trim();
      const trilhaSelecionada = document.querySelector('input[name="trilha"]:checked');
      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const termos = document.getElementById("termos").checked;
  
      // Validações dos campos:
      
      // Valida se o nome foi preenchido
      if (nome === "") mostrarErro("erro-nome", "Preencha o nome.");
      
      // Valida o formato do email usando expressão regular
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) mostrarErro("erro-email", "E-mail inválido.");
      
      // Valida o formato do CPF
      const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!regexCPF.test(cpf)) mostrarErro("erro-cpf", "CPF inválido. Use o formato 123.456.789-00");
      
      // Valida o CEP
      if (cep === "" || cep.length < 8) mostrarErro("erro-cep", "CEP inválido.");
      
      // Valida se uma trilha foi selecionada
      if (!trilhaSelecionada) mostrarErro("erro-trilha", "Selecione uma trilha.");
      
      // Valida se os termos foram aceitos
      if (!termos) mostrarErro("erro-termos", "Você deve aceitar os termos.");
  
      // Se todas as validações passaram
      if (valido) {
          // Cria objeto com todos os dados do formulário
          const dados = {
              nome,
              dataNascimento,
              cpf,
              sexo,
              email,
              telefone,
              cep,
              rua,
              numero,
              cidade,
              estado,
              trilha: trilhaSelecionada.value,
              usuario,
              senha,
              termos
          };
    
          // Salva os dados no localStorage
          localStorage.setItem("dadosFormulario", JSON.stringify(dados));
          alert("Formulário enviado com sucesso!");
          // Redireciona para a página de login
          window.location.href = "indexlogin.html";
      }
  });
});

// Função para salvar dados temporariamente (usando sessionStorage)
function salvarDados() {
  // Obtém a trilha selecionada
  const trilhaSelecionada = document.querySelector('input[name="trilha"]:checked');

  // Cria objeto com os dados atuais do formulário
  const dados = {
      nome: document.getElementById("nome").value.trim(),
      dataNascimento: document.getElementById("data-nascimento").value.trim(),
      cpf: document.getElementById("cpf").value.trim(),
      sexo: document.getElementById("sexo").value,
      email: document.getElementById("email").value.trim(),
      telefone: document.getElementById("telefone").value.trim(),
      cep: document.getElementById("cep").value.trim(),
      rua: document.getElementById("rua").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      cidade: document.getElementById("cidade").value.trim(),
      estado: document.getElementById("estado").value.trim(),
      trilha: trilhaSelecionada ? trilhaSelecionada.value : null,
      usuario: document.getElementById("usuario").value.trim(),
      senha: document.getElementById("senha").value.trim(),
      termos: document.getElementById("termos").checked
  };

  // Salva os dados no sessionStorage (dados temporários)
  sessionStorage.setItem("formularioTemporario", JSON.stringify(dados));
  alert("Dados salvos temporariamente!");
}


// Função para alternar a visibilidade da senha
function alternarSenha() {
  // Obtém o campo de senha e o ícone do olho
  const campoSenha = document.getElementById('senha');
  const iconeOlho = document.querySelector('olho');
  
  // Alterna entre mostrar e esconder a senha
  if (campoSenha.type === 'password') {
      campoSenha.type = 'text'; // Mostra a senha
      iconeOlho.src = 'img/icone-olho-aberto.png'; // Altera para ícone de olho aberto
  } else {
      campoSenha.type = 'password'; // Esconde a senha
      iconeOlho.src = 'img/icone-olho.png'; // Altera para ícone de olho fechado
  }
}

// Função para processar o login
function enviarLogin() {
  // Obtém os campos de email e senha
  const campoEmail = document.getElementById('email');
  const campoSenha = document.getElementById('senha');

  // Obtém e limpa os valores digitados
  const emailDigitado = campoEmail.value.trim();
  const senhaDigitada = campoSenha.value.trim();

  // Valida se os campos foram preenchidos
  if (emailDigitado === '' || senhaDigitada === '') {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  // Obtém os dados cadastrados do localStorage
  const dadosCadastrados = JSON.parse(localStorage.getItem("dadosUsuario"));

  // Verifica se existem dados cadastrados
  if (!dadosCadastrados) {
      alert("Nenhum usuário cadastrado encontrado.");
      return;
  }

  // Valida as credenciais
  if (emailDigitado === dadosCadastrados.email && senhaDigitada === dadosCadastrados.senha) {
      alert("Login realizado com sucesso!");
      // Redireciona para a página principal após login
      window.location.href = "pagina-principal.html";
  } else {
      alert("Email ou senha incorretos.");
  }
}