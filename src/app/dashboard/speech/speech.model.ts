export class SpeechModelItem {
    constructor(Id: string, Author: string, Subject: string, CreateDttm: any, Context: string){
        this.id =  Id;
        this.author = Author;
        this.subject = Subject;
        this.createdttm = CreateDttm;

        this.context = Context;
    }

    id: string;
    author: string;
    subject: string;
    createdttm: any;
    context: string;
}