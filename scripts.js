// $(document).ready(function(){
//     const data = getCoin()
    
    
// })

function getCoin(){
    fetch('http://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL')
    .then(function(response) {
        response.text()
        .then(function(result) {
            data = JSON.parse(result)
            listCoin(data)
        })
      })
      .catch(function(err) { 
        console.error(err);
      });
}

function listCoin(data){
    vdiv = document.getElementById("main-card")
    let html = '';
    for (let key in data) {
        html += `
            <div class="card bg-light mb-3 row" style="max-width: 14rem">
                <div class="card-header">${data[key].code}</div>
                <div class="card-body">
                    <h5 class="card-title">${data[key].name}</h5>
                    <p class="card-text">
                        <ul class="card-text-list">
                            <li><b>Máx:</b> ${data[key].high}</li>
                            <li><b>Min:</b> ${data[key].low}</li>
                            <li><b>Compra:</b> ${data[key].bid}</li>
                            <li><b>Venda:</b> ${data[key].ask}</li>
                        </ul>
                    </p>
                </div>
            </div>`;
      }
      vdiv.innerHTML = html
}

getCoin();

function getRangeCoin(){
    fetch('https://economia.awesomeapi.com.br/json/daily/BRL-EUR/6')
    .then(function(response) {
        response.text()
        .then(function(result) {
            data = JSON.parse(result)
            listCoinRange(data)
        })
      })
      .catch(function(err) { 
        console.error(err);
      });
}

function listCoinRange(data){
    console.log(data)
    vdiv = document.getElementById("table-content")
    let html = `<table class="table">
                    <tr>
                        <th>#</th>
                        <th>Data</th>
                        <th>Máx</th>
                        <th>Min</th>
                        <th>Compra</th>
                        <th>Venda</th>
                    </tr>`;
    for (let key in data) {
        let i = key;
        const dateObject = new Date(data[key].timestamp * 1000)
        const DateFormat = dateObject.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        
        html += `
        <tr>
                <td class="table-td-item">${++i}</td>
                <td class="table-td-item">${DateFormat}</td>
                <td class="table-td-item">${data[key].high}</td>
                <td class="table-td-item">${data[key].low}</td>
                <td class="table-td-item">${data[key].bid}</td>
                <td class="table-td-item">${data[key].ask}</td>
        </tr>`;
      }
      html += `</table>`
      vdiv.innerHTML = html
}

getRangeCoin()



function isKeyExists(obj,key){
    return key in obj;
}