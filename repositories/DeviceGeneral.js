const repository = new DeviceRepository();

function tableDevice(){
    const devices = repository.listarDevices();
    let tbody = document.getElementById("tbody");

    tbody.innerText = ""

    for (const device of devices) {
        let tr = tbody.insertRow();
   
        let td_id = tr.insertCell();
        let td_name = tr.insertCell();
        let td_type = tr.insertCell();
        let td_model = tr.insertCell();
        let td_color = tr.insertCell();
        let td_brand = tr.insertCell();
    
        td_id.innerText = device._id;
        td_name.innerText = device._name;
        td_type.innerText = device._type;
        td_model.innerText = device._model;
        td_color.innerText = device._color;
        td_brand.innerText = device._brand;
    }
    
}

tableDevice()

let btnAddNew = document.getElementById('btn-add-new')

btnAddNew.addEventListener('click', function (event) {

    event.preventDefault()

    const name = document.getElementById("name").value
    const type = document.getElementById("type").value
    const model = document.getElementById("model").value
    const color = document.getElementById("color").value
    const brand = document.getElementById("brand").value

    if((!name) || (!type) || (!model) || (!color) || (!brand)){
        alert("Digite todos os dados antes de continuar")
    }

    let device = new Device(1, name, type, model, color, brand)

    repository.salvarDevice(device)

    tableDevice()


})