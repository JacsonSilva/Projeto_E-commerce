// Função para validar senha

    function validarSenha() {
        let compSenha = document.getElementById("senhaUsuario")
        if(compSenha.value.length < 8) {
            alert("Atenção! A senha precisa ter no mínimo 8 caracteres");
        }
    }

// Função para validar Email
    function validarEmail() {
        var email = document.querySelector("#emailUsuario");
        var error = document.querySelector("#error-emailUsuario");

        if(!email.checkValidity()) {
            alert("Atenção! Digite um e-mail válido!");
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
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
        alert("Atenção! Digite um CPF válido.");

	// Valida segundo digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
        alert("Atenção! Digite um CPF válido.");
    
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
                    alert("Atenção! CEP inválido.");
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