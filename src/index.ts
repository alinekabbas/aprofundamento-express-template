import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts, cars } from './database'
import { ACCOUNT_TYPE, CAR_BRANDS, CAR_FUEL, CAR_TYPES, TCars } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

app.get("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const result = accounts.find((account) => {
        return account.id === id
    })
    res.status(200).send(result)
})

app.delete("/accounts/:id", (req: Request, res: Response) => {
    const id = req.params.id
    const accountIndex = accounts.findIndex((account) => {
        return account.id === id
    })
    if (accountIndex >= 0) {
        accounts.splice(accountIndex, 1)
        res.status(200).send("Item deletado com sucesso")
    } else {
        res.status(404).send("Item não encontrado")
    }
})

app.put("/accounts/:id", (req: Request, res: Response) =>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const account = accounts.find((account)=>{
        return account.id === id
    })

    if(account){
        account.id = newId || account.id
        account.ownerName = newOwnerName || account.ownerName
        account.balance = isNaN(newBalance) ? account.balance : newBalance
        account.type = newType || account.type
        res.status(200).send("Atualização realizada com sucesso")
    }else{
        res.status(404).send("Item não encontrado")
    }
    
})

//------------------------Fixação---------------------------//

app.post("/cars", (req: Request, res: Response)=>{
    const {id, brand, model, type, fuel} = req.body as TCars

    const newCar = {
        id,
        brand,
        model,
        type,
        fuel
    }
    cars.push(newCar)
    res.status(201).send("Carro cadastrado com sucesso")
})

app.get("/cars", (req: Request, res: Response)=>{
    res.status(200).send(cars)
})

app.put("/cars/:id", (req: Request, res: Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newBrand = req.body.brand as CAR_BRANDS | undefined
    const newModel = req.body.model as string | undefined
    const newType = req.body.type as CAR_TYPES |undefined
    const newFuel = req.body.fuel as CAR_FUEL | undefined

    const car = cars.find((car)=>{
        return car.id === id
    })

    if(car){
        car.id = newId || car.id
        car.brand = newBrand || car.brand
        car.model = newModel || car.model
        car.type = newType || car.type
        car.fuel = newFuel || car.fuel
        res.status(200).send("Atualização realizada com sucesso")
    }else{
        res.status(404).send("Item não encontrado")
    }
})

app.delete("/cars/:id", (req: Request, res: Response)=>{
    const id = req.params.id
    const carIndex = cars.findIndex((car) => {
        return car.id === id
    })
    if (carIndex >= 0) {
        cars.splice(carIndex, 1)
        res.status(200).send("Item deletado com sucesso")
    } else {
        res.status(404).send("Item não encontrado")
    }
})
