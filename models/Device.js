class Device{
    constructor(id, name, type, model, color, brand){
        this._id = id
        this._name = name
        this._type = type
        this._model = model
        this._color = color
        this._brand = brand
    }

    getId(){
        return this._id
    }

    setId(name){
        this._name = id
    }

    getName(){
        return this._name
    }

    setName(name){
        this._name = name
    }

    getType(){
        return this._type
    }

    setType(type){
        this._type = type
    }

    getModel(){
        return this._model
    }

    setModel(model){
        this._model = model
    }

    getColor(){
        return this._color
    }

    setColor(color){
        this._color = color
    }

    getBrand(){
        return this._brand
    }

    setBrand(brand){
        this._brand = brand
    }
}