import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';

const API_KEY = "sk-nhZh68bd2c79ee7b612242";


// Cart helpers
const CART_KEY = "cart.v1.items";

function getItems() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
  } catch {
    return [];
  }
}

function setItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:updated")); // updates Header count
}

function addItem(item) {
  const items = getItems();
  const key = (i) => `${i.id}::${i.size ?? ""}`;
  const idx = items.findIndex((i) => key(i) === key(item));
  if (idx >= 0) {
    items[idx].qty = (items[idx].qty ?? 1) + (item.qty ?? 1);
  } else {
    items.push({ ...item, qty: item.qty ?? 1 });
  }
  setItems(items);
}

const ProductDetail = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await axios.get(
          `https://perenual.com/api/species/details/${plantId}?key=${API_KEY}`
        );
        setPlant(response.data);
      } catch (error) {
        console.error("Error fetching plant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [plantId]);

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  if (loading) {
    return <div className="p-8 text-center text-lg">Loading...</div>;
  }

  if (!plant) {
    return <div className="p-8 text-center text-lg text-red-600">Plant not found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          {plant.common_name || "Plant"} - Premium Houseplant | GreenLeaf Plant Shop
        </title>
        <meta
          name="description"
          content={`${plant.common_name || "Plant"} (${plant.scientific_name?.[0] || ""}) - ${
            plant.type || "Houseplant"
          }`}
        />
        <meta property="og:title" content={plant.common_name || "Plant"} />
        <meta
          property="og:description"
          content={plant.watering || "Plant details"}
        />
      </Helmet>

      <div className="w-full bg-background-main">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="w-full bg-secondary-light">
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-row items-center py-[22px] px-[56px] md:px-[108px]">
                <h1 className="text-[52px] md:text-[80px] font-normal text-primary-dark">
                  Plant
                </h1>
                <div className="w-[1px] h-[46px] bg-primary-dark ml-[32px]" />
                <span className="ml-[20px] text-[22px] text-primary-dark">
                  {plant.common_name}
                </span>
              </div>
            </div>
          </section>

          {/* Back to Search */}
          <section className="w-full mt-[12px]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="px-[56px] flex flex-col gap-[104px] items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="flex flex-row items-center mt-[91px]"
                >
                  <img
                    src="/images/img_chevron_down.svg"
                    alt="Back"
                    className="w-[24px] h-[24px]"
                  />
                  <span className="ml-2 text-[18px] text-gray-600">
                    Back to Search
                  </span>
                </button>

                {/* Product Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-[1164px]">
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-4">
                    {plant.default_image ? (
                      <img
                        src={plant.default_image?.medium_url}
                        alt={plant.common_name}
                        className="w-full h-[270px] object-cover rounded-lg col-span-2"
                      />
                    ) : (
                      <div className="w-full h-[270px] bg-gray-200 rounded-lg flex items-center justify-center">
                        No image available
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col">
                    <h2 className="text-[36px] font-medium text-primary-dark">
                      {plant.common_name}
                    </h2>
                    <span className="mt-2 text-gray-600 italic">
                      {plant.scientific_name?.join(", ")}
                    </span>

                    <div className="mt-[30px]">
                      {/* Price & Description */}
                      <span className="text-xl font-normal text-primary-dark">
                        $350
                      </span>
                      <p className="mt-4 text-lg text-secondary-dark">
                        {plant.description ||
                          "This plant is loved for its unique foliage and easy care."}
                      </p>

                      {/* Size selection */}
                      <div className="mt-6">
                        <span className="text-gray-500">Size</span>
                        <div className="flex gap-2 mt-2">
                          {["S", "M", "L"].map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(size)}
                              className={`px-4 py-2 border rounded-lg ${
                                selectedSize === size
                                  ? "bg-primary-dark text-white"
                                  : "border-gray-400 text-gray-700"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      

                      {/* Quantity + Add to Cart */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center">

                         {/* Qty control */}
                           <div className="flex items-center border border-gray-400 rounded-lg">
                             <button
                               className="px-3 py-2 disabled:opacity-50"
                               onClick={() => handleQuantityChange(-1)}
                               disabled={quantity <= 1}
                               aria-label="Decrease quantity"
                             >
                               −
                             </button>
                             <span className="px-4 py-2 min-w-[36px] text-center">{quantity}</span>
                             <button
                               className="px-3 py-2"
                               onClick={() => handleQuantityChange(1)}
                               aria-label="Increase quantity"
                             >
                               +
                             </button>
                           </div>
                        <Button
                            text="ADD TO CART"
                            text_font_size="16"
                            text_font_family="Open Sans"
                            text_font_weight="600"
                            fill_background_color="#50806b"
                            border_border="1px solid #50806b"
                            border_border_radius="12px"
                            onClick={() => {
                              addItem({
                                id: String(plant.id),
                                name: plant.common_name || "Plant",
                                price: 350,
                                qty: quantity,
                                size: selectedSize,
                                image: plant.default_image?.medium_url,
                              });
                              alert(`${plant.common_name} added to cart!`);
                            }}
                            className="w-full sm:w-auto"
                          />

                      </div>

                      <span className="text-sm text-gray-500 mt-2">
                        Free standard shipping
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Plant Care */}
          <section className="w-full mt-[80px] bg-secondary-light py-8">
            <div className="max-w-[1000px] mx-auto px-6">
              <h3 className="text-2xl font-semibold mb-4">Plant Care</h3>
              <p><strong>Watering:</strong> {plant.watering || "Moderate"}</p>
              <p><strong>Sunlight:</strong> {plant.sunlight?.join(", ") || "Indirect"}</p>
              <p><strong>Growth Habit:</strong> {plant.growth_habit || "Perennial"}</p>
              <p><strong>Toxicity:</strong> {plant.toxicity || "Unknown"}</p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
