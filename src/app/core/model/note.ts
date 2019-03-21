import { Collaborator } from './collaborator';

export interface Note {
     discription: string;
     title: string;
     inTrash: boolean;
     pinned: boolean;
     archive: boolean;
     id:Number;
     labelList:String[];
     labelName:String;
     colore:String;
     userId:number;
     remainder:string;
     collaboraters:Collaborator[]
}