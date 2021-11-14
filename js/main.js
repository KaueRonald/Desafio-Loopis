//Array que armazena as tarefas
let tarefas=JSON.parse(localStorage.getItem('tarefas'))||[];
Atualizahtml(tarefas);
//variáveis de controle de edição
let IdEdicao;

//Função que gera um id  
function idGerador(){
let id = Math.random();
id=id.toString();
return id;
}

//Função construtora de tarefa
function criarTarefa(){
let descricaoTarefa = document.querySelector("#novaTarefa").value;
if(descricaoTarefa != ""){
let tarefa={
    id:idGerador(),
    desc:descricaoTarefa,
    status:true
}
tarefas.push(tarefa);
Atualizahtml(tarefas);
salvarDadosStorag();
}
}

//Função que atualiza a lista de tarefas do html
function Atualizahtml(n){
    let list="<ui>";
    n.forEach(tarefa=>{
        list +="<li>"+"<p>"+'<input class="form-check-input position-static" type="checkbox" id="'+(tarefa.id)+'" value="option1" aria-label="...">'+tarefa.desc+
         '<img class="btn-editar" data-toggle="modal" data-target="#Deletar"'+ 'src="../assets/icons/lixeira.png"'+'onclick=recebeId('+tarefa.id+')'+'>'+
         '<img class="btn-editar"'+ 'src="../assets/icons/lapis.png" data-toggle="modal" data-target="#EditarTarefa"'+'onclick=recebeId('+tarefa.id+')'+'>'+
         "</p>"
        ;
    });
    list+="</ul>";
    document.getElementById("lista").innerHTML=list;
    document.getElementById("novaTarefa").value="";
}

//Função que apaga a tarefa definida
function deletartarefa(){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == IdEdicao);
    tarefas.splice(pos, 1);
    Atualizahtml(tarefas);
    salvarDadosStorag();
}

//Função que apaga todas as tarefas
function deletarTodas(){
    tarefas= [];
    Atualizahtml(tarefas);
    salvarDadosStorag();
}

//Função que que recebe o Id
function recebeId(n){
    IdEdicao=n;
    console.log(IdEdicao);
}

//Função que editar uma tarefa definida
function editarTarefa(){
    let pos = indexOfStevie = tarefas.findIndex(i => i.id == IdEdicao);
    let inputEditartarefa = document.querySelector("#editar").value;
    if(inputEditartarefa != ""){  
        tarefas[pos].desc=inputEditartarefa;
        document.getElementById("editar").value="";
        Atualizahtml(tarefas);
        salvarDadosStorag(); 
    }
    }

//Evento que detecta quando o enter e pressionado e adicionar um item a lista
document.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
		const btn = document.querySelector("#botao");
		btn.click();
	}
    if(e.key==="Enter"){
		const btn = document.querySelector("#botao_editar");
		btn.click();
	}
});

//Função que salva as tarefas no storage
function salvarDadosStorag(){
    localStorage.setItem("tarefas",JSON.stringify(tarefas));
}