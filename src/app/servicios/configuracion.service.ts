import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Configuracion } from "../modelos/configuracion.model";

@Injectable()
export class ConfiguracionServicio{
    configuracionDoc!: AngularFirestoreDocument<Configuracion>;
    configuracion!: Observable<Configuracion>;

    //id unico
    id='1';

    constructor(private db:AngularFirestore){

    }

    getConfiguracion(): Observable<Configuracion>{
        this.configuracionDoc=this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion=this.configuracionDoc.valueChanges() as Observable<Configuracion>;
        return this.configuracion;
    }

    modificarConfiguracion(configuracion:Configuracion){
        this.configuracionDoc=this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }

}