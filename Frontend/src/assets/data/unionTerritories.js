// // 📂 src/assets/data/unionTerritories.js
// export const UNION_TERRITORIES = {
//   region: "Union Territories", // ✔ Correct for filters
//   states: [
//     // ================================
//     // ANDAMAN & NICOBAR
//     // ================================
//     {
//       name: "Andaman & Nicobar Islands",
//       dishes: [
//         {
//           id: "F201",
//           name: "Fish Curry",
//           veg: false,
//           price: 280,
//           rating: 4.6,
//           image: "https://source.unsplash.com/400x300/?fish-curry",
//         },
//         {
//           id: "F202",
//           name: "Coconut Prawn Curry",
//           veg: false,
//           price: 320,
//           rating: 4.7,
//           image: "https://source.unsplash.com/400x300/?prawn-curry",
//         },
//       ],
//     },

//     // ================================
//     // CHANDIGARH
//     // ================================
//     {
//       name: "Chandigarh",
//       dishes: [
//         {
//           id: "F203",
//           name: "Tandoori Chicken",
//           veg: false,
//           price: 300,
//           rating: 4.8,
//           image: "https://source.unsplash.com/400x300/?tandoori-chicken",
//         },
//         {
//           id: "F204",
//           name: "Kulcha",
//           veg: true,
//           price: 120,
//           rating: 4.5,
//           image: "https://source.unsplash.com/400x300/?kulcha",
//         },
//       ],
//     },

//     // ================================
//     // DADRA NAGAR HAVELI & DAMAN DIU
//     // ================================
//     {
//       name: "Dadra & Nagar Haveli and Daman & Diu",
//       dishes: [
//         {
//           id: "F205",
//           name: "Ubadiyu",
//           veg: true,
//           price: 200,
//           rating: 4.4,
//           image: "https://source.unsplash.com/400x300/?gujarati-food",
//         },
//         {
//           id: "F206",
//           name: "Prawn Curry",
//           veg: false,
//           price: 280,
//           rating: 4.6,
//           image: "https://source.unsplash.com/400x300/?prawn",
//         },
//       ],
//     },

//     // ================================
//     // LAKSHADWEEP
//     // ================================
//     {
//       name: "Lakshadweep",
//       dishes: [
//         {
//           id: "F207",
//           name: "Malabar Fish Curry",
//           veg: false,
//           price: 290,
//           rating: 4.7,
//           image: "https://source.unsplash.com/400x300/?malabar-fish",
//         },
//         {
//           id: "F208",
//           name: "Coconut Rice",
//           veg: true,
//           price: 150,
//           rating: 4.5,
//           image: "https://source.unsplash.com/400x300/?coconut-rice",
//         },
//       ],
//     },

//     // ================================
//     // PUDUCHERRY
//     // ================================
//     {
//       name: "Puducherry",
//       dishes: [
//         {
//           id: "F209",
//           name: "Tamil-French Fusion Cuisine",
//           veg: true,
//           price: 350,
//           rating: 4.7,
//           image: "https://source.unsplash.com/400x300/?fusion-food",
//         },
//         {
//           id: "F210",
//           name: "Bouillabaisse",
//           veg: false,
//           price: 400,
//           rating: 4.8,
//           image: "https://source.unsplash.com/400x300/?seafood-soup",
//         },
//         {
//           id: "F211",
//           name: "Ratatouille",
//           veg: true,
//           price: 280,
//           rating: 4.6,
//           image: "https://source.unsplash.com/400x300/?ratatouille",
//         },
//       ],
//     },

//     // ================================
//     // LADAKH
//     // ================================
//     {
//       name: "Ladakh",
//       dishes: [
//         {
//           id: "F212",
//           name: "Thukpa",
//           veg: true,
//           price: 180,
//           rating: 4.5,
//           image: "https://source.unsplash.com/400x300/?thukpa",
//         },
//         {
//           id: "F213",
//           name: "Momos",
//           veg: true,
//           price: 150,
//           rating: 4.6,
//           image: "https://source.unsplash.com/400x300/?momos",
//         },
//         {
//           id: "F214",
//           name: "Skyu",
//           veg: true,
//           price: 170,
//           rating: 4.3,
//           image: "https://source.unsplash.com/400x300/?ladakh-food",
//         },
//         {
//           id: "F215",
//           name: "Butter Tea",
//           veg: true,
//           price: 100,
//           rating: 4.2,
//           image: "https://source.unsplash.com/400x300/?butter-tea",
//         },
//       ],
//     },
//   ],
// };
// imp one .......






// 📂 src/assets/data/unionTerritories.js

export const UNION_TERRITORIES = {
  region: "Union Territories",
  states: [
    // ================================
    // ANDAMAN & NICOBAR
    // ================================
    {
      name: "Andaman & Nicobar Islands",
      dishes: [
        {
          id: "F201",
          name: "Andaman Fish Curry",
          veg: false,
          price: 280,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1626508035297-0032eb903b63?q=80&w=800&auto=format&fit=crop", // Tropical fish curry
          description: "A tropical delight using fresh catch from the Andaman sea, marinated in homemade masala and cooked in rich coconut milk.",
          ingredients: ["King Fish", "Coconut Milk", "Mustard Seeds", "Curry Leaves", "Turmeric"],
          nutrition: { calories: 350, protein: "25g", carbs: "8g", fat: "22g" },
          allergies: ["Seafood", "Coconut"],
        },
        {
          id: "F202",
          name: "Coconut Prawn Curry",
          veg: false,
          price: 320,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=800&auto=format&fit=crop", // Prawns
          description: "Juicy prawns simmered in a creamy, mild spiced coconut gravy. A classic island delicacy served with steamed rice.",
          ingredients: ["Tiger Prawns", "Coconut Cream", "Green Chilies", "Ginger", "Garlic"],
          nutrition: { calories: 400, protein: "20g", carbs: "10g", fat: "30g" },
          allergies: ["Seafood", "Coconut"],
        },
      ],
    },

    // ================================
    // CHANDIGARH
    // ================================
    {
      name: "Chandigarh",
      dishes: [
        {
          id: "F203",
          name: "Tandoori Chicken",
          veg: false,
          price: 300,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800&auto=format&fit=crop", // Charred chicken
          description: "The city's favorite. Whole chicken marinated in yogurt and spices, roasted to smoky perfection in a clay oven (tandoor).",
          ingredients: ["Chicken", "Yogurt", "Kashmiri Chili", "Lemon", "Garam Masala"],
          nutrition: { calories: 350, protein: "30g", carbs: "5g", fat: "18g" },
          allergies: ["Dairy"],
        },
        {
          id: "F204",
          name: "Amritsari Kulcha",
          veg: true,
          price: 120,
          rating: 4.6,
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop", // Stuffed bread
          description: "Crispy, flaky flatbread stuffed with spicy mashed potatoes and onions, topped with a generous dollop of butter.",
          ingredients: ["Maida", "Potatoes", "Butter", "Coriander Seeds", "Pomegranate Seeds"],
          nutrition: { calories: 400, protein: "8g", carbs: "60g", fat: "15g" },
          allergies: ["Gluten", "Dairy"],
        },
      ],
    },

    // ================================
    // DADRA NAGAR HAVELI & DAMAN DIU
    // ================================
    {
      name: "Dadra & Nagar Haveli and Daman & Diu",
      dishes: [
        {
          id: "F205",
          name: "Ubadiyu",
          veg: true,
          price: 200,
          rating: 4.5,
          image: "https://i.ytimg.com/vi/a_w6Vxp6V-E/maxresdefault.jpg", // Pot cooking rep
          description: "A winter specialty similar to Gujarati Undhiyu. Mixed vegetables and herbs cooked in an earthen pot buried underground.",
          ingredients: ["Potatoes", "Beans", "Yam", "Green Herbs", "Earthen Pot Cooking"],
          nutrition: { calories: 250, protein: "6g", carbs: "40g", fat: "10g" },
          allergies: [],
        },
        {
          id: "F206",
          name: "Butter Garlic Prawns",
          veg: false,
          price: 280,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1625937759420-26d7e003e04c?q=80&w=800&auto=format&fit=crop",
          description: "Portuguese-influenced seafood dish. Fresh prawns tossed in butter, aromatic garlic, and fresh parsley.",
          ingredients: ["Prawns", "Butter", "Garlic", "Parsley", "Black Pepper"],
          nutrition: { calories: 320, protein: "22g", carbs: "4g", fat: "24g" },
          allergies: ["Seafood", "Dairy"],
        },
      ],
    },

    // ================================
    // LAKSHADWEEP
    // ================================
    {
      name: "Lakshadweep",
      dishes: [
        {
          id: "F207",
          name: "Mus Kavaab (Tuna Curry)",
          veg: false,
          price: 290,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1548943487-a2e4e43b485c?q=80&w=800&auto=format&fit=crop", // Tuna dish rep
          description: "A traditional Lakshadweep delicacy made with Tuna fish (Mas Min), cooked in a rich and spicy coconut paste.",
          ingredients: ["Tuna Fish", "Coconut Paste", "Coriander Powder", "Chili", "Curry Leaves"],
          nutrition: { calories: 380, protein: "30g", carbs: "8g", fat: "20g" },
          allergies: ["Seafood", "Coconut"],
        },
        {
          id: "F208",
          name: "Coconut Rice",
          veg: true,
          price: 150,
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=800&auto=format&fit=crop",
          description: "Fragrant rice cooked with fresh coconut milk and garnished with roasted cashews. Pairs perfectly with fish curry.",
          ingredients: ["Basmati Rice", "Coconut Milk", "Ghee", "Cashews"],
          nutrition: { calories: 350, protein: "5g", carbs: "50g", fat: "15g" },
          allergies: ["Coconut", "Nuts", "Dairy"],
        },
      ],
    },

    // ================================
    // PUDUCHERRY
    // ================================
    {
      name: "Puducherry",
      dishes: [
        {
          id: "F209",
          name: "Poulet Rouge (Red Chicken)",
          veg: false,
          price: 350,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=800&auto=format&fit=crop", // Red curry
          description: "A classic Franco-Tamil fusion dish. Chicken cooked in a vibrant red gravy made from roasted red chilies and spices.",
          ingredients: ["Chicken", "Red Chilies", "Tomato", "Garlic", "French Spices"],
          nutrition: { calories: 450, protein: "28g", carbs: "10g", fat: "30g" },
          allergies: [],
        },
        {
          id: "F210",
          name: "Bouillabaisse",
          veg: false,
          price: 400,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=800&auto=format&fit=crop", // Seafood soup
          description: "A traditional Provençal fish stew originating from Marseille, adapted with local fresh seafood of Puducherry.",
          ingredients: ["Assorted Fish", "Shellfish", "Saffron", "Fennel", "Orange Zest"],
          nutrition: { calories: 300, protein: "35g", carbs: "12g", fat: "10g" },
          allergies: ["Seafood"],
        },
        {
          id: "F211",
          name: "Ratatouille",
          veg: true,
          price: 280,
          rating: 4.6,
          image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=800&auto=format&fit=crop", // Veg stew
          description: "A French vegetable stew made with zucchini, eggplant, and peppers, slow-cooked in a tomato-based sauce.",
          ingredients: ["Zucchini", "Eggplant", "Bell Peppers", "Tomato", "Herbs de Provence"],
          nutrition: { calories: 200, protein: "4g", carbs: "25g", fat: "10g" },
          allergies: [],
        },
      ],
    },

    // ================================
    // LADAKH
    // ================================
    {
      name: "Ladakh",
      dishes: [
        {
          id: "F212",
          name: "Ladakhi Thukpa",
          veg: true,
          price: 180,
          rating: 4.6,
          image: "https://images.unsplash.com/photo-1542359553-620245763073?q=80&w=800&auto=format&fit=crop", // Noodle soup
          description: "A warming noodle soup with seasonal vegetables, originating from Tibetan influence, perfect for cold weather.",
          ingredients: ["Wheat Noodles", "Carrots", "Spinach", "Vegetable Broth", "Ginger"],
          nutrition: { calories: 250, protein: "8g", carbs: "45g", fat: "5g" },
          allergies: ["Gluten"],
        },
        {
          id: "F213",
          name: "Steamed Momos",
          veg: true,
          price: 150,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=800&auto=format&fit=crop", // Momos
          description: "Delicate dumplings stuffed with spiced vegetables or meat, served with fiery chili garlic chutney.",
          ingredients: ["Flour Wrapper", "Cabbage", "Carrot", "Onion", "Ginger"],
          nutrition: { calories: 200, protein: "5g", carbs: "30g", fat: "6g" },
          allergies: ["Gluten"],
        },
        {
          id: "F214",
          name: "Skyu",
          veg: true,
          price: 170,
          rating: 4.4,
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Skyu_Ladakh.jpg/800px-Skyu_Ladakh.jpg", // Pasta stew
          description: "A traditional Ladakhi stew made with thumb-sized wheat dough pasta cooked with root vegetables and milk.",
          ingredients: ["Wheat Dough", "Potatoes", "Turnips", "Milk", "Butter"],
          nutrition: { calories: 350, protein: "10g", carbs: "50g", fat: "12g" },
          allergies: ["Gluten", "Dairy"],
        },
        {
          id: "F215",
          name: "Butter Tea (Gur Gur Chai)",
          veg: true,
          price: 100,
          rating: 4.3,
          image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop", // Tea
          description: "A pink-hued savory tea made with yak butter and salt. Essential for keeping warm in the high Himalayas.",
          ingredients: ["Tea Leaves", "Yak Butter", "Salt", "Milk"],
          nutrition: { calories: 150, protein: "2g", carbs: "5g", fat: "12g" },
          allergies: ["Dairy"],
        },
      ],
    },
  ],
};