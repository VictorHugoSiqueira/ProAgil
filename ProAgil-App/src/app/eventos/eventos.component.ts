import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {
 
  evento: any;
  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  modoSalvar = 'post';
  registerForm!: FormGroup;
  bodyDeletarEvento = '';
  _filtroLista = '';
  title = 'Eventos';

  constructor(
    private eventoService: EventoService
    ,private modalService: BsModalService
    ,private fb: FormBuilder  
    ,private toastr: ToastrService
    ) { }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;    
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(30)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(50000)]],
      lote: ['',Validators.required]
    });
  }
  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar == 'post') {
        this.evento = Object.assign({} , this.registerForm.value);
      this.eventoService.postEvento(this.evento).subscribe(
        (novoEvento : any) => {
        template.hide();
        this.getEventos();
        this.toastr.success('Inserido com Sucesso!');

      }, error => {
        this.toastr.error(`Erro ao Inserir: ${error}`);
            }
      );
      } else {
        this.evento = Object.assign({id: this.evento.id} , this.registerForm.value);
      this.eventoService.putEvento(this.evento).subscribe(
        () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Editado com Sucesso!');

      }, error => {
        this.toastr.error(`Erro ao Editar: ${error}`);
            }
      );

      }
      
  }
}

  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
      this.eventos = _eventos;
      this.eventosFiltrados = this.eventos;
    }, error => {
      this.toastr.error(`Erro ao tentar carregar Eventos: ${error}`);
    });
  }

  editarEvento(evento: any, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
    
  }

  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, C??digo: ${evento.tema}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.eventoId).subscribe(
      () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Deletado com Sucesso!');
      }, error => {
        this.toastr.error('Erro ao tentar Deletar');
      }
    );
  }
  }