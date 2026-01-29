const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const Product = require('../models/products');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/velora';

const keywordMap = [
  { keys: ['hoodie','sweatshirt','sweat'], tag: 'hoodie' },
  { keys: ['t-shirt','tshirt','tee'], tag: 'tshirt' },
  { keys: ['shirt'], tag: 'shirt' },
  { keys: ['pant','pants'], tag: 'pants' },
  { keys: ['jean','jeans'], tag: 'jeans' },
  { keys: ['jacket','coat'], tag: 'jacket' },
  { keys: ['jogger','joggers'], tag: 'jogger' }
];

function inferCategories(product){
  const name = (product.name || '').toLowerCase();
  const image = (product.image || '').toLowerCase();
  const found = new Set();

  for(const entry of keywordMap){
    for(const k of entry.keys){
      if(name.includes(k) || image.includes(k)){
        found.add(entry.tag);
        break;
      }
    }
  }

  // fallback: if nothing found, mark as 'other'
  if(found.size === 0) found.add('other');

  return Array.from(found);
}

async function run(){
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to', MONGO);

  const products = await Product.find();
  let updated = 0;

  for(const p of products){
    const cats = inferCategories(p);
    // sort and unique
    const normalized = Array.from(new Set(cats.map(c=>c.toLowerCase()))).sort();
    const old = (p.categories || []).map(c=>c.toLowerCase()).sort();
    const same = JSON.stringify(old) === JSON.stringify(normalized);
    if(!same){
      p.categories = normalized;
      await p.save();
      updated++;
      console.log(`Updated ${p._id}: ${normalized.join(',')}`);
    }
  }

  console.log(`Done. Updated ${updated} products.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err=>{
  console.error(err);
  process.exit(1);
});
