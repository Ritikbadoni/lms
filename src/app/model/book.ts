export class Book{

    name: string;
    author : string;
    genre: string;
    price: number;

 
    constructor( name: string, author : string, genre: string, price: number ){

        this.name = name;
        this.author = author;
        this.genre = genre;
        this.price = price;
    
    }

    showBooks(){
        console.log(this.name +"["+this.genre +"]");
        
    }



 


         

}
