class DeviceRepository {
    constructor() {
        this._devices = []
        this._deviceKey = 'devices'

        if (localStorage.getItem(this._deviceKey) === null) {
            localStorage.setItem(this._deviceKey, JSON.stringify(this._devices))
        }
    }

    _formatDevices() {
        let devicesJson = localStorage.getItem(this._deviceKey)
        let devicesSemClasse = JSON.parse(devicesJson)
        this._devices = devicesSemClasse.map(
            device => new Device(device._name, device._type, device._model, device._color, device._brand)
        )
    }

    saveDevice(device) {
        if (device instanceof Device) {

            this._formatDevices()

            this._devices.push(device)

            localStorage.setItem('devices', JSON.stringify(this._devices))
        }
    }

    listDevices() {
        this._formatDevices()
        return [...this._devices]
    }

    getOneDevice(name) {
        this._formatDevices()

        return this._devices.filter(device => device.getName() == name)
    }

    removeDevice(name) {
        this._formatDevices()

        this._devices = this._devices.filter(device => device.getName() !== name)

        localStorage.setItem('devices', JSON.stringify(this._devices))
    }

    editDevice(newDevice) {
        this._formatDevices()

        this._devices = this._devices.map(device => {
            if (device.getName() === newDevice.getName()) {
                return newDevice
            } else {
                return device
            }
        })

        localStorage.setItem(this._deviceKey, JSON.stringify(this._devices))
    }
}