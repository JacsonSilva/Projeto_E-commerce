// Função para validar comprimento da senha

    function validarSenha() {
        let comprimentoSenha = document.getElementById("senhaUsuario");
        if(comprimentoSenha.value.length > 0 && comprimentoSenha.value.length < 8) {
            swal({
                title: "Atenção!",
                text: "A senha deve ter pelo menos 8 caracteres.",
                icon: "error",
              });
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

//Função para validar segunda senha (verifica se a senha informada pela segunda vez é igual à primeira)

    function validarSegundaSenha() {
        let senhaSegunda = document.getElementById("senhaUsuarioSegunda").value;
        let senhaPrimeira = document.getElementById("senhaUsuario").value;
        if(senhaSegunda !== senhaPrimeira) {
            swal({
                title: "Atenção!",
                text: "As senhas não conferem. Tente novamente.",
                icon: "error",
              });
            senhaSegunda.value = "";
        }
    }

// Função para validar Email
    function validarEmail() {
        var email = document.getElementById("emailUsuario");

        if(!email.checkValidity()) {
            swal({
                title: "Atenção!",
                text: "Digite um e-mail válido.",
                icon: "error",
              });
            email.value = "";
        }
    }

// Função para validar CPF
    function validarCpf(cpf) {	

    // Elimina caracteres não numéricos
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

	// Valida primeiro digito	
	soma = 0;	
	for (i=0; i < 9; i ++)		
		soma += parseInt(cpf.charAt(i)) * (10 - i);	
		resto = 11 - (soma % 11);	
		if (resto == 10 || resto == 11)		
			resto = 0;	
		if (resto != parseInt(cpf.charAt(9)))		

	// Valida segundo digito	
	soma = 0;	
	for (i = 0; i < 10; i ++)		
		soma += parseInt(cpf.charAt(i)) * (11 - i);	
	resto = 11 - (soma % 11);	
	if (resto == 10 || resto == 11)	
		resto = 0;	
	if (resto != parseInt(cpf.charAt(10)))
    
    swal({
        title: "Atenção!",
        text: "CPF inválido Tente novamente.",
        icon: "error",
        });
    document.getElementById("cpfUsuario").value = "";
    
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
                } else if(request.status === 404){
                    swal({
                        title: "Atenção!",
                        text: "CEP inválido. Tente novamente.",
                        icon: "error",
                      });
                    document.getElementById("cepUsuario").value = "";
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