// src/utils/categoryIcons.js

// import foodImg from "../assets/itemPhotos/food.png";
// import educationImg from "../assets/itemPhotos/education.png";
// import dailyNeedsImg from "../assets/itemPhotos/daily_needs.png";
// import otherImg from "../assets/itemPhotos/other.png";
import babycare from "./assets/itemPhotos/babycare.jpg"
import bedding from "./assets/itemPhotos/bedding.jpg";
import books from "./assets/itemPhotos/books.jpg";
import cleaningsupplies from "./assets/itemPhotos/cleaningsupplies.jpg";
import cloths from "./assets/itemPhotos/cloths.jpg";
import dailyneeds from "./assets/itemPhotos/dailyneeds.jpg";
import education from "./assets/itemPhotos/education.jpg";
import electronics from "./assets/itemPhotos/electronics.jpg";
import food from "./assets/itemPhotos/food.jpg";
import footwear from "./assets/itemPhotos/footwear.jpg";
import furniture from "./assets/itemPhotos/furniture.jpg";
import healthcare from "./assets/itemPhotos/healthcare.jpg";
import hygenie from "./assets/itemPhotos/hygenie.jpg";
import kitchen from "./assets/itemPhotos/kitchen.jpg";
import medical from "./assets/itemPhotos/medical.jpg";
import nutritions from "./assets/itemPhotos/nutritions.jpg";
import others from "./assets/itemPhotos/other.jpg";
import sports from "./assets/itemPhotos/sports.jpg";
import stationary from "./assets/itemPhotos/stationary.jpg";
import toys from "./assets/itemPhotos/toys.jpg";


// Extend this object as you add more images to your folder
const categoryMap = {
  FOOD: food,
  EDUCATION: education,
  MEDICAL: medical,
  CLOTHES: cloths,
  HYGIENE: hygenie,
  FURNITURE: furniture,
  ELECTRONICS: electronics,
  SPORTS: sports,
  TOYS: toys,
  STATIONERY: stationary,
  DAILY_NEEDS: dailyneeds,
  KITCHEN: kitchen,
  BEDDING: bedding,
  FOOTWEAR: footwear,
  BABY_CARE: babycare,
  HEALTH_CARE: healthcare,
  CLEANING_SUPPLIES: cleaningsupplies,
  BOOKS: books,
  NUTRITION: nutritions,
  OTHER:others
};

export const getCategoryIcon = (category) => {
  // Returns the mapped image or the 'other' fallback if not found
  return categoryMap[category] || otherImg;
};
