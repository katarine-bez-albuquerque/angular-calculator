import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Variáveis
  // Variables
  value: string = '';
  total: string = '0';
  error: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  // Adiciona dígitos
  // Add digits
  addValues(val: string):void {
    // Se ultrapassar 16 dígitos avisa ao usuário.
    // If it exceeds 16 digits, it warns the user.
    if (this.value.length <= 16) {
      // Recebe valor e o incrementa
      // Receives value and increments it
      this.value += val;
      // Realiza edições de sinais no início e se houver repetições de sinais
      // Perform signal edits at the beginning and if there are signal repetitions
      this.getValue();
    }
    else {
      this.error = "Maximum 16 digits!";
    }
  }

  // Obtem dígitos
  // Get digits
  getValue():string {
    // captura sinais duplicados
    // capture duplicate signals
    let v1 = this.value.indexOf("++");
    let v2 = this.value.indexOf("--");
    let v3 = this.value.indexOf("xx");
    let v4 = this.value.indexOf("//");
    let v5 = this.value.indexOf("..");

    let vv1 = this.value.indexOf("+-");    
    let vv2 = this.value.indexOf("+x");
    let vv3 = this.value.indexOf("+/");
    let vv4 = this.value.indexOf("+.");

    let vm1 = this.value.indexOf("-+");
    let vm2 = this.value.indexOf("-x");
    let vm3 = this.value.indexOf("-/");
    let vm4 = this.value.indexOf("-.");

    let vn1 = this.value.indexOf("x+");
    let vn2 = this.value.indexOf("x-");
    let vn3 = this.value.indexOf("x/");
    let vn4 = this.value.indexOf("x.");

    let vd1 = this.value.indexOf("/+");
    let vd2 = this.value.indexOf("/-");
    let vd3 = this.value.indexOf("/x");
    let vd4 = this.value.indexOf("/.");

    let vp1 = this.value.indexOf(".+");
    let vp2 = this.value.indexOf(".-");
    let vp3 = this.value.indexOf(".x");
    let vp4 = this.value.indexOf("./");

    // Verifica se a primeira posição possui o sinal, se sim coloca vazio, ou se sinal está duplicado, se sim coloca o sinal 
    // Checks if the first position has the sign, if yes, place it empty, or if the sign is duplicated, if yes, place the sign
    if (this.value[0] === '+' || this.value[v1] || this.value[vv1] || this.value[vv2] || this.value[vv3]  || this.value[vv4]) {
      this.value = this.value.replace('+', '').substring(0, this.value.length - 2);
    }
    if (this.value[0] === '-' || this.value[v2] || this.value[vm1] || this.value[vm2] || this.value[vm3]  || this.value[vm4]) {
      this.value = this.value.replace('-', '').replace(this.value[v2], '-').substring(0, this.value.length - 2);
    }
    if (this.value[0] === 'x' || this.value[v3] || this.value[vn1] || this.value[vn2] || this.value[vn3]  || this.value[vn4]) {
      this.value = this.value.replace('x', '').replace(this.value[v3], 'x').substring(0, this.value.length - 2);
    }
    if (this.value[0] === '/' || this.value[v4] || this.value[vd1] || this.value[vd2] || this.value[vd3]  || this.value[vd4]) {
      this.value = this.value.replace('/', '').replace(this.value[v4], '/').substring(0, this.value.length - 2);
    }
    if (this.value[0] === '.' || this.value[v5] || this.value[vp1] || this.value[vp2] || this.value[vp3]  || this.value[vp4]) {
      this.value = this.value.replace('.', '').replace(this.value[v5], '.').substring(0, this.value.length - 2);
    }
    // Retorna o valor editado
    // Returns the edited value
    return this.value;
  }

  // Remove dígitos a partir da última posição
  // Remove digits from last position
  removeValue():void {
    this.value = this.value.substring(0, this.value.length - 1);
  }

  // Botões de limpar e apagar dígito
  // Clear and delete digit buttons
  getConfig(val: string):void {
    // Limpa display
    // Clear display
    if (val === 'CE') {
      this.value = '';
      this.total = '0';
      this.error = '';
    }
    // Apaga um caracter a partir do último dígito
    // Delete a character from the last digit
    if (val === 'C') {
      this.removeValue();
    }
    // Limpa display
    // Clear display
    if (val === 'DEL') {
      this.value = '';
      this.total = '0';
      this.error = '';
    }
  }

  // Valor total da operação
  // Total value of the operation
  getTotal():void {
    // Função EVAL para calcular uma string e gerar o total
    // EVAL function to calculate a string and generate the total
    try {
      this.total = eval(this.getValue().replace('x', '*'));
    } catch (e) {
      // Caso ocorra um erro
      // If an error occurs
      this.error = "Invalid formula!";
    }
  }
}