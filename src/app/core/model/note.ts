import { Collaborator } from './collaborator';
import { Image } from './image';

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
     reminder:string;
     collaboraters:Collaborator[];
     colorMenu:number;
     images:Image[]
}