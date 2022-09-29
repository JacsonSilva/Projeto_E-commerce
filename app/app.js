// Função para validar comprimento da senha

    function validarSenha() {
        let comprimentoSenha = document.getElementById("senhaUsuario");
        if(comprimentoSenha.value.length > 0 && comprimentoSenha.value.length < 8) {
            
            alert("Atenção! A senha deve ter pelo menos 8 caracteres.");

            comprimentoSenha.value = "";
        }
    }

// Função para ocultar senha

    function ocultarSenha() {
        let senha = document.getElementById("senhaUsuario");
        if(senha.type == "password") {
            senha.type = "text";
        } else {
            senha.type = "password";
        }
    }

// Função para ocultar segunda senha

function ocultarSegundaSenha() {
    let senhaSegunda = document.getElementById("senhaUsuarioSegunda");
    if(senhaSegunda.type == "password") {
        senhaSegunda.type = "text";
    } else {
        senhaSegunda.type = "password";
    }
}

// Função para ocultar senha na etapa 2 do formulário de cadastro

function ocultarSenhaInformada() {
    let senhaInformada = document.getElementById("senhaUsuarioInformada");
    if(senhaInformada.type == "password") {
        senhaInformada.type = "text";
    } else {
        senhaInformada.type = "password";
    }
}

//Função para validar segunda senha (verifica se a senha informada pela segunda vez é igual à primeira)

    function validarSegundaSenha() {
        let senhaSegunda = document.getElementById("senhaUsuarioSegunda").value;
        let senhaPrimeira = document.getElementById("senhaUsuario").value;
        if(senhaSegunda !== senhaPrimeira) {
 
            alert("Atenção! As senhas não conferem. Tente novamente.");

            document.getElementById("senhaUsuarioSegunda").value = "";
        }
    }

// Função para validar Email
    function validarEmail() {
        var email = document.getElementById("emailUsuario");

        if(!email.checkValidity()) {
           
            alert("Atenção! Digite um e-mail válido.");
           
            email.value = "";
        }
    }

// Função para validar CPF
function validarCpf(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9))) {		
                
            document.getElementById("cpfUsuario").value = "";
                
            alert("Atenção! CPF inválido. Tente novamente.");
        }
    // Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	    rev = 11 - (add % 11);	
	    if (rev == 10 || rev == 11)	
		    rev = 0;	
	    if (rev != parseInt(cpf.charAt(10))) {
        
        document.getElementById("cpfUsuario").value = "";            
        
        alert("Atenção! CPF inválido. Tente novamente.");
        }
                        
	return true;   
}

// Função para completar endereço pelo CEP
    function buscaCep() {
        let cep = document.getElementById("cepUsuario").value;
        if(cep !== "") {
            let url = "https://brasilapi.com.br/api/cep/v1/" + cep;

            let request = new XMLHttpRequest();
            request.open("GET", url);
            request.send();

            // Tratamento da resposta de requisição
            request.onload = function() {
                if(request.status === 200){
                    let endereco = JSON.parse(request.response);
                    document.getElementById("ruaUsuario").value = endereco.street;
                    document.getElementById("bairroUsuario").value = endereco.neighborhood;
                    document.getElementById("cidadeUsuario").value = endereco.city;
                    document.getElementById("estadoUsuario").value = endereco.state;

                    document.querySelector("nEndUsuario").focus();
                    
                } else if(request.status === 404){

                    alert("Atenção! CEP inválido. Tente novamente.");

                    document.getElementById("cepUsuario").value = "";
                    document.getElementById("ruaUsuario").value = "";
                    document.getElementById("bairroUsuario").value = "";
                    document.getElementById("cidadeUsuario").value = "";
                    document.getElementById("estadoUsuario").value = "";
                } else {
                    alert("Erro de requisição.");
                }
                }
            }
        }        

    window.onload = function() {
        let cepUsuario = document.getElementById("cepUsuario");
        cepUsuario.addEventListener("blur", buscaCep);
       
    }

// Função para armazenar nome informado na etapa 1 do formulário de cadastro
 
    function salvarNome() {
        localStorage.nome = document.getElementById("nomeUsuario").value;
        }
    
    console.log(localStorage.nome);

    function carregarNome() {
        document.getElementById("nomeUsuarioInformado").value = localStorage.nome;
    }

    console.log(carregarNome());

// Função para armazenar CPF informado na etapa 1 do formulário de cadastro
 
    function salvarCpf() {
        localStorage.cpf = document.getElementById("cpfUsuario").value;
    }

    console.log(localStorage.cpf);

    function carregarCpf() {
        document.getElementById("cpfUsuarioInformado").value = localStorage.cpf;
    }

    console.log(carregarCpf());

// Função para armazenar e-mail informado na etapa 1 do formulário de cadastro
 
    function salvarEmail() {
        localStorage.email = document.getElementById("emailUsuario").value;
    }

    console.log(localStorage.email);

    function carregarEmail() {
        document.getElementById("emailUsuarioInformado").value = localStorage.email;
    }

    console.log(carregarEmail());
