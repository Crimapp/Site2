function send(){
    var r = new XMLHttpRequest();
    var nome = document.getElementById("cfn").value;
    var email = document.getElementById("cfe").value;
    var assunto = document.getElementById("cfa").value;
    var mensagem = document.getElementById("cfm").value;


    if(!nome || !email || !assunto || !mensagem){
        alert("Preencha todos os campos!");
    }
    else{
        r.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("cpc").innerHTML = ""
                    + "<h4>Agradecemos sua mensagem, ela sera respondida em breve.</h4>"
                    + "<a href='./app'>Voltar ao App</a>.";
            }
            else if (this.readyState == 4 && this.status == 202) {
                document.getElementById("cpc").innerHTML = ""
                    + "<h4>Por favor, preencha todos os campos do formulário.</h4>"
                    + "<a href='./contato'>Tente novamente</a>.";
            }
            else if (this.readyState == 4 && this.status == 203) {
                document.getElementById("cpc").innerHTML = ""
                    + "<h4>Algo deu errado. :(</h4>"
                    + "<a href='./contato'>Tente novamente</a>.";
            }
        };

        var url = "https://www.crimapp.ml/src/system/mailm2.php"; // server url
        r.open("POST", url ,true);
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        r.send("nome=" + nome +"&email=" + email + "&assunto=" + assunto + "&mensagem="+ mensagem);
    }
}