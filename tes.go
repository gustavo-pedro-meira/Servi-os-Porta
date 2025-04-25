package main

import (
	"fmt"
)

// Função para verificar se um número é par ou ímpar
func par(numero int) {
	if numero%2 == 0 {
		fmt.Println(numero, "é par")
	} else {
		fmt.Println(numero, "é ímpar")
	}
}

func imprimirNome(nome string) {
	fmt.Println("Olá,", nome + "!")
	if nome == "João" {
		fmt.Println("Que nome impressionante!")
	} else {
		fmt.Println("Que nome interessante!")
	}
}

func main() {
	var numero int
	fmt.Print("Digite um número: ")
	fmt.Scan(&numero)
	
	// Chama a função par
	par(numero)
	imprimirNome("João")
}