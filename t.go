package main

import "fmt"

func main() {
	nome := "Gustavo"
	var idade int = 19
	if idade >= 18 {
		fmt.Println(nome, "é maior de idade")
	} else {
		fmt.Println(nome, "é meor de idad   e")
	}
	fmt.Println("deu certo")
}
