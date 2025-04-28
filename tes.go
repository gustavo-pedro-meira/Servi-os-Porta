package main

import "fmt"

func main() {
    destino, diasViagem, custoDiario, orcamento := "Paris", 7, 190.10, 1200.00
    custoViagem := float64(diasViagem) * custoDiario

    if custoViagem > orcamento {
        fmt.Println("Economize mais R$" , (custoViagem - orcamento))
    } else {
        fmt.Println("Você pode viajar!")
    }
    
    fmt.Println("Planejando sua viagem para" , destino + "!" )
    fmt.Println("Duração:" , diasViagem, "dias")
    fmt.Println("Custo diário: R$" , custoDiario)
    fmt.Println("Custo total: R$", custoViagem)
}