import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  countryForm!: FormGroup;
  formData: any[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.http.get<any>('https://restcountries.com/v3.1/all').subscribe({
      next: (data) => {
        console.log(data);
        if (Array.isArray(data)) {
          const firstCountry = data[0];
          this.formData = this.transformData(firstCountry);
          this.createFrom(this.formData);
        } else {
          console.error('Data received is not in expected format');
        }
      },
      error: (erro) => {
        console.error('Error fetching data from API:', erro);
      },
    });
  }

  transformData(data: any): any[] {
    const formData: any[] = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.push({ nome: key, rotulo: key, type: 'text' });
      }
    }
    return formData;
  }

  createFrom(formData: any[]): void {
    const formGroupConfig: any = {};
    formData.forEach(field => {
      formGroupConfig[field.nome] = [''];
    });
    this.countryForm = this.formBuilder.group(formGroupConfig);
  }
}
