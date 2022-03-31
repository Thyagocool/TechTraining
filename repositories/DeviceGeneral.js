const repository = new DeviceRepository();

function tableDevice() {
    const devices = repository.listDevices();
    let tbody = document.getElementById("tbody");

    tbody.innerText = ""

    for (const [key, device] of Object.entries(devices)) {

        let tr = tbody.insertRow();

        let td_name = tr.insertCell();
        let td_type = tr.insertCell();
        let td_model = tr.insertCell();
        let td_color = tr.insertCell();
        let td_brand = tr.insertCell();
        let action = tr.insertCell();

        td_name.innerText = device._name;
        td_type.innerText = device._type;
        td_model.innerText = device._model;
        td_color.innerText = device._color;
        td_brand.innerText = device._brand;

        const btn1 = document.createElement("button")
        const btn2 = document.createElement("button")

        action.setAttribute('class', 'cellaction')
        btn1.setAttribute('class', 'btn-action')
        btn2.setAttribute('class', 'btn-action')

        action.setAttribute('id', `btn-action-${key}`)
        btn1.setAttribute('id', `btn1-${key}`)
        btn2.setAttribute('id', `btn2-${key}`)

        btn1.innerHTML = `<img src="./assets/img/edit.png" width ="20" height="20" onclick="getDevice('${device._name}')" >`
        btn2.innerHTML = `<img src=\"./assets/img/delete.png\" width =\"20\" height=\"20\" onclick="removeDevice('${device._name}')">`

        action.appendChild(btn1);
        action.appendChild(btn2);


    }

}

tableDevice()

let btnAddNew = document.getElementById('btn-add-new')

btnAddNew.addEventListener('click', function (event) {

    let form = document.getElementById("form-save")

    event.preventDefault()

    const name = document.getElementById("name").value
    const type = document.getElementById("type").value
    const model = document.getElementById("model").value
    const color = document.getElementById("color").value
    const brand = document.getElementById("brand").value

    if ((!name) || (!type) || (!model) || (!color) || (!brand)) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Preencha todos os campos antes de continuar!'
        })

    } else {

        const newDevice = repository.getOneDevice(name)
        let device = new Device(name, type, model, color, brand)

        if (newDevice.length == 0) {
            let device = new Device(name, type, model, color, brand)

            repository.saveDevice(device)
        } else {
            repository.editDevice(device)
        }

        form.reset()

        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Dispositivo Salvo!'
        })

        tableDevice()

    }

})

function getDevice(name) {

    const device = repository.getOneDevice(name)

    document.getElementById("name").value = device[0]._name
    document.getElementById("type").value = device[0]._type
    document.getElementById("model").value = device[0]._model
    document.getElementById("color").value = device[0]._color
    document.getElementById("brand").value = device[0]._brand

}

function removeDevice(name) {
    Swal.fire({
        title: 'Deseja realmente excluir este item?',
        text: "Este item será excluido!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, Excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            repository.removeDevice(name)

            tableDevice()

            Swal.fire(
                'Excluído!',
                'Item excluido com sucesso.',
                'success'
            )
        }
    })

}
