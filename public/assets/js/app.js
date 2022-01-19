const botao = document.getElementsByTagName("button")[0]
botao.innerHTML = "Procurar"


const buscarConteudo = ()=>{
  
    const texto = document.getElementsByName("texto")[0]
    
    fetch("http://localhost:3000/weather?local="+texto.value).then(retorno=>{
        retorno.json().then(valor=>{
            document.getElementsByTagName("h1")[0].innerHTML = valor.resultado
            console.log(valor)
        })
    },err=>{
        console.log(err)
    })
}
