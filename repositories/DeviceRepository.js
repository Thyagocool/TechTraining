class DeviceRepository {
    constructor() {
        this._devices = []
        this._deviceKey = 'devices'

        if (localStorage.getItem(this._deviceKey) === null) {
            localStorage.setItem(this._deviceKey, JSON.stringify(this._devices))
        }
    }

    _formatarDevices() {
        let devicesJson = localStorage.getItem(this._deviceKey)
        let devicesSemClasse = JSON.parse(devicesJson)
        this._devices = devicesSemClasse.map(
            device => new Device(device._id, device._name, device._type, device._model, device._color, device._brand)
        )
    }

    salvarDevice(device) {
        if (device instanceof Device) {

            this._formatarDevices()

            this._devices.push(device)
            localStorage.setItem('devices', JSON.stringify(this._devices))
        }
    }

    listarDevices() {
        this._formatarDevices()
        return [...this._devices]
    }

    filtrarDevicesPorAno(ano) {
        this._formatarDevices()

        this._devices.filter(device => device.getAno() === ano)
    }

    removerDevice(id) {
        // Busca os devices do localstorage
        this._formatarDevices()

        // Remove o device dos nossos devices
        this._devices = this._devices.filter(device => device.getId() !== id)

        // Salva os devices no localstorage
        localStorage.setItem('devices', JSON.stringify(this._devices))
    }

    editarDevice(novodevice) {
        // Busca os devices do localstorage
        this._formatarDevices()

        // Edita o device dos nossos devices
        // let index = this._devices.findIndex(device => device.getModelo() === novodevice.getModelo())
        // this._devices[index] = novodevice

        this._devices = this._devices.map(device => {
            if (device.getModelo() === novodevice.getModelo()) {
                return novodevice
            } else {
                return device
            }
        })

        // Salva os devices no localstorage
        localStorage.setItem(this._deviceKey, JSON.stringify(this._devices))
    }
}