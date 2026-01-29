import axios from "axios";
import { useEffect,useState } from "react";

export default function Shop(){
  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem("cart"))||[]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/products")
      .then(res=>setProducts(res.data));
  },[]);

  const addToCart = (product)=>{
    const updated = [...cart,product];
    setCart(updated);
    localStorage.setItem("cart",JSON.stringify(updated));
    alert("Added to cart 🛒");
  }

  const resolveImage = (img) => {
    if (!img) return "";
    if (/^https?:\/\//i.test(img) || img.startsWith('/')) return img.startsWith('/') ? img.slice(1) : img;
    return `images/${img}`;
  }

  return (
    <div>
      <h1>VELORA</h1>
      <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>
        {products.map(p=>(
          <div key={p._id} style={{border:"1px solid #ccc",padding:"10px"}}>
            <img src={resolveImage(p.image)} width="200" alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={()=>addToCart(p)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  )
}
