import pinaColada from "../images/pinaColada.jpg";
import martini from "../images/martini.jpg";
import whiskeySour from "../images/whiskeySour.jpg";
import aperolSpritz from "../images/aperolSpritz.jpg";

const cocktails = [
  {
    id: 1,
    name: "Mojito",
    ingredients: "White rum, mint, lime, sugar, soda water",
    price: 6.25,
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Margarita",
    ingredients: "Tequila, triple sec, lime juice, salt",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Old Fashioned",
    ingredients: "Bourbon, bitters, sugar, orange peel",
    price: 6.75,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Cosmopolitan",
    ingredients: "Vodka, triple sec, cranberry juice, lime juice",
    price: 4.75,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Piña Colada",
    ingredients: "Rum, coconut cream, pineapple juice",
    price: 5.75,
    image: pinaColada
  },
  {
    id: 6,
    name: "Negroni",
    ingredients: "Gin, Campari, sweet vermouth",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Martini",
    ingredients: "Gin, dry vermouth, olive or lemon twist",
    price: 4.25,
    image: martini
  },
  {
    id: 8,
    name: "Whiskey Sour",
    ingredients: "Whiskey, lemon juice, sugar, egg white",
    price: 6.50,
    image: whiskeySour
  },
  {
    id: 9,
    name: "Daiquiri",
    ingredients: "Rum, lime juice, simple syrup",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Aperol Spritz",
    ingredients: "Aperol, prosecco, soda water, orange slice",
    price: 6.00,
    image: aperolSpritz
  }
];

export default cocktails;